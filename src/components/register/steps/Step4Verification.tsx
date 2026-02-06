import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Mail, Phone, CheckCircle2, Clock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Step4VerificationProps {
  onNext: () => void;
  onBack: () => void;
  email: string;
  phone: string;
  isLoading?: boolean;
  error?: string | null;
}

const Step4Verification: React.FC<Step4VerificationProps> = ({ onNext, onBack, email, phone, isLoading = false, error = null }) => {
  const { t, language, dir } = useLanguage();
  const [emailCode, setEmailCode] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailResendTimer, setEmailResendTimer] = useState(60);
  const [phoneResendTimer, setPhoneResendTimer] = useState(60);
  const [emailSent, setEmailSent] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);

  // Mock sending verification codes
  useEffect(() => {
    // Simulate sending email verification
    setTimeout(() => {
      setEmailSent(true);
    }, 1000);
  }, []);

  // Countdown timers
  useEffect(() => {
    if (emailResendTimer > 0) {
      const timer = setTimeout(() => setEmailResendTimer(emailResendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [emailResendTimer]);

  useEffect(() => {
    if (phoneResendTimer > 0) {
      const timer = setTimeout(() => setPhoneResendTimer(phoneResendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [phoneResendTimer]);

  const handleEmailVerify = () => {
    // Mock verification - in real app, verify with backend
    if (emailCode.length === 6) {
      setEmailVerified(true);
    }
  };

  const handlePhoneVerify = () => {
    // Mock verification - in real app, verify with backend
    if (phoneCode.length === 6) {
      setPhoneVerified(true);
    }
  };

  const handleResendEmail = () => {
    setEmailResendTimer(60);
    setEmailSent(true);
    // In real app, resend email code
  };

  const handleResendPhone = () => {
    setPhoneResendTimer(60);
    setPhoneOtpSent(true);
    // In real app, resend phone OTP
  };

  const canProceed = emailVerified; // Email is mandatory, phone is optional

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
          Verify Your Account
        </h2>
        <p className="text-muted-foreground">
          We've sent verification codes to your email and phone
        </p>
      </div>

      {/* Email Verification */}
      <Card className="p-6 md:p-8 space-y-4 border-2">
        <div className="flex items-start gap-4">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
            emailVerified ? "bg-success/10" : "bg-primary/10"
          )}>
            {emailVerified ? (
              <CheckCircle2 className="h-6 w-6 text-success" />
            ) : (
              <Mail className="h-6 w-6 text-primary" />
            )}
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">
                Email Verification {emailVerified && <span className="text-success">✓ Verified</span>}
              </h3>
              <p className="text-sm text-muted-foreground">
                Enter the 6-digit code sent to <strong>{email}</strong>
              </p>
            </div>

            {!emailVerified ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="emailCode" className="text-sm font-semibold">
                    Verification Code
                  </Label>
                  <Input
                    id="emailCode"
                    type="text"
                    value={emailCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setEmailCode(value);
                    }}
                    placeholder="000000"
                    className="h-14 text-center text-2xl font-mono tracking-widest rounded-xl"
                    maxLength={6}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleResendEmail}
                    disabled={emailResendTimer > 0}
                    className="rounded-lg"
                  >
                    {emailResendTimer > 0 ? (
                      <>
                        <Clock className="h-4 w-4 me-2" />
                        Resend in {emailResendTimer}s
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4 me-2" />
                        Resend Code
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={handleEmailVerify}
                    disabled={emailCode.length !== 6}
                    className="btn-gradient-primary rounded-lg"
                  >
                    Verify Email
                  </Button>
                </div>
              </>
            ) : (
              <Alert className="bg-success/10 border-success/20">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <AlertDescription className="text-success">
                  Email verified successfully!
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </Card>

      {/* Phone Verification (Optional) */}
      <Card className="p-6 md:p-8 space-y-4 border-2 border-border/50">
        <div className="flex items-start gap-4">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
            phoneVerified ? "bg-success/10" : "bg-muted"
          )}>
            {phoneVerified ? (
              <CheckCircle2 className="h-6 w-6 text-success" />
            ) : (
              <Phone className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">
                Phone Verification (Optional) {phoneVerified && <span className="text-success">✓ Verified</span>}
              </h3>
              <p className="text-sm text-muted-foreground">
                Enter the 6-digit OTP sent to <strong>{phone}</strong>
              </p>
            </div>

            {!phoneVerified ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phoneCode" className="text-sm font-semibold">
                    OTP Code
                  </Label>
                  <Input
                    id="phoneCode"
                    type="text"
                    value={phoneCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setPhoneCode(value);
                    }}
                    placeholder="000000"
                    className="h-14 text-center text-2xl font-mono tracking-widest rounded-xl"
                    maxLength={6}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleResendPhone}
                    disabled={phoneResendTimer > 0}
                    className="rounded-lg"
                  >
                    {phoneResendTimer > 0 ? (
                      <>
                        <Clock className="h-4 w-4 me-2" />
                        Resend in {phoneResendTimer}s
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4 me-2" />
                        Resend OTP
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={handlePhoneVerify}
                    disabled={phoneCode.length !== 6}
                    className="btn-gradient-primary rounded-lg"
                  >
                    Verify Phone
                  </Button>
                </div>
              </>
            ) : (
              <Alert className="bg-success/10 border-success/20">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <AlertDescription className="text-success">
                  Phone verified successfully!
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Info */}
      <Alert>
        <AlertDescription className="text-sm text-muted-foreground">
          <strong>Note:</strong> Email verification is required. Phone verification is optional but recommended for enhanced security.
        </AlertDescription>
      </Alert>

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onBack}
          className="rounded-xl px-8"
        >
          <ArrowLeft className={cn("me-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
          Back
        </Button>
        <Button
          type="button"
          size="lg"
          onClick={onNext}
          disabled={!canProceed || isLoading}
          className="btn-gradient-primary rounded-xl px-12 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating Account...' : 'Continue'}
          <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
        </Button>
      </div>
    </div>
  );
};

export default Step4Verification;

