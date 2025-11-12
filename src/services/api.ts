const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000';

export interface Persona {
  id: number;
  persona_id: string;
  name: string;
  role: string;
  description: string;
  tags: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface CreatePersonaRequest {
  persona_id: string;
  name: string;
  role: string;
  description: string;
  tags?: string[];
  is_active?: boolean;
}

export interface UpdatePersonaRequest {
  name?: string;
  role?: string;
  description?: string;
  tags?: string[];
  is_active?: boolean;
}

class PersonaAPI {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  async getAllPersonas(): Promise<Persona[]> {
    return this.request<Persona[]>("/personas/");
  }

  async getPersona(personaId: string): Promise<Persona> {
    return this.request<Persona>(`/personas/${personaId}`);
  }

  async createPersona(persona: CreatePersonaRequest): Promise<Persona> {
    return this.request<Persona>("/personas/", {
      method: "POST",
      body: JSON.stringify(persona),
    });
  }

  async updatePersona(
    personaId: string,
    persona: UpdatePersonaRequest
  ): Promise<Persona> {
    return this.request<Persona>(`/personas/${personaId}`, {
      method: "PUT",
      body: JSON.stringify(persona),
    });
  }

  async deletePersona(personaId: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/personas/${personaId}`, {
      method: "DELETE",
    });
  }

  async deactivatePersona(personaId: string): Promise<Persona> {
    return this.request<Persona>(`/personas/${personaId}/deactivate`, {
      method: "PATCH",
    });
  }
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export interface ChatRequest {
  persona_id: string;
  message: string;
  conversation_history?: ChatMessage[];
  max_tokens?: number;
  temperature?: number;
}

export interface ChatResponse {
  success: boolean;
  message?: string;
  error?: string;
  persona_id: string;
  persona_name: string;
  usage?: any;
  response_time?: number;
  timestamp: string;
}

class ChatAPI {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Chat API request failed:", error);
      throw error;
    }
  }

  async chatWithPersona(chatRequest: ChatRequest): Promise<ChatResponse> {
    return this.request<ChatResponse>("/chat/", {
      method: "POST",
      body: JSON.stringify(chatRequest),
    });
  }

  async testChatWithPersona(
    chatRequest: Omit<
      ChatRequest,
      "conversation_history" | "max_tokens" | "temperature"
    >
  ): Promise<ChatResponse> {
    return this.request<ChatResponse>("/chat/test", {
      method: "POST",
      body: JSON.stringify(chatRequest),
    });
  }
}

export const personaAPI = new PersonaAPI();
export const chatAPI = new ChatAPI();
