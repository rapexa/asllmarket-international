import { api } from './api';

export interface SupplierCapability {
  id: string;
  supplierId: string;
  capabilityType: string;
  capabilityValue: string;
  icon?: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface SupplierCertificate {
  id: string;
  supplierId: string;
  certificateName: string;
  certificateNumber?: string;
  issuedBy?: string;
  issuedDate?: string;
  expiryDate?: string;
  documentUrl?: string;
  verified: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CapabilitiesResponse {
  items: SupplierCapability[];
}

export interface CertificatesResponse {
  items: SupplierCertificate[];
}

export const supplierCapabilityService = {
  getCapabilities: async (supplierId: string): Promise<CapabilitiesResponse> => {
    return api.get<CapabilitiesResponse>(`/suppliers/${supplierId}/capabilities`);
  },

  getCertificates: async (supplierId: string): Promise<CertificatesResponse> => {
    return api.get<CertificatesResponse>(`/suppliers/${supplierId}/certificates`);
  },
};
