# 📧 Email Notifications Setup Guide

## 🚨 Current Status
**Email notifications are NOT working** because you're using Supabase instead of the local backend that had email functionality.

## 🔧 Solution: Use Your Existing Gmail Setup

### ✅ What I've Done:
1. **Created Vercel API endpoint** (`/api/send-emails.js`) that uses your existing Gmail setup
2. **Updated email service** to use your `braidsbyevaofficial@gmail.com` account
3. **Professional email templates** for both customer and braider notifications
4. **Same Gmail SMTP setup** you were using before

### 📋 What You Need to Do:

#### Step 1: Add the API File to Your Vercel Project
1. **Copy the `api/send-emails.js` file** to your Vercel project root
2. **Make sure it's in the `/api` folder** of your Vercel deployment

#### Step 2: Set Environment Variables in Vercel
1. Go to your **Vercel dashboard**
2. Select your **frontend project**
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
EMAIL_USER=braidsbyevaofficial@gmail.com
EMAIL_PASSWORD=your_gmail_app_password_here
```

**Note:** Use the same Gmail App Password you were using before!

#### Step 3: Redeploy Your Project
After adding the environment variables, trigger a new deployment.

## ✅ After Setup:
- ✅ **Customer gets confirmation email** with booking details
- ✅ **Braider gets notification email** with customer info  
- ✅ **Uses your existing Gmail account** (braidsbyevaofficial@gmail.com)
- ✅ **Professional email templates** with all booking information
- ✅ **Works on your live domain**
- ✅ **Same setup as before** - just works with Supabase now

## 🎯 How It Works:
1. **Customer books** → Supabase saves to database
2. **Frontend calls** `/api/send-emails` endpoint
3. **Vercel API** uses your Gmail SMTP to send emails
4. **Both customer and braider** receive professional emails

## 🆘 Need Help?
This uses your exact same Gmail setup as before - just moved to work with Supabase! Let me know if you need help with the Vercel deployment.
