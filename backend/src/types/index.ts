import { Request } from 'express';
import { Prisma } from '@prisma/client';

// Define User type from Prisma
type User = Prisma.UserGetPayload<{}>;

// Extend Express Request to include user
export interface AuthenticatedRequest extends Request {
  user?: User;
}

// JWT Payload interface
export interface JWTPayload {
  userId: string;
  email: string;
  isAdmin: boolean;
  iat?: number;
  exp?: number;
}

// API Response interfaces
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Booking interfaces
export interface BookingRequest {
  serviceId: string;
  appointmentDate: string;
  paymentMethod: 'CARD' | 'ZELLE';
  notes?: string;
  specialRequests?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface AvailabilityResponse {
  date: string;
  timeSlots: TimeSlot[];
}

// Payment interfaces
export interface PaymentIntentRequest {
  amount: number;
  currency: string;
  appointmentId: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

// Service interfaces
export interface ServiceWithImage {
  id: string;
  name: string;
  description: string;
  duration: number;
  basePrice: number;
  category: string;
  isActive: boolean;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// User registration/login interfaces
export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  hairType?: string;
  hairLength?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  token: string;
}

// Admin interfaces
export interface DashboardStats {
  totalAppointments: number;
  totalRevenue: number;
  totalClients: number;
  upcomingAppointments: number;
  recentAppointments: any[];
  popularServices: any[];
}

// Error types
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
