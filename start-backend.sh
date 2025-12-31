#!/bin/bash

echo "🚀 Starting ResumeAI Backend Server..."
echo "======================================="

cd backend

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found in backend folder"
    echo "   Creating default .env file..."
    cat > .env << EOL
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/resumeai?schema=public"
PING_MESSAGE="Backend server is running!"
FRONTEND_URL=http://localhost:3000

# Add your API keys here
OPENAI_API_KEY=your_openai_api_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
EOL
    echo "✅ Created backend/.env - Please update with your actual values"
fi

echo "📡 Starting Express server on http://localhost:5000"
npm run dev
