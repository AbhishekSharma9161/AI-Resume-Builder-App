const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up ResumeAI Frontend...');

// Check if .env.local exists, if not create it from example
const envLocalPath = path.join(__dirname, '.env.local');
const envExamplePath = path.join(__dirname, '.env.local.example');

if (!fs.existsSync(envLocalPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envLocalPath);
    console.log('✅ Created .env.local from .env.local.example');
  } else {
    // Create default .env.local if example doesn't exist
    const defaultEnv = `NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
`;
    fs.writeFileSync(envLocalPath, defaultEnv);
    console.log('✅ Created default .env.local file');
  }
} else {
  console.log('✅ .env.local already exists');
}

console.log('🎉 Frontend setup complete!');
console.log('');
console.log('Next steps:');
console.log('1. Update .env.local with your API URLs if needed');
console.log('2. Run: npm run dev');
console.log('3. Open: http://localhost:3000');
