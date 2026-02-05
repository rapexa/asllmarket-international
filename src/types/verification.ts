export type VerificationStatus = 
  | 'unverified'
  | 'pending'
  | 'verified'
  | 'rejected'
  | 'needs_update';

export type IDType = 'passport' | 'national_id';

export interface VerificationDocument {
  id: string;
  type: 'identity_front' | 'identity_back' | 'business_license' | 'certificate';
  file: File;
  preview?: string;
  uploadedAt?: Date;
}

export interface PersonalIdentity {
  fullName: string;
  nationality: string;
  idType: IDType;
  idNumber: string;
  identityFront?: VerificationDocument;
  identityBack?: VerificationDocument;
}

export interface BusinessInfo {
  legalName: string;
  registrationNumber: string;
  countryOfRegistration: string;
  companyAddress: string;
  businessType: string;
  businessLicense?: VerificationDocument;
  certificate?: VerificationDocument;
}

export interface ContactVerification {
  emailVerified: boolean;
  phoneVerified: boolean;
  emailVerifiedAt?: Date;
  phoneVerifiedAt?: Date;
}

export interface SupplierVerification {
  id: string;
  supplierId: string;
  status: VerificationStatus;
  personalIdentity?: PersonalIdentity;
  businessInfo?: BusinessInfo;
  contactVerification?: ContactVerification;
  submittedAt?: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  rejectionReason?: string;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const verificationStatusConfig: Record<VerificationStatus, {
  label: string;
  labelFa: string;
  labelAr: string;
  color: string;
  bgColor: string;
  borderColor: string;
}> = {
  unverified: {
    label: 'Unverified',
    labelFa: 'تأیید نشده',
    labelAr: 'غير مؤكد',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    borderColor: 'border-gray-300',
  },
  pending: {
    label: 'Pending Review',
    labelFa: 'در انتظار بررسی',
    labelAr: 'قيد المراجعة',
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
    borderColor: 'border-amber-300',
  },
  verified: {
    label: 'Verified',
    labelFa: 'تأیید شده',
    labelAr: 'مؤكد',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-300',
  },
  rejected: {
    label: 'Rejected',
    labelFa: 'رد شده',
    labelAr: 'مرفوض',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-300',
  },
  needs_update: {
    label: 'Needs Update',
    labelFa: 'نیاز به بروزرسانی',
    labelAr: 'يحتاج إلى تحديث',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    borderColor: 'border-orange-300',
  },
};

