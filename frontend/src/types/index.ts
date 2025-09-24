// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  hairType?: string;
  hairLength?: string;
  preferences?: any;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

// Service types
export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  basePrice: number;
  category: string;
  isActive: boolean;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Appointment types
export interface Appointment {
  id: string;
  userId: string;
  serviceId: string;
  appointmentDate: string;
  status: AppointmentStatus;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  stripePaymentId?: string;
  notes?: string;
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
  service?: Service;
  user?: User;
}

export type AppointmentStatus = 
  | 'SCHEDULED' 
  | 'CONFIRMED' 
  | 'IN_PROGRESS' 
  | 'COMPLETED' 
  | 'CANCELLED' 
  | 'NO_SHOW';

export type PaymentMethod = 'CARD' | 'ZELLE';

export type PaymentStatus = 
  | 'PENDING' 
  | 'PAID' 
  | 'FAILED' 
  | 'REFUNDED';

// Booking types
export interface BookingRequest {
  serviceId: string;
  appointmentDate: string;
  paymentMethod: PaymentMethod;
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

// Payment types
export interface PaymentIntentRequest {
  amount: number;
  currency: string;
  appointmentId: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  hairType?: string;
  hairLength?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Review types
export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment?: string;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

// Gallery types
export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
  price: string;
  duration: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Contact types
export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Admin types
export interface DashboardStats {
  totalAppointments: number;
  totalRevenue: number;
  totalClients: number;
  upcomingAppointments: number;
  recentAppointments: Appointment[];
  popularServices: any[];
}

// Form types
export interface FormError {
  field: string;
  message: string;
}

// Navigation types
export interface NavItem {
  name: string;
  href: string;
  current?: boolean;
}

// Component props types
export interface ServiceCardProps {
  service: Service;
  onBook?: (service: Service) => void;
}

export interface AppointmentCardProps {
  appointment: Appointment;
  onEdit?: (appointment: Appointment) => void;
  onCancel?: (appointment: Appointment) => void;
}

export interface ReviewCardProps {
  review: Review;
}

export interface GalleryCardProps {
  item: GalleryItem;
}



