import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const visitorProfileSchema = z.object({
  occupation: z.string().min(1, 'Please select occupation'),
  interests: z.string().optional(),
});

type VisitorProfileForm = z.infer<typeof visitorProfileSchema>;

interface Step3VisitorProfileProps {
  onNext: (data: VisitorProfileForm) => void;
  onBack: () => void;
}

const Step3VisitorProfile: React.FC<Step3VisitorProfileProps> = ({ onNext, onBack }) => {
  const { t, language, dir } = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<VisitorProfileForm>({
    resolver: zodResolver(visitorProfileSchema),
    defaultValues: {
      occupation: '',
      interests: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: VisitorProfileForm) => {
    onNext(data);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
          Visitor Profile
        </h2>
        <p className="text-muted-foreground">
          Tell us about your interests and goals
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Occupation */}
        <div className="space-y-2">
          <Label htmlFor="occupation" className="text-sm font-semibold">
            Occupation / Role <span className="text-destructive">*</span>
          </Label>
          <select
            id="occupation"
            {...register('occupation')}
            className={cn(
              "h-12 rounded-xl w-full border border-input bg-background px-3 py-2 text-sm",
              errors.occupation && "border-destructive"
            )}
            defaultValue=""
          >
            <option value="" disabled>
              Select your occupation
            </option>
            <option value="agent">Sales Agent</option>
            <option value="consultant">Business Consultant</option>
            <option value="researcher">Market Researcher</option>
            <option value="student">Student</option>
            <option value="investor">Investor</option>
            <option value="other">Other</option>
          </select>
          {errors.occupation && (
            <p className="text-sm text-destructive">{errors.occupation.message}</p>
          )}
        </div>

        {/* Interests */}
        <div className="space-y-2">
          <Label htmlFor="interests" className="text-sm font-semibold">
            Interests <span className="text-muted-foreground text-xs">(Optional)</span>
          </Label>
          <Textarea
            id="interests"
            {...register('interests')}
            placeholder="What are you interested in? (e.g., Electronics, Fashion, Sourcing opportunities)"
            className="rounded-xl min-h-[100px]"
          />
        </div>

        {/* Info */}
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            You can explore products, connect with suppliers, and discover opportunities on ASL Market.
          </p>
        </div>

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
            type="submit"
            size="lg"
            disabled={!isValid}
            className="btn-gradient-primary rounded-xl px-12 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
            <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Step3VisitorProfile;
