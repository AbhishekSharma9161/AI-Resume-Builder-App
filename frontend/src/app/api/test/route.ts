import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test backend connection
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const response = await fetch(`${backendUrl}/api/ping`);
    
    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({ 
        status: 'success',
        message: 'Backend connection working',
        backend: data 
      });
    } else {
      return NextResponse.json({ 
        status: 'error',
        message: 'Backend not responding',
        statusCode: response.status 
      });
    }
  } catch (error) {
    return NextResponse.json({ 
      status: 'error',
      message: 'Failed to connect to backend',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
