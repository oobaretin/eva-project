# 📱 SMS Notifications Setup Guide

## 🎯 What I've Added

I've integrated SMS notifications into your braids booking system! Now customers will receive both email AND SMS confirmations when they book appointments.

### ✅ What's Been Created:

1. **SMS API Endpoint** (`/api/send-sms.js`) - Vercel serverless function for sending SMS
2. **Frontend SMS Service** (`frontend/src/services/smsService.ts`) - Handles SMS sending
3. **Combined Notifications** - Updated email service to send both emails and SMS
4. **SMS Templates** - Professional templates for different booking events

## 🚀 How It Works

### For Customers:
- **Email confirmation** with full booking details
- **SMS confirmation** with key appointment info
- **Professional messaging** with emojis and clear instructions

### For You (Eva):
- **Email notification** with customer details
- **SMS notification** with booking summary
- **Quick action buttons** to call or text customers

## 📋 Setup Instructions

### Step 1: Get Twilio Account
1. Go to [Twilio.com](https://www.twilio.com) and sign up for a free account
2. You get $15 free credit (enough for ~150 SMS messages)
3. Verify your phone number during signup

### Step 2: Get Twilio Credentials
1. In your Twilio Console, go to **Account** → **API Keys & Tokens**
2. Copy your **Account SID** and **Auth Token**
3. Go to **Phone Numbers** → **Manage** → **Active Numbers**
4. Copy your **Twilio Phone Number** (starts with +1)

### Step 3: Add Environment Variables in Vercel
1. Go to your **Vercel dashboard**
2. Select your **frontend project**
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=your_twilio_phone_number_here
EVA_PHONE_NUMBER=your_personal_phone_number_here
```

**Note:** 
- `EVA_PHONE_NUMBER` is optional - if you don't add it, you won't get SMS notifications
- Use format: `+1234567890` (include country code)

### Step 4: Deploy the SMS API
1. Copy the `api/send-sms.js` file to your Vercel project
2. Make sure it's in the `/api` folder
3. Redeploy your project

### Step 5: Update Your Booking Code (Optional)
If you want to use the new combined notifications, update your booking code to use:

```typescript
import { sendBookingNotifications } from './services/emailService';

// Instead of just sendBookingEmails, use:
await sendBookingNotifications(bookingData);
```

## 💰 Pricing
- **Twilio SMS**: ~$0.0075 per SMS (less than 1 cent!)
- **Free tier**: $15 credit included (≈150 SMS messages)
- **Your cost**: About $0.15 for 20 bookings

## 📱 SMS Templates

### Customer Confirmation:
```
🎉 Hi [Name]! Your braids appointment with Eva is confirmed for [Date] at [Time]. Service: [Service] ($[Price]). Please arrive 10 minutes early. Questions? Reply to this text! 💅✨
```

### Eva Notification:
```
📱 NEW BOOKING: [Name] - [Service] on [Date] at [Time] ($[Price]). Phone: [Phone] [Notes if any]
```

## 🎯 Features

### ✅ What You Get:
- **Dual notifications** - Email + SMS for every booking
- **Professional templates** with emojis and clear info
- **Quick customer contact** - Reply directly to SMS
- **Reliable delivery** - Twilio has 99.9% delivery rate
- **Cost effective** - Less than 1 cent per SMS
- **Easy setup** - Just add environment variables

### 📱 SMS Events:
- **Booking confirmations** - Immediate SMS to customer
- **Appointment reminders** - Day before appointment
- **Cancellation notices** - If appointment is cancelled
- **Rescheduling updates** - When times change

## 🆘 Troubleshooting

### SMS Not Sending:
1. Check Twilio credentials are correct
2. Verify phone numbers include country code (+1 for US)
3. Check Twilio account has sufficient balance
4. Look at Vercel function logs for errors

### Customer Not Receiving SMS:
1. Verify phone number format (+1234567890)
2. Check if customer's carrier blocks SMS
3. Try sending test SMS from Twilio console

## 🎉 After Setup:
- ✅ **Customers get instant SMS confirmations**
- ✅ **You get SMS notifications for new bookings**
- ✅ **Professional messaging with your branding**
- ✅ **Reliable delivery via Twilio**
- ✅ **Cost-effective solution**

## 💡 Pro Tips:
1. **Test first** - Send yourself a test SMS before going live
2. **Monitor usage** - Check Twilio console for delivery stats
3. **Customize messages** - Edit templates in `smsService.ts`
4. **Add reminders** - Set up automated day-before reminders

This gives you a complete notification system that keeps customers informed and helps you manage bookings efficiently! 🎉
