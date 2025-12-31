#!/bin/bash

echo "🚀 ResumeAI Setup Script"
echo "========================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install backend dependencies  
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Setup environment files
echo "🔧 Setting up environment files..."

# Frontend environment
if [ ! -f frontend/.env.local ]; then
    echo "Creating frontend/.env.local..."
    cat > frontend/.env.local << EOL
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOL
    echo "✅ Created frontend/.env.local"
else
    echo "⚠️  frontend/.env.local already exists"
fi

# Backend environment
if [ ! -f backend/.env ]; then
    echo "Creating backend/.env..."
    cat > backend/.env << EOL
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/resumeai?schema=public"
PING_MESSAGE="Backend server is running!"

# Add your API keys here
OPENAI_API_KEY=your_openai_api_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
FRONTEND_URL=http://localhost:3000
EOL
    echo "✅ Created backend/.env"
else
    echo "⚠️  backend/.env already exists"
fi

cd ..

echo ""
echo "🎉 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your database URL and API keys"
echo "2. Set up your PostgreSQL database"
echo "3. Run 'cd backend && npm run db:generate && npm run db:push'"
echo "4. Start development: 'npm run dev'"
echo ""
echo "Development URLs:"
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:5000"
echo ""
echo "Happy coding! 🚀"
