import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  MoreVertical,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Download,
  Filter,
  FileText,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/components/admin/AdminLayout';
import { adminService, AdminVerification } from '@/services';

const Verifications: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedVerification, setSelectedVerification] = useState<AdminVerification | null>(null);
  const [reviewAction, setReviewAction] = useState<'approved' | 'rejected' | null>(null);
  const [reviewMessage, setReviewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [verifications, setVerifications] = useState<AdminVerification[]>([]);

  // Load verifications from backend
  useEffect(() => {
    const loadVerifications = async () => {
      try {
        setLoading(true);
        const response = await adminService.listVerifications({
          limit: 100,
          offset: 0,
          status: selectedStatus !== 'all' ? selectedStatus : undefined,
        });
        setVerifications(response.items || []);
      } catch (error) {
        console.error('Failed to load verifications:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVerifications();
  }, [selectedStatus]);

  const handleReview = (verification: AdminVerification, action: 'approved' | 'rejected') => {
    setSelectedVerification(verification);
    setReviewAction(action);
    setReviewMessage('');
    setReviewDialogOpen(true);
  };

  const confirmReview = async () => {
    if (selectedVerification && reviewAction) {
      try {
        await adminService.reviewVerification(selectedVerification.id, {
          status: reviewAction,
          message: reviewMessage,
        });
        // Reload verifications
        const response = await adminService.listVerifications({
          limit: 100,
          offset: 0,
          status: selectedStatus !== 'all' ? selectedStatus : undefined,
        });
        setVerifications(response.items || []);
        setReviewDialogOpen(false);
        setSelectedVerification(null);
        setReviewAction(null);
        setReviewMessage('');
      } catch (error) {
        console.error('Failed to review verification:', error);
      }
    }
  };

  const filteredVerifications = verifications.filter((verification) => {
    const matchesSearch =
      verification.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      verification.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      verification.userId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const sortedVerifications = [...filteredVerifications].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
    if (sortBy === 'oldest') return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
    if (sortBy === 'company') return a.userName.localeCompare(b.userName);
    return 0;
  });

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; className: string }> = {
      pending: { label: 'Pending Review', className: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
      approved: { label: 'Approved', className: 'bg-green-100 text-green-700 border-green-300' },
      rejected: { label: 'Rejected', className: 'bg-red-100 text-red-700 border-red-300' },
    };
    const { label, className } = config[status] || config.pending;
    return <Badge variant="outline" className={className}>{label}</Badge>;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Verification Management</h1>
            <p className="text-muted-foreground mt-1">Review and manage supplier verifications</p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 me-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Pending</CardDescription>
              <CardTitle className="text-2xl">
                {verifications.filter(v => v.status === 'pending').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Approved</CardDescription>
              <CardTitle className="text-2xl text-green-600">
                {verifications.filter(v => v.status === 'approved').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Rejected</CardDescription>
              <CardTitle className="text-2xl text-red-600">
                {verifications.filter(v => v.status === 'rejected').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total</CardDescription>
              <CardTitle className="text-2xl">
                {verifications.length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute start-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search verifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ps-9"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="company">Company: A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Verifications Table */}
        <Card>
          <CardHeader>
            <CardTitle>Verifications ({sortedVerifications.length})</CardTitle>
            <CardDescription>All verification requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Reviewed</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedVerifications.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No verifications found
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedVerifications.map((verification) => (
                      <TableRow key={verification.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{verification.userName}</div>
                            <div className="text-sm text-muted-foreground">
                              ID: {verification.userId.substring(0, 8)}...
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{verification.userRole}</div>
                            <div className="text-sm text-muted-foreground">{verification.userEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>{verification.documentType}</TableCell>
                        <TableCell>{getStatusBadge(verification.status)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(verification.submittedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {verification.reviewedAt ? (
                            <div>
                              <div>{new Date(verification.reviewedAt).toLocaleDateString()}</div>
                              {verification.reviewedBy && <div className="text-xs">{verification.reviewedBy}</div>}
                            </div>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => navigate(`/admin/verifications/${verification.id}`)}>
                                <Eye className="h-4 w-4 me-2" />
                                View Details
                              </DropdownMenuItem>
                              {verification.status === 'pending' && (
                                <>
                                  <DropdownMenuItem onClick={() => handleReview(verification, 'approved')}>
                                    <CheckCircle2 className="h-4 w-4 me-2 text-green-600" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleReview(verification, 'rejected')}>
                                    <XCircle className="h-4 w-4 me-2 text-red-600" />
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Review Dialog */}
        <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {reviewAction === 'approved' ? 'Approve Verification' : 'Reject Verification'}
              </DialogTitle>
              <DialogDescription>
                {reviewAction === 'approved'
                  ? `Are you sure you want to approve verification for "${selectedVerification?.userName}"?`
                  : `Are you sure you want to reject verification for "${selectedVerification?.userName}"? Please provide a reason.`}
              </DialogDescription>
            </DialogHeader>
            {reviewAction === 'rejected' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Rejection Reason</label>
                <Textarea
                  placeholder="Enter reason for rejection..."
                  value={reviewMessage}
                  onChange={(e) => setReviewMessage(e.target.value)}
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
                variant={reviewAction === 'approved' ? 'default' : 'destructive'}
                disabled={reviewAction === 'rejected' && !reviewMessage.trim()}
              >
                {reviewAction === 'approved' ? 'Approve' : 'Reject'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default Verifications;
