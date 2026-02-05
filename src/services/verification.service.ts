import { api } from './api';

export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected' | 'needs_update';
export type IDType = 'passport' | 'national_id';

export interface Verification {
  id: string;
  supplierId: string;
  status: VerificationStatus;
  // Personal Identity
  fullName: string;
  nationality: string;
  idType: IDType;
  idNumber: string;
  identityFrontUrl: string;
  identityBackUrl?: string;
  // Business Info
  legalName: string;
  registrationNumber: string;
  countryOfRegistration: string;
  companyAddress: string;
  businessType: string;
  businessLicenseUrl: string;
  certificateUrl?: string;
  // Contact Verification
  emailVerified: boolean;
  phoneVerified: boolean;
  emailVerifiedAt?: string;
  phoneVerifiedAt?: string;
  // Admin Review
  submittedAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitVerificationRequest {
  // Personal Identity
  fullName: string;
  nationality: string;
  idType: IDType;
  idNumber: string;
  identityFrontUrl: string;
  identityBackUrl?: string;
  // Business Info
  legalName: string;
  registrationNumber: string;
  countryOfRegistration: string;
  companyAddress: string;
  businessType: string;
  businessLicenseUrl: string;
  certificateUrl?: string;
}

export interface ReviewVerificationRequest {
  status: 'verified' | 'rejected' | 'needs_update';
  rejectionReason?: string;
  adminNotes?: string;
}

export interface VerificationListResponse {
  items: Verification[];
}

export const verificationService = {
  // Get my verification status (supplier)
  async getMyVerification(): Promise<Verification> {
    return api.get<Verification>('/verifications/me');
  },

  // Submit verification (supplier)
  async submit(data: SubmitVerificationRequest): Promise<Verification> {
    return api.post<Verification>('/verifications', data);
  },

  // Admin endpoints
  admin: {
    // List all verifications
    async list(params?: {
      limit?: number;
      offset?: number;
    }): Promise<VerificationListResponse> {
      return api.get<VerificationListResponse>('/admin/verifications', params);
    },

    // Get verification by ID
    async getById(id: string): Promise<Verification> {
      return api.get<Verification>(`/admin/verifications/${id}`);
    },

    // Review verification
    async review(id: string, data: ReviewVerificationRequest): Promise<Verification> {
      return api.patch<Verification>(`/admin/verifications/${id}/review`, data);
    },
  },
};
