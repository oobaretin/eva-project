import express from 'express';
import { prisma } from '../index';
import { authenticateToken, requireAdmin, optionalAuth } from '../middleware/auth';
import { AppError, BookingRequest, AvailabilityResponse, TimeSlot, AuthenticatedRequest } from '../types';

const router = express.Router();

// Get user's appointments
router.get('/my-appointments', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { userId: req.user!.id },
      include: {
        service: true
      },
      orderBy: { appointmentDate: 'desc' }
    });

    res.json({
      success: true,
      data: appointments,
      message: 'Appointments retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get appointment by ID
router.get('/:id', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { id } = req.params;

    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        service: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true
          }
        }
      }
    });

    if (!appointment) {
      throw new AppError('Appointment not found', 404);
    }

    // Check if user owns this appointment or is admin
    if (appointment.userId !== req.user!.id && !req.user!.isAdmin) {
      throw new AppError('Access denied', 403);
    }

    res.json({
      success: true,
      data: appointment,
      message: 'Appointment retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Create new appointment
router.post('/', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { serviceId, appointmentDate, paymentMethod, notes, specialRequests }: BookingRequest = req.body;

    if (!serviceId || !appointmentDate || !paymentMethod) {
      throw new AppError('Service ID, appointment date, and payment method are required', 400);
    }

    // Validate service exists
    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    });

    if (!service || !service.isActive) {
      throw new AppError('Service not found or inactive', 404);
    }

    // Check if appointment date is in the future
    const appointmentDateTime = new Date(appointmentDate);
    const now = new Date();
    
    if (appointmentDateTime <= now) {
      throw new AppError('Appointment date must be in the future', 400);
    }

    // Check for conflicting appointments (same time slot)
    const conflictingAppointment = await prisma.appointment.findFirst({
      where: {
        appointmentDate: appointmentDateTime,
        status: {
          in: ['SCHEDULED', 'CONFIRMED']
        }
      }
    });

    if (conflictingAppointment) {
      throw new AppError('Time slot is already booked', 409);
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        userId: req.user!.id,
        serviceId,
        appointmentDate: appointmentDateTime,
        paymentMethod,
        totalPrice: service.basePrice,
        notes,
        specialRequests
      },
      include: {
        service: true
      }
    });

    res.status(201).json({
      success: true,
      data: appointment,
      message: 'Appointment created successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Update appointment
router.put('/:id', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { id } = req.params;
    const { appointmentDate, notes, specialRequests, status } = req.body;

    const existingAppointment = await prisma.appointment.findUnique({
      where: { id }
    });

    if (!existingAppointment) {
      throw new AppError('Appointment not found', 404);
    }

    // Check if user owns this appointment or is admin
    if (existingAppointment.userId !== req.user!.id && !req.user!.isAdmin) {
      throw new AppError('Access denied', 403);
    }

    // Only allow status updates for admins
    if (status && !req.user!.isAdmin) {
      throw new AppError('Only admins can update appointment status', 403);
    }

    const updateData: any = {};
    
    if (appointmentDate) {
      const appointmentDateTime = new Date(appointmentDate);
      const now = new Date();
      
      if (appointmentDateTime <= now) {
        throw new AppError('Appointment date must be in the future', 400);
      }
      updateData.appointmentDate = appointmentDateTime;
    }

    if (notes !== undefined) updateData.notes = notes;
    if (specialRequests !== undefined) updateData.specialRequests = specialRequests;
    if (status) updateData.status = status;

    const appointment = await prisma.appointment.update({
      where: { id },
      data: updateData,
      include: {
        service: true
      }
    });

    res.json({
      success: true,
      data: appointment,
      message: 'Appointment updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Cancel appointment
router.delete('/:id', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { id } = req.params;

    const existingAppointment = await prisma.appointment.findUnique({
      where: { id }
    });

    if (!existingAppointment) {
      throw new AppError('Appointment not found', 404);
    }

    // Check if user owns this appointment or is admin
    if (existingAppointment.userId !== req.user!.id && !req.user!.isAdmin) {
      throw new AppError('Access denied', 403);
    }

    // Check if appointment can be cancelled (not in the past)
    const now = new Date();
    if (existingAppointment.appointmentDate <= now) {
      throw new AppError('Cannot cancel past appointments', 400);
    }

    // Update status to cancelled
    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status: 'CANCELLED' },
      include: {
        service: true
      }
    });

    res.json({
      success: true,
      data: appointment,
      message: 'Appointment cancelled successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get availability for a specific date
router.get('/availability/:date', optionalAuth, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { date } = req.params;
    const requestedDate = new Date(date);

    if (isNaN(requestedDate.getTime())) {
      throw new AppError('Invalid date format', 400);
    }

    // Get availability settings for the day of week
    const dayOfWeek = requestedDate.getDay();
    const availability = await prisma.availability.findFirst({
      where: { dayOfWeek }
    });

    if (!availability || !availability.isAvailable) {
      res.json({
        success: true,
        data: {
          date: date,
          timeSlots: []
        } as AvailabilityResponse,
        message: 'No availability for this date'
      });
      return;
    }

    // Generate time slots
    const timeSlots: TimeSlot[] = [];
    const startTime = parseInt(availability.startTime.split(':')[0]);
    const endTime = parseInt(availability.endTime.split(':')[0]);

    for (let hour = startTime; hour < endTime; hour++) {
      const timeString = `${hour.toString().padStart(2, '0')}:00`;
      
      // Check if this time slot is already booked
      const slotDateTime = new Date(requestedDate);
      slotDateTime.setHours(hour, 0, 0, 0);

      const existingAppointment = await prisma.appointment.findFirst({
        where: {
          appointmentDate: slotDateTime,
          status: {
            in: ['SCHEDULED', 'CONFIRMED']
          }
        }
      });

      timeSlots.push({
        time: timeString,
        available: !existingAppointment
      });
    }

    const response: AvailabilityResponse = {
      date: date,
      timeSlots
    };

    res.json({
      success: true,
      data: response,
      message: 'Availability retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Admin routes - Get all appointments
router.get('/admin/all', authenticateToken, requireAdmin, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { status, date, page = 1, limit = 10 } = req.query;
    
    const where: any = {};
    
    if (status) {
      where.status = status;
    }
    
    if (date) {
      const startDate = new Date(date as string);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      
      where.appointmentDate = {
        gte: startDate,
        lt: endDate
      };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where,
        include: {
          service: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true
            }
          }
        },
        orderBy: { appointmentDate: 'asc' },
        skip,
        take: Number(limit)
      }),
      prisma.appointment.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        appointments,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      },
      message: 'All appointments retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
