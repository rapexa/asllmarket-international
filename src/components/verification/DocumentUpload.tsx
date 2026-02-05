import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Image as ImageIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface DocumentUploadProps {
  label: string;
  description?: string;
  value?: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  maxSizeMB?: number;
  error?: string;
  required?: boolean;
  side?: 'front' | 'back';
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  label,
  description,
  value,
  onChange,
  accept = 'image/jpeg,image/png,image/jpg,application/pdf',
  maxSizeMB = 5,
  error,
  required = false,
  side,
}) => {
  const { language, dir } = useLanguage();
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    // Validate file type
    const allowedTypes = accept.split(',').map(type => type.trim());
    const fileType = file.type || `application/${file.name.split('.').pop()?.toLowerCase()}`;
    
    if (!allowedTypes.some(type => fileType.includes(type.split('/')[1]))) {
      return;
    }

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      return;
    }

    onChange(file);

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleRemove = () => {
    onChange(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isImage = value?.type.startsWith('image/') || preview;
  const isPDF = value?.type === 'application/pdf' || value?.name.endsWith('.pdf');

  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold">
        {label}
        {required && <span className="text-destructive ms-1">*</span>}
      </Label>
      
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      {!value ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors",
            dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
            error && "border-destructive"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className={cn(
            "h-12 w-12 mx-auto mb-4 text-muted-foreground",
            dragActive && "text-primary"
          )} />
          <p className="text-sm font-medium mb-1">
            {language === 'fa' 
              ? 'کشیدن و رها کردن یا کلیک برای آپلود'
              : language === 'ar'
              ? 'اسحب وأفلت أو انقر للتحميل'
              : 'Drag and drop or click to upload'
            }
          </p>
          <p className="text-xs text-muted-foreground">
            {language === 'fa'
              ? `فرمت‌های مجاز: JPG, PNG, PDF (حداکثر ${maxSizeMB}MB)`
              : language === 'ar'
              ? `الصيغ المدعومة: JPG, PNG, PDF (الحد الأقصى ${maxSizeMB}MB)`
              : `Supported formats: JPG, PNG, PDF (Max ${maxSizeMB}MB)`
            }
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileSelect(e.target.files[0]);
              }
            }}
            className="hidden"
          />
        </div>
      ) : (
        <div className="border border-border rounded-xl p-4 bg-muted/30">
          <div className="flex items-start gap-4">
            {/* Preview or Icon */}
            <div className="shrink-0">
              {isImage && preview ? (
                <img
                  src={preview}
                  alt={label}
                  className="w-20 h-20 object-cover rounded-lg border border-border"
                />
              ) : isPDF ? (
                <div className="w-20 h-20 rounded-lg bg-red-100 flex items-center justify-center">
                  <FileText className="h-10 w-10 text-red-600" />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center">
                  <ImageIcon className="h-10 w-10 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                <p className="text-sm font-medium truncate">{value.name}</p>
              </div>
              <p className="text-xs text-muted-foreground">
                {(value.size / (1024 * 1024)).toFixed(2)} MB
              </p>
              {side && (
                <p className="text-xs text-muted-foreground mt-1">
                  {language === 'fa'
                    ? side === 'front' ? 'روی سند' : 'پشت سند'
                    : language === 'ar'
                    ? side === 'front' ? 'وجه المستند' : 'ظهر المستند'
                    : side === 'front' ? 'Front Side' : 'Back Side'
                  }
                </p>
              )}
            </div>

            {/* Remove Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              className="shrink-0 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="py-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default DocumentUpload;

