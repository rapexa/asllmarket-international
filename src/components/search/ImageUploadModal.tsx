import React, { useState, useCallback } from 'react';
import { X, Upload, Image as ImageIcon, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (imageUrl: string) => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const title = language === 'fa' 
    ? 'جستجوی تصویر محصول'
    : language === 'ar'
    ? 'البحث عن صورة المنتج'
    : 'Search by Product Image';

  const description = language === 'fa'
    ? 'یک تصویر از محصول مورد نظر خود آپلود کنید تا محصولات مشابه را پیدا کنیم'
    : language === 'ar'
    ? 'قم بتحميل صورة المنتج المطلوب للعثور على منتجات مماثلة'
    : 'Upload an image of your desired product to find similar items';

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload JPG, PNG, or WEBP image',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image smaller than 10MB',
        variant: 'destructive',
      });
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile || !preview) return;

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    // In real app, upload to server and get image URL
    setTimeout(() => {
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        // Create object URL for demo
        const imageUrl = preview;
        onUpload(imageUrl);
        handleReset();
      }, 500);
    }, 2000);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setUploadProgress(0);
    setUploading(false);
  };

  const handleClose = () => {
    if (!uploading) {
      handleReset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-accent" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Upload Area */}
          <div
            className={cn(
              "relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200",
              dragActive ? "border-accent bg-accent/5" : "border-border hover:border-accent/50",
              preview && "border-accent bg-accent/5"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {preview ? (
              <div className="space-y-4">
                <div className="relative inline-block">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-48 max-w-full rounded-lg object-contain"
                  />
                  {uploading && (
                    <div className="absolute inset-0 bg-background/80 rounded-lg flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto text-accent" />
                        <div className="text-sm font-medium">{uploadProgress}%</div>
                      </div>
                    </div>
                  )}
                  {uploadProgress === 100 && !uploading && (
                    <div className="absolute inset-0 bg-background/80 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="h-8 w-8 text-success" />
                    </div>
                  )}
                </div>
                {!uploading && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="gap-2"
                  >
                    <X className="h-4 w-4" />
                    {language === 'fa' ? 'تغییر تصویر' : language === 'ar' ? 'تغيير الصورة' : 'Change Image'}
                  </Button>
                )}
              </div>
            ) : (
              <>
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    {language === 'fa' 
                      ? 'تصویر را بکشید و رها کنید'
                      : language === 'ar'
                      ? 'اسحب وأفلت الصورة'
                      : 'Drag and drop your image here'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'fa'
                      ? 'یا برای انتخاب فایل کلیک کنید'
                      : language === 'ar'
                      ? 'أو انقر للاختيار'
                      : 'or click to select file'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    JPG, PNG, WEBP (Max 10MB)
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </>
            )}
          </div>

          {/* Progress Bar */}
          {uploading && (
            <div className="space-y-2">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-center text-muted-foreground">
                {language === 'fa'
                  ? 'در حال آپلود و تحلیل تصویر...'
                  : language === 'ar'
                  ? 'جارٍ التحميل والتحليل...'
                  : 'Uploading and analyzing image...'}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleClose}
              disabled={uploading}
            >
              {language === 'fa' ? 'لغو' : language === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button
              className="flex-1 gap-2"
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {language === 'fa' ? 'در حال پردازش...' : language === 'ar' ? 'جارٍ المعالجة...' : 'Processing...'}
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  {language === 'fa' ? 'جستجو' : language === 'ar' ? 'بحث' : 'Search'}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadModal;

