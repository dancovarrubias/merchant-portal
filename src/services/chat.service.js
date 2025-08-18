class ChatService {
  constructor() {
    this.baseUrl = '/api/chat';
  }

  async createThread() {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'create-thread' }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create thread');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating thread:', error);
      throw error;
    }
  }

  async sendMessage(threadId, message) {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'send-message',
          threadId,
          message,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send message');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  async getMessages(threadId) {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'get-messages',
          threadId,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get messages');
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting messages:', error);
      throw error;
    }
  }

  async deleteThread(threadId) {
    try {
      const response = await fetch(`${this.baseUrl}?threadId=${threadId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete thread');
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting thread:', error);
      throw error;
    }
  }

  getStoredThreadId() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('chatThreadId');
    }
    return null;
  }

  storeThreadId(threadId) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatThreadId', threadId);
    }
  }

  clearStoredThreadId() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('chatThreadId');
    }
  }
}

export default new ChatService();