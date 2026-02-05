import React, { useState, useCallback } from 'react';
import { X, Upload, Video, Loader2, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

interface VideoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (videoUrl: string) => void;
}

const VideoUploadModal: React.FC<VideoUploadModalProps> = ({
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
  const [processing, setProcessing] = useState(false);

  const title = language === 'fa'
    ? 'جستجوی ویدیو محصول'
    : language === 'ar'
    ? 'البحث عن فيديو المنتج'
    : 'Search by Product Video';

  const description = language === 'fa'
    ? 'یک ویدیو کوتاه از محصول آپلود کنید (حداکثر 30 ثانیه، MP4 یا MOV)'
    : language === 'ar'
    ? 'قم بتحميل فيديو قصير للمنتج (حد أقصى 30 ثانية، MP4 أو MOV)'
    : 'Upload a short product video (max 30 seconds, MP4 or MOV)';

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
    const validTypes = ['video/mp4', 'video/quicktime'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload MP4 or MOV video',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload a video smaller than 50MB',
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
        if (prev >= 80) {
          clearInterval(progressInterval);
          return 80;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate upload
    setTimeout(() => {
      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploading(false);
      setProcessing(true);

      // Simulate frame analysis
      setTimeout(() => {
        const videoUrl = preview;
        onUpload(videoUrl);
        handleReset();
      }, 2000);
    }, 2000);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setUploadProgress(0);
    setUploading(false);
    setProcessing(false);
  };

  const handleClose = () => {
    if (!uploading && !processing) {
      handleReset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-accent" />
            {title}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            {description}
          </DialogDescription>
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
                  <video
                    src={preview}
                    className="max-h-48 max-w-full rounded-lg"
                    controls
                  />
                  {(uploading || processing) && (
                    <div className="absolute inset-0 bg-background/90 rounded-lg flex items-center justify-center">
                      <div className="text-center space-y-2">
                        {uploading ? (
                          <>
                            <Loader2 className="h-8 w-8 animate-spin mx-auto text-accent" />
                            <div className="text-sm font-medium">{uploadProgress}%</div>
                            <p className="text-xs text-muted-foreground">
                              {language === 'fa' ? 'در حال آپلود...' : language === 'ar' ? 'جارٍ التحميل...' : 'Uploading...'}
                            </p>
                          </>
                        ) : (
                          <>
                            <Loader2 className="h-8 w-8 animate-spin mx-auto text-accent" />
                            <div className="text-sm font-medium">
                              {language === 'fa' ? 'در حال تحلیل فریم‌ها...' : language === 'ar' ? 'جارٍ تحليل الإطارات...' : 'Analyzing frames...'}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                  {!uploading && !processing && (
                    <div className="absolute top-2 end-2">
                      <CheckCircle2 className="h-6 w-6 text-success bg-background rounded-full" />
                    </div>
                  )}
                </div>
                {!uploading && !processing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="gap-2"
                  >
                    <X className="h-4 w-4" />
                    {language === 'fa' ? 'تغییر ویدیو' : language === 'ar' ? 'تغيير الفيديو' : 'Change Video'}
                  </Button>
                )}
              </div>
            ) : (
              <>
                <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    {language === 'fa'
                      ? 'ویدیو را بکشید و رها کنید'
                      : language === 'ar'
                      ? 'اسحب وأفلت الفيديو'
                      : 'Drag and drop your video here'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'fa'
                      ? 'یا برای انتخاب فایل کلیک کنید'
                      : language === 'ar'
                      ? 'أو انقر للاختيار'
                      : 'or click to select file'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    MP4, MOV (Max 50MB, 30 seconds)
                  </p>
                </div>
                <input
                  type="file"
                  accept="video/mp4,video/quicktime"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </>
            )}
          </div>

          {/* Progress Bar */}
          {(uploading || processing) && (
            <div className="space-y-2">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: `${uploading ? uploadProgress : 100}%` }}
                />
              </div>
              <p className="text-xs text-center text-muted-foreground">
                {uploading
                  ? language === 'fa'
                    ? 'در حال آپلود ویدیو...'
                    : language === 'ar'
                    ? 'جارٍ تحميل الفيديو...'
                    : 'Uploading video...'
                  : language === 'fa'
                  ? 'در حال تحلیل ویدیو و جستجوی محصولات...'
                  : language === 'ar'
                  ? 'جارٍ تحليل الفيديو والبحث عن المنتجات...'
                  : 'Analyzing video and finding products...'}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleClose}
              disabled={uploading || processing}
            >
              {language === 'fa' ? 'لغو' : language === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button
              className="flex-1 gap-2"
              onClick={handleUpload}
              disabled={!selectedFile || uploading || processing}
            >
              {(uploading || processing) ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {uploading
                    ? language === 'fa' ? 'در حال آپلود...' : language === 'ar' ? 'جارٍ التحميل...' : 'Uploading...'
                    : language === 'fa' ? 'در حال پردازش...' : language === 'ar' ? 'جارٍ المعالجة...' : 'Processing...'}
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

export default VideoUploadModal;

