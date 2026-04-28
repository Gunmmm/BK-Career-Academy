# BK Career Academy - Deployment & System Audit Guide

This document outlines the systematic structure of the portal and provides a checklist for deep testing before production deployment.

## 📂 Systematic Project Structure

The project has been organized into a clean, modular architecture:

### 1. Backend (`/backend`)
- **`app.js`**: Core Express application logic and middleware.
- **`server.js`**: Entry point (starts the server and connects to DB).
- **`controllers/`**: Logical handlers for admissions, registration, and admin tasks.
- **`models/`**: Mongoose schemas for data integrity.
- **`routes/`**: API endpoint definitions.
- **`utils/`**: Helper functions (PDF formatting, async handlers).
- **`server_archive/`**: Contains legacy code and combined scripts for reference.

### 2. Frontend (`/frontend`)
- **`src/pages/`**: Main views (Home, About, Admissions, etc.).
- **`src/components/`**: Reusable UI blocks (Footer, Hero, ChatWidget).
- **`src/data/`**: Global constants (Exam categories, logo lists).
- **`public/uploads/`**: Local storage for student photos and signatures.

---

## 🔍 Deep Test Checklist

To "Test in the Deep," perform these exact steps:

### Phase 1: Admission Integrity
- [ ] **Photo/Sign Upload**: Register a new student. Ensure images appear in `/uploads/`.
- [ ] **Duplicate Validation**: Try using the same phone number for Self and Parent. (Should be blocked).
- [ ] **Email Uniqueness**: Try registering twice with the same email. (Should be blocked).
- [ ] **Local Names**: Ensure Marathi/Hindi names display correctly in the final PDF.

### Phase 2: Administrative Control
- [ ] **Admin Login**: Access the Control Panel using your ID and Password.
- [ ] **Password Toggle**: Test the new 'Eye' icon to show/hide your password.
- [ ] **PDF Generation**: Open a student record and click "DOWNLOAD PDF." Ensure all fields align perfectly.
- [ ] **Lead Management**: Verify that "Raising a Ticket" in the Chat Widget creates a new alert in the Admin Dashboard.

### Phase 3: Brand & Interaction
- [ ] **Category Branding**: Verify the "Police & Security Services" card shows the Ashok Stambh image.
- [ ] **Footer Deep-Links**: 
    - Click Phone -> Should open dialer.
    - Click Email -> Should open mail client.
    - Click Address -> Should open Google Maps.
- [ ] **Resource Grid**: Verify that all newspaper logos (The Hindu, PIB, etc.) have their names listed underneath.

---

## 🚀 Deployment Instructions

### Local Production Build
1. **Frontend**:
   ```bash
   cd frontend
   npm run build
   ```
2. **Backend**:
   Ensure `.env` has the production `MONGODB_URI`.
   ```bash
   cd backend
   npm start
   ```

### Cloud Deployment (VPS/Heroku/Vercel)
- **Database**: Use MongoDB Atlas for a cloud-hosted database.
- **Static Files**: If deploying to a serverless environment (like Vercel), move `/uploads` to a cloud bucket (AWS S3) as the local disk is temporary.
- **Environment**: Set `NODE_ENV=production` in your hosting provider's dashboard.

**JAY HIND.**
