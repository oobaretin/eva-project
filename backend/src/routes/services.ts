import express from 'express';
import { prisma } from '../index';
import { authenticateToken, requireAdmin, optionalAuth } from '../middleware/auth';
import { AppError } from '../types';

const router = express.Router();

// Get all active services
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: [
        { category: 'asc' },
        { basePrice: 'asc' }
      ]
    });

    res.json({
      success: true,
      data: services,
      message: 'Services retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get service by ID
router.get('/:id', optionalAuth, async (req, res, next) => {
  try {
    const { id } = req.params;

    const service = await prisma.service.findUnique({
      where: { id }
    });

    if (!service) {
      throw new AppError('Service not found', 404);
    }

    res.json({
      success: true,
      data: service,
      message: 'Service retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get services by category
router.get('/category/:category', optionalAuth, async (req, res, next) => {
  try {
    const { category } = req.params;

    const services = await prisma.service.findMany({
      where: { 
        category: category,
        isActive: true 
      },
      orderBy: { basePrice: 'asc' }
    });

    res.json({
      success: true,
      data: services,
      message: `Services in ${category} category retrieved successfully`
    });
  } catch (error) {
    next(error);
  }
});

// Admin routes - Create service
router.post('/', authenticateToken, requireAdmin, async (req, res, next) => {
  try {
    const { name, description, duration, basePrice, category, imageUrl } = req.body;

    if (!name || !description || !duration || !basePrice || !category) {
      throw new AppError('Name, description, duration, basePrice, and category are required', 400);
    }

    const service = await prisma.service.create({
      data: {
        name,
        description,
        duration: parseInt(duration),
        basePrice: parseFloat(basePrice),
        category,
        imageUrl
      }
    });

    res.status(201).json({
      success: true,
      data: service,
      message: 'Service created successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Admin routes - Update service
router.put('/:id', authenticateToken, requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, duration, basePrice, category, imageUrl, isActive } = req.body;

    const existingService = await prisma.service.findUnique({
      where: { id }
    });

    if (!existingService) {
      throw new AppError('Service not found', 404);
    }

    const service = await prisma.service.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(duration && { duration: parseInt(duration) }),
        ...(basePrice && { basePrice: parseFloat(basePrice) }),
        ...(category && { category }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(isActive !== undefined && { isActive })
      }
    });

    res.json({
      success: true,
      data: service,
      message: 'Service updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Admin routes - Delete service (soft delete)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingService = await prisma.service.findUnique({
      where: { id }
    });

    if (!existingService) {
      throw new AppError('Service not found', 404);
    }

    // Soft delete by setting isActive to false
    const service = await prisma.service.update({
      where: { id },
      data: { isActive: false }
    });

    res.json({
      success: true,
      data: service,
      message: 'Service deactivated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get service categories
router.get('/meta/categories', optionalAuth, async (req, res, next) => {
  try {
    const categories = await prisma.service.findMany({
      where: { isActive: true },
      select: { category: true },
      distinct: ['category'],
      orderBy: { category: 'asc' }
    });

    const categoryList = categories.map(c => c.category);

    res.json({
      success: true,
      data: categoryList,
      message: 'Service categories retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;



