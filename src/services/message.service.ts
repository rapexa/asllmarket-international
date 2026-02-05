import { api } from './api';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  subject?: string;
  body: string;
  attachments?: string;
  read: boolean;
  readAt?: string;
  createdAt: string;
}

export interface ConversationPreview {
  conversationId: string;
  otherUserId: string;
  otherUserName: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface CreateMessageRequest {
  receiverId: string;
  subject?: string;
  body: string;
  attachments?: string;
}

export interface MessageListResponse {
  items: Message[];
}

export interface ConversationListResponse {
  items: ConversationPreview[];
}

export const messageService = {
  // List conversations
  async listConversations(): Promise<ConversationListResponse> {
    return api.get<ConversationListResponse>('/messages/conversations');
  },

  // List messages in a conversation
  async listMessages(
    conversationId: string,
    params?: {
      limit?: number;
      offset?: number;
    }
  ): Promise<MessageListResponse> {
    return api.get<MessageListResponse>(`/messages/conversations/${conversationId}`, params);
  },

  // Get message by ID
  async getById(id: string): Promise<Message> {
    return api.get<Message>(`/messages/${id}`);
  },

  // Send message
  async create(data: CreateMessageRequest): Promise<Message> {
    return api.post<Message>('/messages', data);
  },

  // Mark message as read
  async markAsRead(id: string): Promise<void> {
    return api.patch<void>(`/messages/${id}/read`);
  },

  // Delete message
  async delete(id: string): Promise<void> {
    return api.delete<void>(`/messages/${id}`);
  },
};
