const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  // Public endpoints (no auth required)
  async ping() {
    return this.request('/api/ping')
  }

  async demo() {
    return this.request('/api/demo')
  }

  // Protected endpoints (require access token)
  async getProfile(accessToken: string) {
    return this.request('/api/protected/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  async updateProfile(accessToken: string, data: { name: string }) {
    return this.request('/api/protected/profile', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    })
  }

  async getResumes(accessToken: string) {
    return this.request('/api/protected/resumes', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  // Generic authenticated request method
  async authenticatedRequest<T>(
    endpoint: string,
    accessToken: string,
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...options.headers,
      },
    })
  }
}

export const apiClient = new ApiClient(API_BASE_URL)