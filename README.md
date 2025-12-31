# ResumeAI - AI-Powered Resume Builder

A modern, full-stack resume builder application powered by AI that helps users create professional, ATS-optimized resumes in minutes.

<img width="1882" height="892" alt="Image" src="https://github.com/user-attachments/assets/ea7431df-595b-4b1f-9746-63797a1d224a" />

## 🚀 Features

### Core Features
- **AI-Powered Content Generation**: Get intelligent suggestions for job descriptions, skills, and achievements
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

This project is built with a modern, scalable architecture:

### Frontend (Next.js)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: React hooks and context
- **API Integration**: Next.js API routes and fetch

### Backend (Express.js)
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based authentication
- **Payment Processing**: Stripe integration
- **AI Integration**: OpenAI API for content generation
- **File Storage**: Local file system (can be extended to cloud storage)

## 🛠️ Tech Stack

### Frontend Dependencies
```json
{
  "next": "^14.2.0",
  "react": "^18.3.1",
  "typescript": "^5.5.3",
  "tailwindcss": "^3.4.11",
  "@radix-ui/react-*": "Various UI components",
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
  "dotenv": "^17.2.0",
  "cors": "^2.8.5",
  "zod": "^3.23.8"
}
```

## 📁 Project Structure

```
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js App router pages
│   │   │   ├── page.tsx     # Homepage
│   │   │   ├── builder/     # Resume builder page
│   │   │   ├── templates/   # Template gallery
│   │   │   ├── pricing/     # Pricing plans
│   │   │   └── ...          # Other pages
│   │   ├── components/      # Reusable React components
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   ├── Checkout.tsx # Payment components
│   │   │   └── ...
│   │   ├── lib/             # Utility functions and services
│   │   └── hooks/           # Custom React hooks
│   ├── public/              # Static assets
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── backend/                  # Express.js backend API
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   │   ├── users.ts     # User management
│   │   │   ├── resumes.ts   # Resume CRUD operations
│   │   │   ├── payments.ts  # Stripe payment handling
│   │   │   └── demo.ts      # Demo endpoints
│   │   ├── lib/             # Shared utilities
│   │   └── index.ts         # Express server setup
│   ├── prisma/              # Database schema and migrations
│   ├── scripts/             # Database seeding scripts
│   ├── package.json
│   └── tsconfig.json
│
├── package.json              # Root workspace configuration
├── README.md                 # This documentation
└── .gitignore               # Git ignore rules
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Stripe account (for payments)
- OpenAI API key (for AI features)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd resumeai
```

### 2. Install Dependencies (All Projects)
```bash
# Install all dependencies at once
npm run install:all

# Or install individually:
npm install              # Root dependencies
npm install --prefix frontend
npm install --prefix backend
```

### 3. Environment Setup

**Backend Environment Variables (.env in backend folder):**
```bash
cd backend
cp .env.example .env
# Edit .env with your database URL, API keys, etc.
```

**Frontend Environment Variables (.env.local in frontend folder):**
```bash
cd frontend
cp .env.local.example .env.local
# Edit .env.local with your API URLs
```

### 4. Database Setup
```bash
cd backend

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed the database (optional)
npm run db:seed
```

### 5. Start Development Servers

**Frontend Development (Primary)**
```bash
# The dev server runs the Next.js frontend automatically
# Access your app at: http://localhost:3000
```

**Start Backend API Server (Optional)**
```bash
# In a separate terminal, start the backend API
./start-backend.sh
# Or manually:
cd backend && npm run dev    # Runs on http://localhost:5000
```

**Development Workflow:**
- Frontend (Next.js) runs on `http://localhost:3000` (main dev server)
- Backend (Express.js) runs on `http://localhost:5000` (API server)
- For full functionality, run both servers simultaneously

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/resumeai"
PING_MESSAGE="Backend server is running!"

# API Keys
OPENAI_API_KEY=your_openai_api_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
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

### Authentication
- `POST /api/users` - Create new user
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/email/:email` - Get user by email

### Resumes
- `GET /api/users/:userId/resumes` - Get user's resumes
- `POST /api/resumes` - Create new resume
- `GET /api/resumes/:id` - Get resume by ID
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

### Payments
- `POST /api/payments/create-checkout-session` - Create Stripe checkout
- `POST /api/payments/webhook` - Handle Stripe webhooks
- `GET /api/users/:userId/subscription` - Get user subscription
- `POST /api/subscriptions/:id/cancel` - Cancel subscription
- `POST /api/subscriptions/:id/resume` - Resume subscription

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
