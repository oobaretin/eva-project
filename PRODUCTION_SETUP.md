# Production Setup Guide

## 🚀 **Stripe Production Setup**

### 1. **Get Live Stripe Keys**
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Switch to **Live mode** (toggle in top left)
3. Go to **Developers > API Keys**
4. Copy your **Live keys**:
   - `Publishable key` (starts with `pk_live_`)
   - `Secret key` (starts with `sk_live_`)

### 2. **Set Up Webhook Endpoint**
1. In Stripe Dashboard, go to **Developers > Webhooks**
2. Click **Add endpoint**
3. Enter your backend URL: `https://braidsbyeva.com/api/payments/webhook`
4. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
5. Copy the **Webhook signing secret** (starts with `whsec_`)

### 3. **Update Environment Variables**

#### **Backend (Supabase)**
```bash
# Production Stripe
STRIPE_SECRET_KEY=sk_live_your_live_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_live_webhook_secret_here

# Production Database
DATABASE_URL=your_production_database_url

# Production Email
EMAIL_USER=braidsbyevaofficial@gmail.com
EMAIL_PASSWORD=your_app_password_here

# Production Frontend URL
FRONTEND_URL=https://braidsbyeva.com
```

#### **Frontend (Vercel)**
```bash
# Production Stripe
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_stripe_publishable_key_here

# Production API
REACT_APP_API_URL=https://your-backend-domain.com
```

## 🔧 **Deployment Checklist**

### **Backend (Supabase)**
- [ ] Update environment variables in Supabase
- [ ] Test webhook endpoint
- [ ] Verify email configuration
- [ ] Test payment processing

### **Frontend (Vercel)**
- [ ] Update environment variables in Vercel
- [ ] Set production API URL
- [ ] Test payment flow
- [ ] Verify domain configuration

## 🧪 **Testing Production**

### **Test Payment Flow**
1. Use real card numbers (not test cards)
2. Test with small amounts first
3. Verify webhook events are received
4. Check email notifications

### **Test Cards for Live Mode**
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

## 📞 **Support**
- Stripe Support: [support.stripe.com](https://support.stripe.com)
- Documentation: [stripe.com/docs](https://stripe.com/docs)
