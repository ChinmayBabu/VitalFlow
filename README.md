# Real-Time Blood Shortage Alert & Donor Mobilization System

A web-based emergency blood donation platform that enables hospitals and blood banks to raise real-time shortage alerts, match eligible donors via geolocation, optimize routing, and coordinate inventory sharing — built using *React + Vite + TypeScript*.

---

## 🚀 Features

- *Real-Time Shortage Alerts* – Hospitals trigger alerts for specific blood types in critical shortage.
- *Donor Matching* – Geolocation + eligibility-based matching with MongoDB geospatial queries.
- *Dynamic Routing* – ETA-aware donor & courier routing via mapping API integration.
- *Hospital Coordination Dashboard* – Track requests, donor responses, and manage mutual aid offers.
- *AI-Powered Donor Screening* – Chatbot-based pre-donation checks (travel history, medications).
- *Virtual Donor Coaching* – Tele-health video sessions for first-time donors.
- *Role-Based Access Control* – Secure, multi-tenant management for hospitals, staff, and donors.
- *Personalized Notifications* – ML-based channel/timing optimization (SMS, Email, Push).
- *Post-Donation Care* – Automated follow-ups, health tracking, and retention analytics.

---

## 🛠 Tech Stack

- *Frontend*: [React](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- *Backend (Planned)*: Node.js / Express or Firebase Functions
- *Database*: MongoDB (Geospatial queries)
- *Mapping & Routing*: Google Maps API / Mapbox
- *Notifications*: Twilio (SMS), SendGrid (Email), Firebase Cloud Messaging (Push)
- *Video Calls*: WebRTC / Tele-health API
- *AI Components*: Google AI Build chatbots + ML models for engagement optimization

---

## 📦 Installation

1. *Clone the repository*
   bash
   git clone https://github.com/your-repo/blood-alert-system.git
   cd blood-alert-system
   

2. *Install dependencies*
   bash
   npm install
   

3. *Set environment variables*
   Create a .env file in the project root:
   env
   VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_TWILIO_SID=your_twilio_sid
   

4. *Run development server*
   bash
   npm run dev
   

5. *Build for production*
   bash
   npm run build
   

---

## 📸 Screenshots (Optional)
(Add UI snapshots here for dashboard, donor map, alerts view, etc.)

---

## 📌 Project Structure

src/
 ├─ components/   # UI Components
 ├─ pages/        # Route Pages
 ├─ hooks/        # Custom Hooks
 ├─ services/     # API & Integration Logic
 ├─ assets/       # Static Files
 ├─ App.tsx       # Root Component
 └─ main.tsx      # Entry Point


---

## 🔒 Security & Privacy
- Role-based access for hospitals, donors, and coordinators
- Secure token-based authentication
- GDPR-compliant data handling

---

## 🤝 Contributors
- *Team Name* – Developed during Hackathon using *Google AI Build*
- Built by: [Your Names Here]

---

## 📄 License
This project is licensed under the MIT License.
