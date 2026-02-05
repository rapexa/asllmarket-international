import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  Building2,
  Mail,
  Phone,
  MapPin,
  Download,
  Eye,
  AlertCircle,
  User,
  Calendar,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/components/admin/AdminLayout';
import { VerificationStatus, verificationStatusConfig } from '@/types/verification';
import { cn } from '@/lib/utils';
import { getCountryName } from '@/data/countryCodes';
import { countryCodes } from '@/data/countryCodes';

interface VerificationDetailData {
  id: string;
  supplierId: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  status: VerificationStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  personalIdentity: {
    fullName: string;
    nationality: string;
    idType: 'passport' | 'national_id';
    idNumber: string;
    identityFront?: { url: string; name: string };
    identityBack?: { url: string; name: string };
  };
  businessInfo: {
    legalName: string;
    registrationNumber: string;
    countryOfRegistration: string;
    companyAddress: string;
    businessType: string;
    businessLicense?: { url: string; name: string };
    certificate?: { url: string; name: string };
  };
  contactVerification: {
    emailVerified: boolean;
    phoneVerified: boolean;
    emailVerifiedAt?: string;
    phoneVerifiedAt?: string;
  };
}

const VerificationDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject' | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  // Mock data - In real app, fetch from API
  const mockVerification: VerificationDetailData = {
    id: id || '1',
    supplierId: 'SUP-001',
    companyName: 'Tech Supplier Co.',
    contactName: 'John Smith',
    email: 'john@techsupplier.com',
    phone: '+86 138 0013 8000',
    country: 'CN',
    city: 'Shanghai',
    status: 'pending',
    submittedAt: '2024-02-20T10:30:00Z',
    personalIdentity: {
      fullName: 'John Smith',
      nationality: 'CN',
      idType: 'passport',
      idNumber: 'G12345678',
      identityFront: {
        url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800',
        name: 'passport_front.jpg',
      },
    },
    businessInfo: {
      legalName: 'Tech Supplier Co. Ltd.',
      registrationNumber: 'REG-123456789',
      countryOfRegistration: 'CN',
      companyAddress: '123 Business Street, Shanghai, China 200000',
      businessType: 'manufacturer',
      businessLicense: {
        url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
        name: 'business_license.pdf',
      },
    },
    contactVerification: {
      emailVerified: true,
      phoneVerified: true,
      emailVerifiedAt: '2024-02-20T11:00:00Z',
      phoneVerifiedAt: '2024-02-20T11:05:00Z',
    },
  };

  const [verification, setVerification] = useState<VerificationDetailData>(mockVerification);

  const statusConfig = verificationStatusConfig[verification.status];

  const getCountryNameFromCode = (code: string) => {
    const country = countryCodes.find(c => c.code === code);
    return country ? getCountryName(country, 'en') : code;
  };

  const handleReview = (action: 'approve' | 'reject') => {
    setReviewAction(action);
    setReviewDialogOpen(true);
  };

  const confirmReview = () => {
    if (reviewAction) {
      setVerification({
        ...verification,
        status: reviewAction === 'approve' ? 'verified' : 'rejected',
        reviewedAt: new Date().toISOString(),
        reviewedBy: 'Admin User',
        rejectionReason: reviewAction === 'reject' ? rejectionReason : undefined,
      });
      setReviewDialogOpen(false);
      setReviewAction(null);
      setRejectionReason('');
      setAdminNotes('');
    }
  };

  const DocumentViewer = ({ document, title }: { document?: { url: string; name: string }; title: string }) => {
    if (!document) return null;

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="relative w-full h-64 border rounded-lg overflow-hidden bg-muted">
              <img
                src={document.url}
                alt={title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>{document.name}</span>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href={document.url} download target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 me-2" />
                  Download
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/admin/verifications')}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold">Verification Details</h1>
            <p className="text-muted-foreground mt-1">Review supplier verification documents</p>
          </div>
          {verification.status === 'pending' && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => handleReview('reject')}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                <XCircle className="h-4 w-4 me-2" />
                Reject
              </Button>
              <Button onClick={() => handleReview('approve')} className="bg-green-600 hover:bg-green-700">
                <CheckCircle2 className="h-4 w-4 me-2" />
                Approve
              </Button>
            </div>
          )}
        </div>

        {/* Status Banner */}
        <Card className={cn('border-2', statusConfig.borderColor, statusConfig.bgColor)}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {verification.status === 'verified' && <CheckCircle2 className="h-6 w-6 text-green-600" />}
                {verification.status === 'pending' && <Clock className="h-6 w-6 text-amber-600" />}
                {verification.status === 'rejected' && <XCircle className="h-6 w-6 text-red-600" />}
                {verification.status === 'needs_update' && <AlertCircle className="h-6 w-6 text-orange-600" />}
                <div>
                  <div className="font-semibold text-lg">Status: {statusConfig.label}</div>
                  <div className="text-sm text-muted-foreground">
                    Submitted: {new Date(verification.submittedAt).toLocaleString()}
                  </div>
                </div>
              </div>
              <Badge variant="outline" className={cn('text-base px-4 py-2', statusConfig.className)}>
                {statusConfig.label}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Supplier company details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Company Name</Label>
                    <div className="font-medium mt-1">{verification.companyName}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Supplier ID</Label>
                    <div className="font-medium mt-1">{verification.supplierId}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Contact Name</Label>
                    <div className="font-medium mt-1 flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {verification.contactName}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Email</Label>
                    <div className="font-medium mt-1 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {verification.email}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Phone</Label>
                    <div className="font-medium mt-1 flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {verification.phone}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Location</Label>
                    <div className="font-medium mt-1 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {verification.city}, {getCountryNameFromCode(verification.country)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Identity */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Identity</CardTitle>
                <CardDescription>Identity verification documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Full Name</Label>
                    <div className="font-medium mt-1">{verification.personalIdentity.fullName}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Nationality</Label>
                    <div className="font-medium mt-1">
                      {getCountryNameFromCode(verification.personalIdentity.nationality)}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">ID Type</Label>
                    <div className="font-medium mt-1 capitalize">
                      {verification.personalIdentity.idType === 'passport' ? 'Passport' : 'National ID'}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">ID Number</Label>
                    <div className="font-medium mt-1">{verification.personalIdentity.idNumber}</div>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <DocumentViewer
                    document={verification.personalIdentity.identityFront}
                    title="ID Front Side"
                  />
                  {verification.personalIdentity.idType === 'national_id' && (
                    <DocumentViewer
                      document={verification.personalIdentity.identityBack}
                      title="ID Back Side"
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Business Information */}
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Business registration and license details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Legal Company Name</Label>
                    <div className="font-medium mt-1">{verification.businessInfo.legalName}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Registration Number</Label>
                    <div className="font-medium mt-1">{verification.businessInfo.registrationNumber}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Country of Registration</Label>
                    <div className="font-medium mt-1">
                      {getCountryNameFromCode(verification.businessInfo.countryOfRegistration)}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Business Type</Label>
                    <div className="font-medium mt-1 capitalize">{verification.businessInfo.businessType}</div>
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-sm text-muted-foreground">Company Address</Label>
                    <div className="font-medium mt-1">{verification.businessInfo.companyAddress}</div>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <DocumentViewer
                    document={verification.businessInfo.businessLicense}
                    title="Business License"
                  />
                  {verification.businessInfo.certificate && (
                    <DocumentViewer
                      document={verification.businessInfo.certificate}
                      title="Additional Certificate"
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contact Verification */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Verification</CardTitle>
                <CardDescription>Email and phone verification status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Email Verification</div>
                        <div className="text-sm text-muted-foreground">
                          {verification.contactVerification.emailVerifiedAt
                            ? `Verified on ${new Date(verification.contactVerification.emailVerifiedAt).toLocaleDateString()}`
                            : 'Not verified'}
                        </div>
                      </div>
                    </div>
                    {verification.contactVerification.emailVerified ? (
                      <Badge className="bg-green-100 text-green-700 border-green-300">
                        <CheckCircle2 className="h-3 w-3 me-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline">Not Verified</Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Phone Verification</div>
                        <div className="text-sm text-muted-foreground">
                          {verification.contactVerification.phoneVerifiedAt
                            ? `Verified on ${new Date(verification.contactVerification.phoneVerifiedAt).toLocaleDateString()}`
                            : 'Not verified'}
                        </div>
                      </div>
                    </div>
                    {verification.contactVerification.phoneVerified ? (
                      <Badge className="bg-green-100 text-green-700 border-green-300">
                        <CheckCircle2 className="h-3 w-3 me-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline">Not Verified</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Review History */}
            {verification.reviewedAt && (
              <Card>
                <CardHeader>
                  <CardTitle>Review History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Reviewed on {new Date(verification.reviewedAt).toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">By {verification.reviewedBy}</div>
                    </div>
                  </div>
                  {verification.rejectionReason && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                      <div className="font-medium text-red-900 mb-1">Rejection Reason:</div>
                      <div className="text-sm text-red-700">{verification.rejectionReason}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {verification.status === 'pending' && (
                  <>
                    <Button
                      onClick={() => handleReview('approve')}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle2 className="h-4 w-4 me-2" />
                      Approve Verification
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleReview('reject')}
                      className="w-full"
                    >
                      <XCircle className="h-4 w-4 me-2" />
                      Reject Verification
                    </Button>
                  </>
                )}
                <Button variant="outline" className="w-full" onClick={() => navigate('/admin/verifications')}>
                  <ArrowLeft className="h-4 w-4 me-2" />
                  Back to List
                </Button>
              </CardContent>
            </Card>

            {/* Admin Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Admin Notes</CardTitle>
                <CardDescription>Add internal notes about this verification</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add notes..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={6}
                />
                <Button variant="outline" className="w-full mt-3" size="sm">
                  Save Notes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Review Dialog */}
        <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {reviewAction === 'approve' ? 'Approve Verification' : 'Reject Verification'}
              </DialogTitle>
              <DialogDescription>
                {reviewAction === 'approve'
                  ? `Are you sure you want to approve verification for "${verification.companyName}"?`
                  : `Are you sure you want to reject verification for "${verification.companyName}"? Please provide a reason.`}
              </DialogDescription>
            </DialogHeader>
            {reviewAction === 'reject' && (
              <div className="space-y-2">
                <Label>Rejection Reason</Label>
                <Textarea
                  placeholder="Enter reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={4}
                />
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={confirmReview}
                variant={reviewAction === 'approve' ? 'default' : 'destructive'}
                disabled={reviewAction === 'reject' && !rejectionReason.trim()}
                className={reviewAction === 'approve' ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {reviewAction === 'approve' ? 'Approve' : 'Reject'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default VerificationDetail;
