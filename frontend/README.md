# ResumeAI Frontend

This is the Next.js frontend application for ResumeAI.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run setup (creates .env.local if needed):**
   ```bash
   npm run setup
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   ```
   http://localhost:3000
   ```

## Environment Variables

The app uses these environment variables in `.env.local`:

```env
# Backend API URL (where your Express server runs)
NEXT_PUBLIC_API_URL=http://localhost:5000

# Frontend app URL (where Next.js runs)  
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

If you don't have a `.env.local` file, run `npm run setup` to create one with default values.

## Available Scripts

- `npm run setup` - Setup environment configuration
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Frontend-Only Development

The frontend works standalone without the backend. API calls will fail gracefully, but the UI and navigation will work perfectly for design and frontend development.

## Full-Stack Development

To use the complete application with backend API:

1. Start the backend server (in a separate terminal):
   ```bash
   cd ../backend
   npm install
   npm run dev
   ```

2. The frontend will automatically proxy API requests to `http://localhost:5000`

## Project Structure

```
frontend/
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # React components
│   ├── lib/          # Utilities and services
│   └── hooks/        # Custom React hooks
├── public/           # Static assets
└── package.json
```

## Troubleshooting

**Error: Invalid rewrite found**
- Run `npm run setup` to ensure `.env.local` exists
- Check that `NEXT_PUBLIC_API_URL` is set in `.env.local`

**Port already in use**
- Change the port: `npm run dev -- -p 3001`
- Or kill the process using port 3000

**Dependencies issues**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
