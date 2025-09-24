import express from 'express';
import { prisma } from '../index';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { AppError, DashboardStats } from '../types';

const router = express.Router();

// All admin routes require authentication and admin privileges
router.use(authenticateToken);
router.use(requireAdmin);

// Get dashboard statistics
router.get('/dashboard', async (req, res, next) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const [
      totalAppointments,
      totalRevenue,
      totalClients,
      upcomingAppointments,
      recentAppointments,
      popularServices
    ] = await Promise.all([
      // Total appointments
      prisma.appointment.count(),
      
      // Total revenue (only paid appointments)
      prisma.appointment.aggregate({
        where: { paymentStatus: 'PAID' },
        _sum: { totalPrice: true }
      }),
      
      // Total unique clients
      prisma.user.count({
        where: { isAdmin: false }
      }),
      
      // Upcoming appointments (next 7 days)
      prisma.appointment.count({
        where: {
          appointmentDate: {
            gte: now,
            lte: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
          },
          status: {
            in: ['SCHEDULED', 'CONFIRMED']
          }
        }
      }),
      
      // Recent appointments (last 10)
      prisma.appointment.findMany({
        take: 10,
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
        orderBy: { createdAt: 'desc' }
      }),
      
      // Popular services
      prisma.appointment.groupBy({
        by: ['serviceId'],
        _count: { serviceId: true },
        where: { status: 'COMPLETED' },
        orderBy: { _count: { serviceId: 'desc' } },
        take: 5
      })
    ]);

    // Get service details for popular services
    const popularServiceIds = popularServices.map(s => s.serviceId);
    const serviceDetails = await prisma.service.findMany({
      where: { id: { in: popularServiceIds } },
      select: { id: true, name: true, category: true }
    });

    const popularServicesWithDetails = popularServices.map(ps => {
      const service = serviceDetails.find(s => s.id === ps.serviceId);
      return {
        ...ps,
        service: service || { name: 'Unknown Service' }
      };
    });

    const stats: DashboardStats = {
      totalAppointments,
      totalRevenue: totalRevenue._sum.totalPrice || 0,
      totalClients,
      upcomingAppointments,
      recentAppointments,
      popularServices: popularServicesWithDetails
    };

    res.json({
      success: true,
      data: stats,
      message: 'Dashboard statistics retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get all clients
router.get('/clients', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    
    const where: any = { isAdmin: false };
    
    if (search) {
      where.OR = [
        { firstName: { contains: search as string, mode: 'insensitive' } },
        { lastName: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [clients, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          hairType: true,
          hairLength: true,
          createdAt: true,
          _count: {
            select: { appointments: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: Number(limit)
      }),
      prisma.user.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        clients,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      },
      message: 'Clients retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get client details
router.get('/clients/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const client = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        hairType: true,
        hairLength: true,
        preferences: true,
        createdAt: true,
        appointments: {
          include: {
            service: true
          },
          orderBy: { appointmentDate: 'desc' }
        },
        reviews: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!client) {
      throw new AppError('Client not found', 404);
    }

    res.json({
      success: true,
      data: client,
      message: 'Client details retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Update appointment status
router.put('/appointments/:id/status', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      throw new AppError('Status is required', 400);
    }

    const validStatuses = ['SCHEDULED', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW'];
    if (!validStatuses.includes(status)) {
      throw new AppError('Invalid status', 400);
    }

    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status },
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

    res.json({
      success: true,
      data: appointment,
      message: 'Appointment status updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get all reviews
router.get('/reviews', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, isVisible } = req.query;
    
    const where: any = {};
    if (isVisible !== undefined) {
      where.isVisible = isVisible === 'true';
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: Number(limit)
      }),
      prisma.review.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        reviews,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      },
      message: 'Reviews retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Update review visibility
router.put('/reviews/:id/visibility', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isVisible } = req.body;

    if (typeof isVisible !== 'boolean') {
      throw new AppError('isVisible must be a boolean', 400);
    }

    const review = await prisma.review.update({
      where: { id },
      data: { isVisible },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: review,
      message: 'Review visibility updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get analytics data
router.get('/analytics', async (req, res, next) => {
  try {
    const { period = 'month' } = req.query;
    
    let startDate: Date;
    const endDate = new Date();
    
    switch (period) {
      case 'week':
        startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(endDate.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
    }

    const [
      appointmentsByStatus,
      revenueByMonth,
      popularServices,
      clientGrowth
    ] = await Promise.all([
      // Appointments by status
      prisma.appointment.groupBy({
        by: ['status'],
        _count: { status: true },
        where: {
          createdAt: { gte: startDate, lte: endDate }
        }
      }),
      
      // Revenue by month
      prisma.appointment.groupBy({
        by: ['appointmentDate'],
        _sum: { totalPrice: true },
        where: {
          paymentStatus: 'PAID',
          createdAt: { gte: startDate, lte: endDate }
        }
      }),
      
      // Popular services
      prisma.appointment.groupBy({
        by: ['serviceId'],
        _count: { serviceId: true },
        where: {
          createdAt: { gte: startDate, lte: endDate }
        },
        orderBy: { _count: { serviceId: 'desc' } },
        take: 5
      }),
      
      // Client growth
      prisma.user.groupBy({
        by: ['createdAt'],
        _count: { id: true },
        where: {
          isAdmin: false,
          createdAt: { gte: startDate, lte: endDate }
        }
      })
    ]);

    res.json({
      success: true,
      data: {
        appointmentsByStatus,
        revenueByMonth,
        popularServices,
        clientGrowth,
        period
      },
      message: 'Analytics data retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;



