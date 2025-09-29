# 🔧 Vercel Environment Variables Setup

## 📋 Environment Variables to Add

You need to add these environment variables in your Vercel dashboard:

### **Required Variables:**

1. **EMAIL_USER**
   - Value: `braidsbyevaofficial@gmail.com`
   - Description: Your Gmail email address

2. **EMAIL_PASSWORD**
   - Value: `dlrj tzws keuv wsdg`
   - Description: Your Gmail App Password (not your regular password)

## 🚀 How to Add Environment Variables in Vercel:

### **Step 1: Go to Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Sign in to your account
3. Select your **BraidsbyEva project**

### **Step 2: Navigate to Settings**
1. Click on your project
2. Go to **Settings** tab
3. Click on **Environment Variables** in the left sidebar

### **Step 3: Add the Variables**
1. Click **Add New**
2. Add each variable:

   **Variable 1:**
   - Name: `EMAIL_USER`
   - Value: `braidsbyevaofficial@gmail.com`
   - Environment: Production, Preview, Development (select all)

   **Variable 2:**
   - Name: `EMAIL_PASSWORD`
   - Value: `dlrj tzws keuv wsdg`
   - Environment: Production, Preview, Development (select all)

### **Step 4: Redeploy**
1. After adding the variables, go to **Deployments** tab
2. Click **Redeploy** on your latest deployment
3. Or trigger a new deployment by pushing to GitHub

## ✅ **What This Enables:**

- ✅ **Customer confirmation emails** - Sent automatically when they book
- ✅ **Eva notification emails** - You get notified of new bookings
- ✅ **Professional email templates** - Beautiful HTML emails
- ✅ **Reliable delivery** - Uses Gmail SMTP for delivery
- ✅ **No backend required** - Works with Vercel serverless functions

## 🔒 **Security Notes:**

- The `EMAIL_PASSWORD` is your Gmail App Password, not your regular password
- This is safe to use in environment variables
- Vercel encrypts these values for security
- Only your Vercel project can access these variables

## 🧪 **Testing:**

After setting up the environment variables:
1. Deploy your project to Vercel
2. Test the booking form
3. Check that emails are sent to both parties
4. Verify the emails arrive in your inbox

## 🆘 **Troubleshooting:**

If emails don't work after setup:
1. Check that environment variables are set correctly
2. Verify the Gmail App Password is correct
3. Make sure you've redeployed after adding the variables
4. Check the Vercel function logs for any errors

Your email service will work perfectly once these environment variables are set up!
