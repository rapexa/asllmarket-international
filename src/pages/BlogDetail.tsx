import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowLeft,
  ArrowRight,
  Tag,
  Eye,
  Heart,
  Share2,
  BookOpen,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  Copy,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import { cmsService, BlogPost as ApiBlogPost } from '@/services';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    bio?: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  views: number;
  likes: number;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, dir } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        const apiPost: ApiBlogPost = await cmsService.getBlogPost(id);
        const mapped: BlogPost = {
          id: apiPost.id,
          title: apiPost.title,
          excerpt: apiPost.excerpt,
          content: apiPost.content,
          image: apiPost.imageUrl || 'https://via.placeholder.com/1200x400?text=Blog',
          author: {
            name: apiPost.authorName || 'ASL Market',
            avatar: apiPost.authorAvatar || 'https://via.placeholder.com/100x100?text=Author',
            role: apiPost.authorRole || 'Author',
            bio: '',
          },
          category: apiPost.category || 'General',
          tags: apiPost.tags ? JSON.parse(apiPost.tags) : [],
          publishedAt: apiPost.publishedAt || apiPost.createdAt || '',
          readTime: apiPost.readTime || 5,
          views: apiPost.views || 0,
          likes: apiPost.likes || 0,
        };
        setPost(mapped);

        const list = await cmsService.listBlogPosts();
        const related = (list.items || [])
          .filter(p => p.id !== apiPost.id && p.category === apiPost.category)
          .slice(0, 3)
          .map((p): BlogPost => ({
            id: p.id,
            title: p.title,
            excerpt: p.excerpt,
            content: p.content,
            image: p.imageUrl || 'https://via.placeholder.com/400x200?text=Blog',
            author: {
              name: p.authorName || 'ASL Market',
              avatar: p.authorAvatar || 'https://via.placeholder.com/100x100?text=Author',
              role: p.authorRole || 'Author',
            },
            category: p.category || 'General',
            tags: p.tags ? JSON.parse(p.tags) : [],
            publishedAt: p.publishedAt || p.createdAt || '',
            readTime: p.readTime || 5,
            views: p.views || 0,
            likes: p.likes || 0,
          }));
        setRelatedPosts(related);
      } catch (e) {
        console.error('Failed to load blog post:', e);
      }
    };

    load();
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <Header />
        <div className="container py-20 text-center">
          <Card className="p-12 max-w-md mx-auto">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h2 className="text-2xl font-bold mb-2">
              {language === 'fa' ? 'پست یافت نشد' : language === 'ar' ? 'لم يتم العثور على المنشور' : 'Post Not Found'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {language === 'fa'
                ? 'پست مورد نظر شما یافت نشد'
                : language === 'ar'
                ? 'المنشور المطلوب غير موجود'
                : 'The requested post could not be found'}
            </p>
            <Button onClick={() => navigate('/blog')}>
              {language === 'fa' ? 'بازگشت به بلاگ' : language === 'ar' ? 'العودة إلى المدونة' : 'Back to Blog'}
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (language === 'fa') {
      return date.toLocaleDateString('fa-IR');
    } else if (language === 'ar') {
      return date.toLocaleDateString('ar-SA');
    }
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleLike = () => {
    setLiked(!liked);
    toast({
      title: liked
        ? (language === 'fa' ? 'لایک حذف شد' : language === 'ar' ? 'تم إلغاء الإعجاب' : 'Unliked')
        : (language === 'fa' ? 'لایک شد' : language === 'ar' ? 'تم الإعجاب' : 'Liked'),
    });
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = post.title;
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast({
      title: language === 'fa' ? 'لینک کپی شد' : language === 'ar' ? 'تم نسخ الرابط' : 'Link Copied',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />

      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 start-0 end-0 p-6 md:p-12">
          <div className="container">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 mb-6"
              onClick={() => navigate('/blog')}
            >
              <ArrowLeft className={cn("me-2 h-4 w-4", dir === 'rtl' && "rotate-180")} />
              {language === 'fa' ? 'بازگشت به بلاگ' : language === 'ar' ? 'العودة إلى المدونة' : 'Back to Blog'}
            </Button>
            <Badge className="mb-4 bg-primary text-primary-foreground">
              {post.category}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} {language === 'fa' ? 'دقیقه خواندن' : language === 'ar' ? 'دقيقة قراءة' : 'min read'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Article Content */}
            <div className="lg:col-span-2">
              <Card className="p-6 md:p-10">
                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-foreground">{post.author.name}</div>
                      <div className="text-sm text-muted-foreground">{post.author.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ms-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn("gap-2", liked && "bg-red-50 border-red-200 text-red-600")}
                      onClick={handleLike}
                    >
                      <Heart className={cn("h-4 w-4", liked && "fill-red-600")} />
                      <span>{post.likes + (liked ? 1 : 0)}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={handleCopyLink}
                    >
                      {copied ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Article Content */}
                <article
                  className={cn(
                    "prose prose-lg max-w-none",
                    "prose-headings:font-bold prose-headings:text-foreground",
                    "prose-p:text-muted-foreground prose-p:leading-relaxed",
                    "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
                    "prose-strong:text-foreground prose-strong:font-semibold",
                    "prose-ul:text-muted-foreground prose-ol:text-muted-foreground",
                    "prose-li:text-muted-foreground",
                    "dark:prose-invert"
                  )}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                <div className="mt-8 pt-8 border-t border-border">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-foreground me-2">
                      {language === 'fa' ? 'تگ‌ها:' : language === 'ar' ? 'العلامات:' : 'Tags:'}
                    </span>
                    {post.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="gap-1.5">
                        <Tag className="h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="mt-8 pt-8 border-t border-border">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-foreground">
                      {language === 'fa' ? 'اشتراک‌گذاری:' : language === 'ar' ? 'مشاركة:' : 'Share:'}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleShare('twitter')}
                      >
                        <Twitter className="h-4 w-4" />
                        Twitter
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleShare('facebook')}
                      >
                        <Facebook className="h-4 w-4" />
                        Facebook
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleShare('linkedin')}
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleShare('email')}
                      >
                        <Mail className="h-4 w-4" />
                        Email
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Author Card */}
              <Card className="p-6 mt-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/10">
                <div className="flex gap-6">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-20 h-20 rounded-full shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">{post.author.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{post.author.role}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{post.author.bio}</p>
                  </div>
                </div>
              </Card>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    {language === 'fa' ? 'پست‌های مرتبط' : language === 'ar' ? 'منشورات ذات صلة' : 'Related Posts'}
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Card
                        key={relatedPost.id}
                        className="overflow-hidden border-2 border-border hover:border-primary/50 transition-all hover:shadow-xl group cursor-pointer"
                        onClick={() => navigate(`/blog/${relatedPost.id}`)}
                      >
                        <div className="relative h-40 overflow-hidden bg-muted">
                          <img
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                        <div className="p-4">
                          <Badge className="mb-2 text-xs">{relatedPost.category}</Badge>
                          <h3 className="font-bold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(relatedPost.publishedAt)}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Stats Card */}
                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4">
                    {language === 'fa' ? 'آمار' : language === 'ar' ? 'الإحصائيات' : 'Statistics'}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Eye className="h-4 w-4" />
                        <span className="text-sm">{language === 'fa' ? 'بازدید' : language === 'ar' ? 'مشاهدة' : 'Views'}</span>
                      </div>
                      <span className="font-bold">{post.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{language === 'fa' ? 'لایک' : language === 'ar' ? 'إعجاب' : 'Likes'}</span>
                      </div>
                      <span className="font-bold">{post.likes + (liked ? 1 : 0)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{language === 'fa' ? 'زمان خواندن' : language === 'ar' ? 'وقت القراءة' : 'Read Time'}</span>
                      </div>
                      <span className="font-bold">{post.readTime} {language === 'fa' ? 'دقیقه' : language === 'ar' ? 'دقيقة' : 'min'}</span>
                    </div>
                  </div>
                </Card>

                {/* CTA Card */}
                <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20">
                  <h3 className="font-bold text-lg mb-3">
                    {language === 'fa' ? 'به ما بپیوندید' : language === 'ar' ? 'انضم إلينا' : 'Join Us'}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === 'fa'
                      ? 'به بزرگترین پلتفرم B2B جهانی بپیوندید'
                      : language === 'ar'
                      ? 'انضم إلى أكبر منصة B2B عالمية'
                      : 'Join the world\'s largest B2B platform'}
                  </p>
                  <Button
                    className="w-full btn-gradient-primary"
                    onClick={() => navigate('/register')}
                  >
                    {language === 'fa' ? 'ثبت‌نام کنید' : language === 'ar' ? 'سجل الآن' : 'Sign Up'}
                    <ArrowRight className={cn("ms-2 h-4 w-4", dir === 'rtl' && "rotate-180")} />
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetail;

