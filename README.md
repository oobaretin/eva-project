# BraidsbyEva.com - Professional Braiding Appointment App

A modern, professional braiding appointment booking website for Eva's braiding business located in Katy, Texas.

## 🚀 Features

- **Professional Landing Page** - Beautiful, responsive design showcasing Eva's services
- **User Authentication** - Secure login/registration with JWT tokens
- **Service Catalog** - Comprehensive list of braiding services with pricing
- **Appointment Booking** - Multi-step booking flow with calendar integration
- **Payment Processing** - Stripe integration for card payments and Zelle support
- **Admin Dashboard** - Complete management system for Eva to handle appointments
- **Client Portal** - User dashboard for managing appointments and profile
- **Responsive Design** - Mobile-first design that works on all devices

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Framer Motion** for animations
- **React Hook Form** for form handling
- **Axios** for API calls
- **Stripe** for payment processing

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **Prisma ORM** with PostgreSQL
- **JWT** for authentication
- **Stripe** for payment processing
- **Nodemailer** for email notifications

## 📁 Project Structure

```
braidsbyeva/
├── frontend/                 # React TypeScript app
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React contexts (Auth, etc.)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   └── types/           # TypeScript type definitions
│   ├── public/              # Static assets
│   └── package.json
├── backend/                 # Node.js API
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Database models
│   │   └── utils/           # Utility functions
│   ├── prisma/              # Database schema and migrations
│   └── package.json
└── shared/                  # Shared types and utilities
    └── types/
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd braidsbyeva
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   
   # Set up environment variables
   cp .env.example .env
   # Edit .env with your database and API keys
   
   # Set up the database
   npx prisma migrate dev
   npx prisma generate
   
   # Seed the database with initial data
   npm run db:seed
   
   # Start the backend server
   npm run dev
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   
   # Set up environment variables
   cp .env.example .env.local
   # Edit .env.local with your API URL and keys
   
   # Start the frontend development server
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Database Studio: `npx prisma studio` (from backend directory)

## 🔧 Environment Variables

### Backend (.env)
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/braidsbyeva"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# Stripe
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# Email
EMAIL_USER="braidsbyevaofficial@gmail.com"
EMAIL_PASS="your-app-password"

# SMS (Twilio)
TWILIO_ACCOUNT_SID="your_twilio_account_sid"
TWILIO_AUTH_TOKEN="your_twilio_auth_token"
TWILIO_PHONE_NUMBER="+1234567890"

# Server
PORT=3001
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
```

### Frontend (.env.local)
```env
# API Configuration
REACT_APP_API_URL=http://localhost:3001/api

# Stripe Configuration
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Google Maps API
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## 📊 Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:

- **User** - Client and admin user accounts
- **Service** - Braiding services with pricing and descriptions
- **Appointment** - Booking records with status and payment info
- **Availability** - Eva's working hours and schedule
- **Review** - Client testimonials and ratings
- **Gallery** - Portfolio images of completed work

## 🔐 Authentication

- JWT-based authentication with secure token storage
- Protected routes for authenticated users
- Admin role-based access control
- Password hashing with bcrypt

## 💳 Payment Processing

- **Stripe Integration** - Secure credit/debit card processing
- **Zelle Support** - Direct bank transfer instructions
- **Payment Status Tracking** - Real-time payment confirmation
- **Webhook Handling** - Automatic payment status updates

## 📱 Features Overview

### For Clients
- Browse services and pricing
- Book appointments with calendar selection
- Manage profile and preferences
- View appointment history
- Leave reviews and ratings
- Secure payment processing

### For Eva (Admin)
- Complete dashboard with business analytics
- Manage appointments and client information
- Update service offerings and pricing
- Handle payment processing
- View client reviews and feedback
- Generate business reports

## 🎨 Design System

- **Color Palette**: Warm, professional tones with primary orange and secondary grays
- **Typography**: Inter for body text, Playfair Display for headings
- **Components**: Reusable UI components with consistent styling
- **Responsive**: Mobile-first design that scales to all screen sizes
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels

## 🚀 Deployment

### Recommended Platforms
- **Frontend**: Vercel or Netlify
- **Backend**: Railway, Heroku, or DigitalOcean
- **Database**: PostgreSQL on Railway, Supabase, or AWS RDS

### Production Checklist
- [ ] Set up production database
- [ ] Configure environment variables
- [ ] Set up Stripe webhooks
- [ ] Configure email service
- [ ] Set up domain and SSL certificates
- [ ] Run database migrations
- [ ] Deploy backend API
- [ ] Deploy frontend application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 📞 Support

For support or questions, please contact:
- Email: braidsbyevaofficial@gmail.com
- Phone: (832) 207-9386

## 🙏 Acknowledgments

- Built with modern web technologies and best practices
- Designed for professional braiding businesses
- Optimized for user experience and business efficiency
# Trigger Vercel rebuild
