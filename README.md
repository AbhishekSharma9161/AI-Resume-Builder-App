# 🚀 ResumeAI - AI-Powered Resume Builder

A modern, full-stack web application that helps users create professional, ATS-optimized resumes with AI assistance. Built with Next.js frontend, Node.js backend, and integrated with Google OAuth for seamless authentication.

## ✨ Features

### 🎯 Core Features
- **AI-Powered Resume Builder** - Interactive resume builder with smart suggestions
- **ATS Optimization** - Built-in ATS score checker to ensure resume compatibility
- **Professional Templates** - 10+ beautifully designed templates across different industries
- **Real-time Preview** - Live preview of resume as you build it
- **PDF Export** - Download professional resumes as PDF files

### 🔐 Authentication & User Management
- **Google OAuth Integration** - Secure sign-in with Google accounts
- **User Dashboard** - Comprehensive account management and settings
- **Resume Management** - Save, edit, and manage multiple resume versions

### 💳 Subscription & Billing
- **Flexible Pricing Plans** - Free, Professional, and Executive tiers
- **Stripe Integration** - Secure payment processing with multiple payment methods
- **Subscription Management** - Easy plan upgrades, downgrades, and cancellations

### 🎨 User Experience
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX** - Clean interface with smooth animations using Framer Motion
- **Professional Templates** - Industry-specific templates with live previews

## 🏗️ Project Structure

```
resumeai/
├── 📁 frontend/                    # Next.js Frontend Application
│   ├── 📁 public/                 # Static assets
│   ├── 📁 src/
│   │   ├── 📁 app/                # Next.js App Router pages
│   │   │   ├── 📁 account/        # User account management
│   │   │   ├── 📁 builder/        # Resume builder interface
│   │   │   ├── 📁 examples/       # Resume examples showcase
│   │   │   ├── 📁 pricing/        # Pricing plans page
│   │   │   ├── 📁 templates/      # Template gallery
│   │   │   ├── 📁 checkout/       # Payment success pages
│   │   │   ├── 📁 api/            # API routes (Stripe checkout)
│   │   │   ├── 📄 layout.tsx      # Root layout with providers
│   │   │   ├── 📄 page.tsx        # Homepage
│   │   │   └── 📄 globals.css     # Global styles
│   │   ├── 📁 components/         # Reusable React components
│   │   │   ├── 📁 ui/             # Shadcn/ui component library
│   │   │   ├── 📄 navbar.tsx      # Navigation component
│   │   │   ├── 📄 working-google-auth.tsx # Google OAuth integration
│   │   │   ├── 📄 ATSScoreChecker.tsx     # ATS optimization tool
│   │   │   └── 📄 PlaceholderPage.tsx     # Reusable placeholder pages
│   │   ├── � .contexts/           # React Context providers
│   │   │   └── 📄 auth-context.tsx # Authentication state management
│   │   ├── 📁 lib/                # Utility functions and configurations
│   │   │   ├── 📄 google-auth.ts  # Google OAuth configuration
│   │   │   ├── 📄 pdf-export.ts   # PDF generation utilities
│   │   │   └── 📄 utils.ts        # General utility functions
│   │   └── 📁 hooks/              # Custom React hooks
│   ├── � pac kage.json            # Frontend dependencies
│   ├── 📄 tailwind.config.js      # Tailwind CSS configuration
│   ├── � nextm.config.js          # Next.js configuration
│   ├── 📄 tsconfig.json           # TypeScript configuration
│   └── �  .env.local              # Environment variables
│
├── �  backend/                     # Node.js Backend API
│   ├── � src./                    # Source code
│   │   └── 📄 index.ts            # Express server entry point
│   ├── 📁 prisma/                 # Database schema and migrations
│   │   └── 📄 schema.prisma       # Prisma database schema
│   ├── � iscripts/                # Database utilities
│   │   └── 📄 init-db.ts          # Database seeding script
│   ├── 📄 package.json            # Backend dependencies
│   ├── 📄 tsconfig.json           # TypeScript configuration
│   ├── 📄 .env                    # Environment variables
│   └── 📄 dev.db                  # SQLite database (development)
│
├── 📄 package.json                # Root package.json with workspace scripts
├── 📄 README.md                   # Project documentation (this file)
└── 📄 .gitignore                  # Git ignore rules
```

## 🛠️ Technology Stack

### Frontend Technologies
- **Framework:** Next.js 14.2.31 with App Router
- **Language:** TypeScript 5.5.3
- **Styling:** Tailwind CSS 3.4.11 + Shadcn/ui components
- **Animations:** Framer Motion 12.6.2
- **Authentication:** Google OAuth 2.0 Identity Services
- **State Management:** React Context API
- **PDF Generation:** jsPDF + html2canvas
- **UI Components:** Radix UI primitives + custom components
- **Icons:** Lucide React
- **Build Tool:** Next.js built-in Turbopack

### Backend Technologies
- **Runtime:** Node.js 20.15.0
- **Framework:** Express.js 4.18.2
- **Language:** TypeScript 5.5.3
- **Database:** SQLite (development) / PostgreSQL (production ready)
- **ORM:** Prisma 6.13.0
- **Authentication:** JWT token handling
- **Payment Processing:** Stripe integration ready
- **API Design:** RESTful API architecture

### Development & Build Tools
- **Package Manager:** npm 10.7.0
- **Code Quality:** ESLint + TypeScript strict mode
- **Database Tools:** Prisma Studio for database management
- **Development:** Hot reload with tsx/Next.js dev servers
- **Version Control:** Git with .gitignore optimized for Node.js/Next.js

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v20.15.0 or higher)
- **npm** (v10.7.0 or higher)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/resumeai.git
cd resumeai
```

### 2. Install Dependencies
```bash
# Install all dependencies (frontend + backend)
npm run install:all
```

### 3. Environment Setup

#### Frontend Environment
Create `frontend/.env.local`:
```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000

# Google OAuth (Working test client ID included)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=764086051850-6qr4p6gpi6hn506pt8ejuq83di341hur.apps.googleusercontent.com

# Development mode
NODE_ENV=development
```

#### Backend Environment  
Create `backend/.env`:
```bash
# Server Configuration
PORT=5000
DATABASE_URL="file:./dev.db"
PING_MESSAGE="Backend server is running!"

# Optional API Keys (for production features)
OPENAI_API_KEY=your_openai_api_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
```

### 4. Database Setup
```bash
# Navigate to backend directory
cd backend

# Generate Prisma client
npx prisma generate

# Create and migrate database
npm run db:push

# (Optional) Seed database with sample data
npm run db:seed
```

### 5. Start Development Servers
```bash
# From root directory - starts both frontend and backend
npm run dev
```

This will start:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

## 📱 Usage

### For Users
1. **Visit the Application:** Open http://localhost:3000
2. **Sign In:** Click "Sign In" and use Google OAuth
3. **Choose Template:** Browse and select from 10+ professional templates
4. **Build Resume:** Fill in your information with AI assistance
5. **Download:** Export your resume in PDF, Word, or text format

### For Developers
1. **Frontend Development:** Work in `frontend/src/` directory
2. **Backend Development:** Work in `backend/src/` directory
3. **Database Changes:** Update `backend/prisma/schema.prisma`
4. **UI Components:** Use Shadcn/ui components in `frontend/src/components/ui/`

## 🔧 Available Scripts

### Root Level Scripts
```bash
npm run install:all    # Install all dependencies
npm run dev            # Start both frontend and backend
npm run build          # Build both applications
npm run start          # Start production servers
```

### Frontend Scripts
```bash
cd frontend
npm run dev            # Start Next.js development server
npm run build          # Build for production
npm run start          # Start production server
npm run lint           # Run ESLint
npm run typecheck      # Run TypeScript type checking
```

### Backend Scripts
```bash
cd backend
npm run dev            # Start Express development server
npm run build          # Build TypeScript to JavaScript
npm run start          # Start production server
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema changes to database
npm run db:migrate     # Run database migrations
npm run db:seed        # Seed database with sample data
npm run db:studio      # Open Prisma Studio
```

## 🌐 Deployment

### Frontend (Vercel - Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Railway/Heroku)
1. Set up PostgreSQL database
2. Update DATABASE_URL in environment variables
3. Deploy using platform-specific instructions

### Environment Variables for Production
```bash
# Frontend
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-production-google-client-id

# Backend
DATABASE_URL=postgresql://username:password@host:port/database
OPENAI_API_KEY=your-openai-api-key
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
```

## 🔐 Google OAuth Setup

### Development (Ready to Use)
The application includes a **working test Google Client ID** that allows you to:
- Sign in with any Google account
- Test the complete authentication flow
- Access all authenticated features

### Production Setup
For production deployment, create your own Google OAuth credentials:

1. **Google Cloud Console Setup**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google Identity Services API

2. **OAuth 2.0 Configuration**
   - Navigate to APIs & Services > Credentials
   - Create OAuth 2.0 Client ID (Web application)
   - Add authorized origins:
     - `http://localhost:3000` (development)
     - `https://yourdomain.com` (production)

3. **Environment Update**
   - Replace `NEXT_PUBLIC_GOOGLE_CLIENT_ID` in `.env.local`
   - Deploy with your production client ID

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch:** `git checkout -b feature/amazing-feature`
3. **Commit changes:** `git commit -m 'Add amazing feature'`
4. **Push to branch:** `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation:** Check this README and inline code comments
- **Issues:** Open an issue on GitHub for bugs or feature requests
- **Discussions:** Use GitHub Discussions for questions and ideas

## 🙏 Acknowledgments

- **Shadcn/ui** for the beautiful UI components
- **Tailwind CSS** for the utility-first CSS framework
- **Prisma** for the excellent database toolkit
- **Next.js** for the powerful React framework
- **Google** for OAuth integration

---

**Built with ❤️ by the ResumeAI Team**

*Helping job seekers create professional resumes with the power of AI*