# 🚀 XenoCRM — AI-Native Mini CRM

<p align="center">

# AI-native CRM for intelligent customer engagement

Build segments, launch campaigns, and analyze results using natural language.

</p>

<p align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=for-the-badge&logo=tailwind-css)
![Gemini](https://img.shields.io/badge/Gemini-AI-orange?style=for-the-badge)
![Neon](https://img.shields.io/badge/PostgreSQL-Neon-00E599?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)
![Railway](https://img.shields.io/badge/Railway-Backend-purple?style=for-the-badge)

</p>

---

# 🌟 Project Overview

XenoCRM is an **AI-native Mini CRM** built for the **Xeno Engineering Internship Assignment 2026**.

The application helps D2C brands:

- 📥 Ingest customer data
- 🎯 Create audience segments
- 🤖 Generate campaigns using AI
- 📢 Simulate message delivery
- 📈 Track engagement metrics
- 🔄 Handle callback-driven campaign updates

---

# 🌐 Live Deployment

## Frontend

**Vercel**

https://mini-crm-ormb.vercel.app

---

## Backend Channel Stub

**Railway**

https://mini-crm-production-0ae9.up.railway.app

---

# 🎥 Demo Video

(Add YouTube/Loom URL)

---

# Landing Page

Modern landing page introducing the AI-native CRM.

![](images/images/landing.png)

---

# Features

---

# 📊 Dashboard

Get an overview of:

- Total customers
- Revenue
- Active campaigns
- Delivery statistics

![](images/images/dashboard.png)

---

# 👥 Customer Management

Manage customer information and activity.

![](images/images/customers.png)

---

# 🎯 Smart Segmentation

Create customer audiences intelligently.

### Segment Builder

![](images/images/segment1.png)

### Segment Results

![](images/images/segment2.png)

---

# 📢 Campaign Management

Launch and monitor campaigns.

![](images/images/campaign.png)

---

# 🤖 AI Assistant

Natural language CRM operations powered by Gemini.

Examples:

- "How many customers do we have?"
- "Re-engage customers who haven't bought in 60 days with a 15% discount."

![](images/images/aiassistant.png)

---

# 📈 Analytics

Visualize campaign performance.

### Engagement Trends

![](images/images/analytics1.png)

### Channel Distribution

![](images/images/analytics2.png)

---

# 🏗 System Architecture

Two-service callback-driven architecture.

![](images/images/architecture.png)

---

# 🔄 Architecture Flow

```text
User
 ↓
Frontend (Next.js)
 ↓
Gemini AI Assistant
 ↓
API Routes
 ↓
Neon PostgreSQL
 ↓
Campaign Creation
 ↓
Channel Stub Service
 ↓
Simulated Delivery Events

Delivered
Opened
Clicked
Failed

↓
Receipt API

↓
Database Updates

↓
Analytics Dashboard
```

---

# ⚙️ Tech Stack

| Layer | Technology |
|---------|------------|
| Frontend | Next.js 16 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| Database | Neon PostgreSQL |
| ORM | Drizzle ORM |
| AI | Gemini 2.5 Flash |
| Backend | Node.js |
| Hosting | Vercel |
| Channel Service | Railway |

---

# 📁 Folder Structure

```bash
mini-crm
│
├── app/
├── components/
├── hooks/
├── lib/
├── public/
├── styles/
│
├── channel-stub/
│
├── drizzle.config.ts
├── package.json
├── README.md
└── images/
```

---

# 🚀 Setup Instructions

## Clone Repository

```bash
git clone https://github.com/yeshiraK/mini-crm.git

cd mini-crm
```

---

## Install Dependencies

```bash
npm install
```

---

## Create Environment Variables

Create:

```bash
.env.local
```

Add:

```env
DATABASE_URL=

GOOGLE_GENERATIVE_AI_API_KEY=

CHANNEL_STUB_URL=http://localhost:3001

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

# Start Frontend

```bash
npm run dev
```

Runs on:

```text
http://localhost:3000
```

---

# Start Channel Stub

```bash
cd channel-stub

npm install

npm run start
```

Runs on:

```text
http://localhost:3001
```

---

# ☁ Deployment

## Frontend

Hosted on Vercel

https://mini-crm-ormb.vercel.app

---

## Backend

Hosted on Railway

---

## Database

Hosted on Neon PostgreSQL

---

# AI-native Workflow

AI was used extensively throughout development for:

- Architecture discussions
- UI generation
- Backend implementation
- Debugging
- Deployment
- Refactoring
- System design decisions

Every generated output was reviewed, integrated, tested, and validated manually.

---

# 📈 Scale Assumptions and Tradeoffs

Current scope:

- Single-user CRM
- Simulated delivery events
- Callback-based communication
- Assignment-focused architecture

Production improvements would include:

- Redis
- Background workers
- Retry queues
- Kafka/RabbitMQ
- Event streaming
- Multi-tenant architecture

---

# 🔗 Links

### Live Product

https://mini-crm-ormb.vercel.app

### Frontend Repository

https://github.com/yeshiraK/mini-crm

### Backend Repository

https://github.com/yeshiraK/mini-crm

### Backend Service

hosted on railway

### Demo Video

(https://youtu.be/XcAwlp5rikM?si=gkmTRSUNbJGqI8OV)

---

# Built for Xeno Internship Assignment 2026

AI-native Mini CRM demonstrating:

- Intelligent segmentation
- Campaign orchestration
- AI-assisted workflows
- Analytics
- Callback-driven delivery simulation
- Full-stack product thinking
