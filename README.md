# ResumeAI - AI-Powered Resume Builder

A modern, full-stack resume builder application powered by AI and Clerk authentication that helps users create professional, ATS-optimized resumes in minutes.

<img width="1882" height="892" alt="Image" src="https://github.com/user-attachments/assets/ea7431df-595b-4b1f-9746-63797a1d224a" />

## 🚀 Features

### Core Features
- **AI-Powered Content Generation**: Get intelligent suggestions for job descriptions, skills, and achievements
- **Clerk Authentication**: Secure user authentication with email/password, OAuth, and complete user management
- **Real-time Dashboard**: View all saved resumes with creation dates and live updates
- **ATS Optimization**: Ensure your resume passes Applicant Tracking Systems
- **Professional Templates**: Choose from dozens of professionally designed templates
- **Real-time Preview**: See your resume update as you type
- **PDF Export**: Download your resume in high-quality PDF format
- **Multiple Sections**: Personal info, experience, education, projects, skills, and more

### Premium Features
- **Advanced AI Suggestions**: Industry-specific content recommendations
- **Premium Templates**: Access to executive and specialized templates
- **Cover Letter Builder**: AI-powered cover letter generation
- **LinkedIn Integration**: Optimize your LinkedIn profile
- **Priority Support**: Get help when you need it

## 🏗️ Architecture

This project is built with a modern, scalable architecture using Clerk for authentication and PostgreSQL for database:

### Frontend (Next.js)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Authentication**: Clerk with custom pages and UserProfile integration
- **State Management**: React hooks and context
- **API Integration**: Custom API client with Clerk JWT tokens

### Backend (Express.js)
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL (hosted on Supabase)
- **ORM**: Prisma ORM
- **Authentication**: Clerk JWT verification with custom middleware
- **API Architecture**: RESTful APIs with protected routes
- **Payment Processing**: Stripe integration (ready for implementation)
- **AI Integration**: OpenAI API for content generation (ready for implementation)

## 🛠️ Tech Stack

### Frontend Dependencies
```json
{
  "next": "^14.2.0",
  "react": "^18.3.1",
  "typescript": "^5.5.3",
  "tailwindcss": "^3.4.11",
  "@radix-ui/react-*": "Various UI components",
  "@clerk/nextjs": "^5.0.0",
  "@clerk/express": "^1.0.0",
  "lucide-react": "^0.462.0",
  "framer-motion": "^12.6.2"
}
```

### Backend Dependencies
```json
{
  "express": "^4.18.2",
  "prisma": "^6.1.0",
  "@prisma/client": "^6.1.0",
  "@clerk/express": "^1.0.0",
  "jsonwebtoken": "^9.0.0",
  "dotenv": "^17.2.0",
  "cors": "^2.8.5",
  "zod": "^3.23.8",
  "tsx": "^4.7.0"
}
```

## 📁 Project Structure

```
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js App router pages
│   │   │   ├── page.tsx     # Homepage
│   │   │   ├── login/       # Authentication pages
│   │   │   │   └── [[...rest]]/
│   │   │   │       └── page.tsx # Clerk SignIn component
│   │   │   ├── sign-up/     # User registration
│   │   │   │   └── [[...rest]]/
│   │   │   │       └── page.tsx # Clerk SignUp component
│   │   │   ├── profile/     # User profile management
│   │   │   │   └── [[...rest]]/
│   │   │   │       └── page.tsx # Clerk UserProfile component
│   │   │   ├── dashboard/   # Protected dashboard
│   │   │   │   └── page.tsx # User dashboard with real-time updates
│   │   │   ├── builder/     # Resume builder page
│   │   │   │   └── page.tsx # Resume creation interface
│   │   │   ├── templates/   # Template gallery
│   │   │   ├── pricing/     # Pricing plans
│   │   │   ├── layout.tsx   # Root layout with ClerkProvider
│   │   │   └── globals.css  # Global styles
│   │   ├── components/      # Reusable React components
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   └── ...
│   │   ├── lib/             # Utility functions and services
│   │   │   ├── api.ts       # Backend API client with Clerk tokens
│   │   │   └── ai-service.ts # AI integration services
│   │   ├── middleware.ts    # Clerk middleware for route protection
│   │   └── ...
│   ├── public/              # Static assets
│   ├── .env.local           # Frontend environment variables
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── backend/                  # Express.js backend API
│   ├── src/
│   │   ├── auth/            # Authentication system
│   │   │   ├── supabaseClient.ts    # Supabase admin client
│   │   │   ├── auth.middleware.ts   # JWT verification middleware
│   │   │   └── auth.types.ts        # Authentication types
│   │   ├── routes/          # API route handlers
│   │   │   ├── protected.routes.ts  # Protected API endpoints
│   │   │   ├── users.ts     # User management
│   │   │   ├── resumes.ts   # Resume CRUD operations
│   │   │   ├── payments.ts  # Stripe payment handling
│   │   │   └── demo.ts      # Demo endpoints
│   │   ├── controllers/     # Business logic controllers
│   │   │   └── user.controller.ts   # User operations
│   │   ├── services/        # Business logic services
│   │   │   └── user.service.ts      # User service layer
│   │   ├── utils/           # Utility functions
│   │   │   └── response.util.ts     # API response helpers
│   │   ├── prisma/          # Database client
│   │   │   └── client.ts    # Prisma client setup
│   │   ├── types/           # TypeScript type definitions
│   │   │   └── api.ts       # API types
│   │   └── index.ts         # Express server setup
│   ├── prisma/              # Database schema and migrations
│   │   └── schema.prisma    # Database schema (Supabase compatible)
│   ├── scripts/             # Database seeding scripts
│   ├── dist/                # Compiled JavaScript output
│   ├── .env                 # Backend environment variables
│   ├── package.json
│   └── tsconfig.json
│
├── shared/                   # Shared utilities between frontend/backend
│   ├── api.js               # Shared API interfaces
│   └── api.ts               # TypeScript API interfaces
│
├── package.json              # Root workspace configuration
├── README.md                 # This documentation
└── .gitignore               # Git ignore rules
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier available)
- Stripe account (for payments - optional)
- OpenAI API key (for AI features - optional)

### 1. Clone the Repository
```bash
git clone https://github.com/AbhishekSharma9161/AI-Resume-Builder-App.git
cd AI-Resume-Builder-App
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install
```

### 3. Supabase Setup

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be created
3. Go to Settings → API to get your keys
4. Go to Authentication → Settings and enable Email/Password auth

#### Get Your Supabase Credentials
- **Project URL**: `https://your-project-id.supabase.co`
- **Anon Key**: Public key for frontend (starts with `eyJ...`)
- **Service Role Key**: Private key for backend (starts with `eyJ...`)
- **Database Password**: From your project creation or Settings → Database

### 4. Environment Setup

**Backend Environment Variables (`backend/.env`):**
```env
PORT=5000
NODE_ENV=development

# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Database (Supabase Postgres)
DATABASE_URL="postgresql://postgres:your_db_password@db.your-project-id.supabase.co:5432/postgres"

# Optional API keys
OPENAI_API_KEY=your_openai_api_key_here
```

**Frontend Environment Variables (`frontend/.env.local`):**
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

### 5. Database Setup
```bash
cd backend

# Generate Prisma client
npm run db:generate

# Push schema to Supabase database
npm run db:push

# Optional: Seed the database
npm run db:seed
```

### 6. Start Development Servers

**Start Backend Server:**
```bash
cd backend
npm run dev
# Backend runs on http://localhost:5000
```

**Start Frontend Server (in another terminal):**
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:3000
```

### 7. Test Authentication

1. Open http://localhost:3000
2. Click "Sign In" to go to login page
3. Create a new account or sign in
4. Check your email for confirmation link
5. After confirmation, sign in to access the dashboard

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development

# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Database (Supabase Postgres)
DATABASE_URL="postgresql://postgres:your_db_password@db.your-project-id.supabase.co:5432/postgres"

# Optional API Keys
OPENAI_API_KEY=your_openai_api_key_here
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

## 📊 Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:

- **User**: User account information
- **Resume**: Resume data and metadata
- **Subscription**: User subscription details
- **Payment**: Payment transaction history

Generate and apply database migrations:
```bash
cd backend
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Create and apply migrations
```

## 🔗 API Endpoints

### Public Endpoints
- `GET /health` - Health check
- `GET /api/ping` - Server status check
- `GET /api/demo` - Demo endpoint

### Authentication Flow
The application uses Supabase for authentication with custom backend verification:

1. **Frontend**: User signs up/in via Supabase
2. **Token**: Supabase issues JWT access token
3. **API Calls**: Frontend sends token in Authorization header
4. **Backend**: Verifies token using Supabase Admin SDK
5. **Database**: User auto-created in database on first authenticated request

### Protected Endpoints (Require Bearer Token)
- `GET /api/protected/profile` - Get current user profile
- `PUT /api/protected/profile` - Update user profile
- `GET /api/protected/resumes` - Get user's resumes

### Legacy Endpoints (Backward Compatibility)
- `POST /api/users` - Create new user
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/email/:email` - Get user by email
- `GET /api/users/:userId/resumes` - Get user's resumes
- `POST /api/resumes` - Create new resume
- `GET /api/resumes/:id` - Get resume by ID
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

## 🎨 UI Components

The frontend uses shadcn/ui components built on Radix UI primitives:

- **Forms**: Input, Textarea, Select, Checkbox, etc.
- **Layout**: Card, Tabs, Separator, etc.
- **Feedback**: Toast, Alert, Dialog, etc.
- **Navigation**: Button, Link, Breadcrumb, etc.

All components are customizable and follow design system principles.

## 🤖 AI Integration

### OpenAI Integration
- Content generation for resume sections
- Industry-specific suggestions
- ATS optimization recommendations
- Cover letter generation

### AI Service Features
- Smart content suggestions based on job role
- Grammar and style improvements
- Keyword optimization for ATS
- Professional tone enhancement

## 💳 Payment Processing

### Stripe Integration
- Subscription management
- Secure payment processing
- Webhook handling for real-time updates
- Multiple pricing tiers

### Pricing Plans
- **Free**: Basic features, 1 download/month
- **Professional**: $9.99/month, unlimited downloads, AI features
- **Executive**: $19.99/month, premium templates, consultation

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
npm start
```

### Backend (Railway/Heroku)
```bash
cd backend
npm run build
npm start
```

### Environment Setup
- Set up production environment variables
- Configure database connection
- Set up payment webhook endpoints
- Configure domain and SSL

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm run test        # Run tests
npm run test:watch  # Watch mode
npm run typecheck   # Type checking
```

### Backend Testing
```bash
cd backend
npm run test        # Run API tests
npm run typecheck   # Type checking
```

## 🔍 Performance Optimization

### Frontend
- Next.js App Router for optimal performance
- Static generation where possible
- Image optimization with Next.js Image
- Bundle optimization and code splitting

### Backend
- Database query optimization with Prisma
- Caching strategies for frequently accessed data
- API response compression
- Rate limiting for API protection

## 🛡️ Security

### Frontend Security
- Input validation and sanitization
- XSS protection
- CSRF protection with Next.js
- Secure cookie handling

### Backend Security
- JWT token authentication
- API rate limiting
- Input validation with Zod
- SQL injection prevention with Prisma
- CORS configuration

## 📈 Monitoring and Analytics

### Recommended Tools
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics, Mixpanel
- **Performance**: Vercel Analytics, Lighthouse
- **Uptime**: UptimeRobot

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- API documentation: `/docs` (when implemented)
- Component library: Storybook (when implemented)

### Getting Help
- Create an issue for bugs or feature requests
- Check existing issues before creating new ones
- Join our Discord community (link when available)

### Troubleshooting

#### Common Issues

**Database Connection Issues**
```bash
# Check if PostgreSQL is running
pg_isready -h localhost -p 5432

# Reset database
npm run db:push --force-reset
```

**Build Errors**
```bash
# Clear Next.js cache
rm -rf frontend/.next

# Clear node_modules
rm -rf node_modules package-lock.json
npm install
```

**TypeScript Errors**
```bash
# Type checking
npm run typecheck

# Regenerate Prisma client
npm run db:generate
```

## 🚧 Roadmap

### Short Term
- [ ] Enhanced AI suggestions
- [ ] More premium templates
- [ ] LinkedIn integration
- [ ] Mobile app development

### Long Term
- [ ] Team collaboration features
- [ ] Integration with job boards
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

---

**Made with ❤️ for job seekers worldwide**

For more information, visit our [website](https://resumeai.com) or contact us at support@resumeai.com.
