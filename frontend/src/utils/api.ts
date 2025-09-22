import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse } from '../types';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API methods
export const apiClient = {
  // Auth endpoints
  auth: {
    login: (data: { email: string; password: string }) =>
      api.post<ApiResponse>('/auth/login', data),
    
    register: (data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      phone?: string;
      hairType?: string;
      hairLength?: string;
    }) => api.post<ApiResponse>('/auth/register', data),
    
    me: () => api.get<ApiResponse>('/auth/me'),
    
    refresh: () => api.post<ApiResponse>('/auth/refresh'),
    
    logout: () => api.post<ApiResponse>('/auth/logout'),
  },

  // Services endpoints
  services: {
    getAll: () => api.get<ApiResponse>('/services'),
    
    getById: (id: string) => api.get<ApiResponse>(`/services/${id}`),
    
    getByCategory: (category: string) =>
      api.get<ApiResponse>(`/services/category/${category}`),
    
    getCategories: () => api.get<ApiResponse>('/services/meta/categories'),
  },

  // Appointments endpoints
  appointments: {
    getMyAppointments: () => api.get<ApiResponse>('/appointments/my-appointments'),
    
    getById: (id: string) => api.get<ApiResponse>(`/appointments/${id}`),
    
    create: (data: {
      serviceId: string;
      appointmentDate: string;
      paymentMethod: 'CARD' | 'ZELLE';
      notes?: string;
      specialRequests?: string;
    }) => api.post<ApiResponse>('/appointments', data),
    
    update: (id: string, data: any) =>
      api.put<ApiResponse>(`/appointments/${id}`, data),
    
    cancel: (id: string) => api.delete<ApiResponse>(`/appointments/${id}`),
    
    getAvailability: (date: string) =>
      api.get<ApiResponse>(`/appointments/availability/${date}`),
  },

  // User endpoints
  users: {
    getProfile: () => api.get<ApiResponse>('/users/profile'),
    
    updateProfile: (data: any) => api.put<ApiResponse>('/users/profile', data),
    
    getAppointments: (params?: { status?: string; limit?: number }) =>
      api.get<ApiResponse>('/users/appointments', { params }),
    
    getReviews: () => api.get<ApiResponse>('/users/reviews'),
    
    createReview: (data: { rating: number; comment?: string }) =>
      api.post<ApiResponse>('/users/reviews', data),
  },

  // Payments endpoints
  payments: {
    createIntent: (data: {
      amount: number;
      currency?: string;
      appointmentId: string;
    }) => api.post<ApiResponse>('/payments/create-intent', data),
    
    confirm: (data: {
      paymentIntentId: string;
      appointmentId: string;
    }) => api.post<ApiResponse>('/payments/confirm', data),
    
    getStatus: (appointmentId: string) =>
      api.get<ApiResponse>(`/payments/status/${appointmentId}`),
    
    getZelleInstructions: () =>
      api.get<ApiResponse>('/payments/zelle-instructions'),
  },

  // Admin endpoints
  admin: {
    getDashboard: () => api.get<ApiResponse>('/admin/dashboard'),
    
    getClients: (params?: { page?: number; limit?: number; search?: string }) =>
      api.get<ApiResponse>('/admin/clients', { params }),
    
    getClient: (id: string) => api.get<ApiResponse>(`/admin/clients/${id}`),
    
    updateAppointmentStatus: (id: string, status: string) =>
      api.put<ApiResponse>(`/admin/appointments/${id}/status`, { status }),
    
    getAllAppointments: (params?: {
      status?: string;
      date?: string;
      page?: number;
      limit?: number;
    }) => api.get<ApiResponse>('/admin/appointments/all', { params }),
    
    getReviews: (params?: { page?: number; limit?: number; isVisible?: boolean }) =>
      api.get<ApiResponse>('/admin/reviews', { params }),
    
    updateReviewVisibility: (id: string, isVisible: boolean) =>
      api.put<ApiResponse>(`/admin/reviews/${id}/visibility`, { isVisible }),
    
    getAnalytics: (period?: string) =>
      api.get<ApiResponse>('/admin/analytics', { params: { period } }),
  },
};

export default api;
