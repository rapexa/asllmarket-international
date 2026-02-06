import { api } from './api';

export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  inquiryType: 'general' | 'sales' | 'support' | 'partnership' | 'careers' | 'other';
}

export interface ContactMessage extends ContactRequest {
  id: string;
  createdAt: string;
}

export interface BlogPostAuthor {
  name: string;
  avatar: string;
  role: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  tags: string; // JSON string from backend; can be parsed if needed
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  publishedAt?: string;
  createdAt?: string;
  readTime: number;
  views: number;
  likes: number;
  featured: boolean;
}

export interface BlogPostListResponse {
  items: BlogPost[];
}

export interface FAQItem {
  id: string;
  questionEn: string;
  questionFa: string;
  questionAr: string;
  answerEn: string;
  answerFa: string;
  answerAr: string;
  category: string;
  popular: boolean;
}

export interface FAQListResponse {
  items: FAQItem[];
}

export interface JobItem {
  id: string;
  title: string;
  department: string;
  location: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'remote';
  experience: string;
  salary?: string;
  postedAt?: string;
  description: string;
  requirements: string;
  benefits: string;
}

export interface JobListResponse {
  items: JobItem[];
}

export interface PressAttachment {
  type: 'pdf' | 'image' | 'video';
  name: string;
  url: string;
}

export interface PressReleaseItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'announcement' | 'partnership' | 'award' | 'milestone' | 'product' | string;
  publishedAt?: string;
  featured?: boolean;
  attachments?: PressAttachment[];
}

export interface PressReleaseListResponse {
  items: PressReleaseItem[];
}

export const cmsService = {
  async submitContact(data: ContactRequest): Promise<ContactMessage> {
    return api.post<ContactMessage>('/contact', data);
  },

  async listBlogPosts(): Promise<BlogPostListResponse> {
    return api.get<BlogPostListResponse>('/blog-posts');
  },

  async getBlogPost(id: string): Promise<BlogPost> {
    return api.get<BlogPost>(`/blog-posts/${id}`);
  },

  async listFAQs(): Promise<FAQListResponse> {
    return api.get<FAQListResponse>('/faqs');
  },

  async listJobs(): Promise<JobListResponse> {
    return api.get<JobListResponse>('/jobs');
  },

  async listPressReleases(): Promise<PressReleaseListResponse> {
    return api.get<PressReleaseListResponse>('/press-releases');
  },
};

