import React, { useState } from 'react';
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

// Mock data - in real app, fetch from API
const mockPosts = [
  {
    id: 1,
    title: '10 Tips for Successful B2B Trading in 2024',
    excerpt: 'Discover the latest strategies and best practices for successful B2B trading in the modern marketplace.',
    content: `
      <h2>Introduction</h2>
      <p>B2B trading has evolved significantly in recent years, with new technologies and strategies emerging to help businesses succeed in the global marketplace. In this comprehensive guide, we'll explore 10 essential tips that can help you navigate the complexities of B2B trading in 2024.</p>
      
      <h2>1. Build Strong Relationships</h2>
      <p>One of the most important aspects of successful B2B trading is building and maintaining strong relationships with your partners. This means going beyond simple transactions and creating genuine connections based on trust and mutual benefit.</p>
      
      <h2>2. Leverage Technology</h2>
      <p>Modern B2B platforms offer powerful tools for managing relationships, tracking orders, and analyzing performance. Make sure you're taking full advantage of these technologies to streamline your operations.</p>
      
      <h2>3. Understand Your Market</h2>
      <p>Deep market knowledge is crucial for success. Stay informed about industry trends, competitor activities, and emerging opportunities in your target markets.</p>
      
      <h2>4. Focus on Quality</h2>
      <p>Quality should never be compromised. Whether it's your products, services, or customer support, maintaining high standards is essential for long-term success.</p>
      
      <h2>5. Optimize Your Supply Chain</h2>
      <p>An efficient supply chain can significantly reduce costs and improve delivery times. Regularly review and optimize your logistics processes.</p>
      
      <h2>6. Use Data Analytics</h2>
      <p>Data-driven decisions are more likely to succeed. Use analytics to understand customer behavior, optimize pricing, and identify growth opportunities.</p>
      
      <h2>7. Ensure Compliance</h2>
      <p>Stay compliant with all relevant regulations and standards. This includes trade regulations, quality standards, and legal requirements in your target markets.</p>
      
      <h2>8. Invest in Training</h2>
      <p>Your team is your greatest asset. Invest in training and development to ensure they have the skills needed to succeed in the modern B2B environment.</p>
      
      <h2>9. Build Your Brand</h2>
      <p>A strong brand can differentiate you from competitors and build trust with potential partners. Invest in branding and marketing efforts.</p>
      
      <h2>10. Stay Flexible</h2>
      <p>The B2B landscape is constantly changing. Stay flexible and be ready to adapt your strategies as market conditions evolve.</p>
      
      <h2>Conclusion</h2>
      <p>Success in B2B trading requires a combination of strong relationships, effective use of technology, and a deep understanding of your market. By following these tips, you can position your business for success in 2024 and beyond.</p>
    `,
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      role: 'Trade Expert',
      bio: 'Sarah has over 10 years of experience in B2B trading and international business. She specializes in helping companies expand their global reach.',
    },
    category: 'Trading',
    tags: ['B2B', 'Trading', 'Tips', '2024'],
    publishedAt: '2024-01-15',
    readTime: 5,
    views: 1250,
    likes: 89,
    featured: true,
  },
  {
    id: 2,
    title: 'How to Build Trust with International Suppliers',
    excerpt: 'Learn how to establish and maintain trust with suppliers from different countries and cultures.',
    content: `
      <h2>Introduction</h2>
      <p>Building trust with international suppliers is crucial for successful B2B relationships. This guide explores proven strategies for establishing and maintaining trust across cultural boundaries.</p>
      
      <h2>Understanding Cultural Differences</h2>
      <p>Different cultures have different approaches to business relationships. Understanding these differences is the first step toward building trust.</p>
      
      <h2>Communication Strategies</h2>
      <p>Effective communication is key to building trust. Learn how to communicate clearly and respectfully with suppliers from different cultural backgrounds.</p>
      
      <h2>Building Long-term Relationships</h2>
      <p>Trust is built over time through consistent actions and reliable behavior. Focus on building long-term relationships rather than short-term gains.</p>
    `,
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80',
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      role: 'Supply Chain Manager',
      bio: 'Michael is an expert in international supply chain management with extensive experience in Asia-Pacific markets.',
    },
    category: 'Supply Chain',
    tags: ['Suppliers', 'Trust', 'International'],
    publishedAt: '2024-01-12',
    readTime: 7,
    views: 980,
    likes: 67,
  },
  {
    id: 3,
    title: 'The Future of E-commerce in B2B Markets',
    excerpt: 'Exploring the trends and technologies shaping the future of B2B e-commerce platforms.',
    content: `
      <h2>Introduction</h2>
      <p>The B2B e-commerce landscape is rapidly evolving, with new technologies and trends reshaping how businesses buy and sell online.</p>
      
      <h2>Emerging Technologies</h2>
      <p>AI, machine learning, and automation are transforming B2B e-commerce platforms, making them more efficient and user-friendly.</p>
      
      <h2>Market Trends</h2>
      <p>Understanding current market trends is essential for staying competitive in the B2B e-commerce space.</p>
    `,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    author: {
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      role: 'E-commerce Analyst',
      bio: 'Emily is a leading expert in B2B e-commerce trends and digital transformation strategies.',
    },
    category: 'E-commerce',
    tags: ['E-commerce', 'Future', 'Technology'],
    publishedAt: '2024-01-10',
    readTime: 6,
    views: 1520,
    likes: 112,
    featured: true,
  },
  {
    id: 4,
    title: 'Understanding MOQ: Minimum Order Quantities Explained',
    excerpt: 'A comprehensive guide to understanding and negotiating minimum order quantities in B2B transactions.',
    content: `
      <h2>What is MOQ?</h2>
      <p>Minimum Order Quantity (MOQ) is the smallest number of units a supplier is willing to sell in a single order. Understanding MOQ is crucial for successful B2B negotiations.</p>
      
      <h2>Why MOQ Matters</h2>
      <p>MOQ affects pricing, inventory management, and supplier relationships. Learn how to navigate MOQ requirements effectively.</p>
      
      <h2>Negotiating MOQ</h2>
      <p>Effective negotiation strategies can help you achieve better MOQ terms that work for your business needs.</p>
    `,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',
    author: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      role: 'Business Consultant',
      bio: 'David specializes in B2B negotiations and supply chain optimization.',
    },
    category: 'Business',
    tags: ['MOQ', 'Business', 'Negotiation'],
    publishedAt: '2024-01-08',
    readTime: 4,
    views: 890,
    likes: 54,
  },
  {
    id: 5,
    title: 'Top 5 Payment Methods for International B2B Transactions',
    excerpt: 'Compare the most secure and efficient payment methods for cross-border B2B transactions.',
    content: `
      <h2>Introduction</h2>
      <p>Choosing the right payment method is crucial for successful international B2B transactions. This guide compares the top 5 payment methods available today.</p>
      
      <h2>1. Letter of Credit (L/C)</h2>
      <p>Letters of Credit provide security for both buyers and sellers in international transactions.</p>
      
      <h2>2. Escrow Services</h2>
      <p>Escrow services offer protection by holding funds until transaction conditions are met.</p>
      
      <h2>3. Bank Transfers</h2>
      <p>Traditional bank transfers remain a popular choice for B2B transactions, though they can be slower.</p>
      
      <h2>4. Digital Payment Platforms</h2>
      <p>Modern digital platforms offer faster and more convenient payment options for B2B transactions.</p>
      
      <h2>5. Trade Finance</h2>
      <p>Trade finance solutions provide financing options for international B2B transactions.</p>
    `,
    image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&q=80',
    author: {
      name: 'Lisa Wang',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
      role: 'Finance Expert',
      bio: 'Lisa is an expert in international finance and payment solutions for B2B transactions.',
    },
    category: 'Finance',
    tags: ['Payment', 'Finance', 'International'],
    publishedAt: '2024-01-05',
    readTime: 8,
    views: 2100,
    likes: 145,
  },
  {
    id: 6,
    title: 'Digital Transformation in B2B: A Complete Guide',
    excerpt: 'How businesses can leverage digital transformation to improve their B2B operations and customer experience.',
    content: `
      <h2>Introduction</h2>
      <p>Digital transformation is reshaping B2B operations, offering new opportunities for efficiency and growth.</p>
      
      <h2>Key Technologies</h2>
      <p>Explore the key technologies driving digital transformation in B2B, including AI, cloud computing, and automation.</p>
      
      <h2>Implementation Strategies</h2>
      <p>Learn how to successfully implement digital transformation initiatives in your B2B operations.</p>
      
      <h2>Measuring Success</h2>
      <p>Understand how to measure the success of your digital transformation efforts and adjust your strategy accordingly.</p>
    `,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    author: {
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
      role: 'Digital Strategist',
      bio: 'James helps businesses navigate digital transformation and leverage technology for competitive advantage.',
    },
    category: 'Technology',
    tags: ['Digital', 'Transformation', 'Technology'],
    publishedAt: '2024-01-03',
    readTime: 10,
    views: 1750,
    likes: 98,
  },
];

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, dir } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const post = mockPosts.find(p => p.id === Number(id));

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

  // Get related posts (same category, different post)
  const relatedPosts = mockPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

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

