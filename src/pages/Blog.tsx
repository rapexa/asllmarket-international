import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowRight,
  Search,
  Filter,
  Tag,
  TrendingUp,
  BookOpen,
  Sparkles,
  Eye,
  Heart,
  Share2,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  };
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  views: number;
  likes: number;
  featured?: boolean;
}

const categories = ['All', 'Trading', 'Supply Chain', 'E-commerce', 'Business', 'Finance', 'Technology'];
const popularTags = ['B2B', 'Trading', 'Suppliers', 'E-commerce', 'Finance', 'Technology', 'International', 'Business'];

const Blog: React.FC = () => {
  const { language, dir } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await cmsService.listBlogPosts();
        const items = (res.items || []).map((p: ApiBlogPost): BlogPost => ({
          id: p.id,
          title: p.title,
          excerpt: p.excerpt,
          content: p.content,
          image: p.imageUrl || 'https://via.placeholder.com/800x400?text=Blog',
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
          featured: p.featured,
        }));
        setPosts(items);
        setFilteredPosts(items);
      } catch (e) {
        console.error('Failed to load blog posts:', e);
      }
    };

    loadPosts();
  }, []);

  // Filter posts
  React.useEffect(() => {
    let filtered = [...posts];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    setFilteredPosts(filtered);
  }, [searchQuery, selectedCategory, posts]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (language === 'fa') {
      return date.toLocaleDateString('fa-IR');
    } else if (language === 'ar') {
      return date.toLocaleDateString('ar-SA');
    }
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'All';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 start-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 end-10 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-primary/10 backdrop-blur-xl px-6 py-3 rounded-full text-sm font-semibold border border-primary/20">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-primary font-bold">
                {language === 'fa' ? 'بلاگ' : language === 'ar' ? 'المدونة' : 'Blog'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className="block text-foreground">
                {language === 'fa' ? 'بلاگ ASL Market' : language === 'ar' ? 'مدونة ASL Market' : 'ASL Market Blog'}
              </span>
              <span className="block mt-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {language === 'fa' ? 'راهنمای تجارت B2B' : language === 'ar' ? 'دليل التجارة B2B' : 'Your B2B Trade Guide'}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {language === 'fa'
                ? 'راهنمایی‌ها، نکات و بینش‌های تخصصی برای موفقیت در تجارت B2B'
                : language === 'ar'
                ? 'نصائح ونصائح ورؤى متخصصة للنجاح في التجارة B2B'
                : 'Expert tips, insights, and guides for B2B trade success'}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Search and Filters */}
              <Card className="p-6 mb-8">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={language === 'fa' ? 'جستجوی پست‌ها...' : language === 'ar' ? 'البحث عن المنشورات...' : 'Search posts...'}
                      className="w-full ps-10 pe-4 h-12 rounded-xl"
                    />
                  </div>

                  {/* Category Filter */}
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full lg:w-[200px] h-12 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>
                          {cat === 'All' 
                            ? (language === 'fa' ? 'همه دسته‌ها' : language === 'ar' ? 'جميع الفئات' : 'All Categories')
                            : cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Clear Filters */}
                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="h-12 px-4 rounded-xl gap-2"
                    >
                      <X className="h-4 w-4" />
                      {language === 'fa' ? 'پاک کردن' : language === 'ar' ? 'مسح' : 'Clear'}
                    </Button>
                  )}
                </div>
              </Card>

              {/* Featured Post */}
              {filteredPosts.filter(p => p.featured).length > 0 && (
                <Card className="mb-8 overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-all group">
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <img
                      src={filteredPosts.find(p => p.featured)?.image}
                      alt={filteredPosts.find(p => p.featured)?.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 start-0 end-0 p-6 text-white">
                      <Badge className="mb-3 bg-primary text-primary-foreground">
                        {language === 'fa' ? 'ویژه' : language === 'ar' ? 'مميز' : 'Featured'}
                      </Badge>
                      <h2 className="text-2xl md:text-3xl font-bold mb-3 line-clamp-2">
                        {filteredPosts.find(p => p.featured)?.title}
                      </h2>
                      <p className="text-white/90 mb-4 line-clamp-2">
                        {filteredPosts.find(p => p.featured)?.excerpt}
                      </p>
                      <Button
                        className="bg-white text-foreground hover:bg-white/90"
                        onClick={() => navigate(`/blog/${filteredPosts.find(p => p.featured)?.id}`)}
                      >
                        {language === 'fa' ? 'خواندن بیشتر' : language === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                        <ArrowRight className={cn("ms-2 h-4 w-4", dir === 'rtl' && "rotate-180")} />
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Posts Grid */}
              {filteredPosts.length === 0 ? (
                <Card className="p-12 text-center">
                  <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-xl font-bold mb-2">
                    {language === 'fa' ? 'پستی یافت نشد' : language === 'ar' ? 'لم يتم العثور على منشور' : 'No Posts Found'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {language === 'fa'
                      ? 'لطفاً فیلترها را تغییر دهید یا کلمه جستجوی دیگری را امتحان کنید'
                      : language === 'ar'
                      ? 'يرجى تغيير المرشحات أو تجربة كلمة بحث أخرى'
                      : 'Please try changing filters or search with different keywords'}
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    {language === 'fa' ? 'پاک کردن فیلترها' : language === 'ar' ? 'مسح المرشحات' : 'Clear Filters'}
                  </Button>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPosts
                    .filter(p => !p.featured)
                    .map((post) => (
                      <Card
                        key={post.id}
                        className="overflow-hidden border-2 border-border hover:border-primary/50 transition-all hover:shadow-xl group cursor-pointer"
                        onClick={() => navigate(`/blog/${post.id}`)}
                      >
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden bg-muted">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute top-3 start-3">
                            <Badge className="bg-primary text-primary-foreground">
                              {post.category}
                            </Badge>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>

                          {/* Meta Info */}
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                            <div className="flex items-center gap-1.5">
                              <User className="h-3.5 w-3.5" />
                              <span>{post.author.name}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{formatDate(post.publishedAt)}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{post.readTime} {language === 'fa' ? 'دقیقه' : language === 'ar' ? 'دقيقة' : 'min'}</span>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                            <div className="flex items-center gap-1.5">
                              <Eye className="h-3.5 w-3.5" />
                              <span>{post.views}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Heart className="h-3.5 w-3.5" />
                              <span>{post.likes}</span>
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                <Tag className="h-3 w-3 me-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Read More */}
                          <Button
                            variant="ghost"
                            className="w-full justify-between group/btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/blog/${post.id}`);
                            }}
                          >
                            <span>{language === 'fa' ? 'خواندن بیشتر' : language === 'ar' ? 'اقرأ المزيد' : 'Read More'}</span>
                            <ArrowRight className={cn("h-4 w-4 group-hover/btn:translate-x-1 transition-transform", dir === 'rtl' && "rotate-180")} />
                          </Button>
                        </div>
                      </Card>
                    ))}
                </div>
              )}

              {/* Load More */}
              {filteredPosts.length > 0 && (
                <div className="text-center mt-12">
                  <Button
                    size="lg"
                    className="btn-gradient-primary rounded-2xl px-12 py-7 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
                  >
                    {language === 'fa' ? 'نمایش پست‌های بیشتر' : language === 'ar' ? 'عرض المزيد من المنشورات' : 'Load More Posts'}
                    <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Categories */}
                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Filter className="h-5 w-5 text-primary" />
                    {language === 'fa' ? 'دسته‌بندی‌ها' : language === 'ar' ? 'الفئات' : 'Categories'}
                  </h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                          "w-full text-start px-4 py-2 rounded-lg transition-all text-sm",
                          selectedCategory === cat
                            ? "bg-primary/10 text-primary font-semibold border border-primary/20"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {cat === 'All' 
                          ? (language === 'fa' ? 'همه' : language === 'ar' ? 'الكل' : 'All')
                          : cat}
                      </button>
                    ))}
                  </div>
                </Card>

                {/* Popular Tags */}
                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    {language === 'fa' ? 'تگ‌های محبوب' : language === 'ar' ? 'العلامات الشائعة' : 'Popular Tags'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
                        onClick={() => setSearchQuery(tag)}
                      >
                        <Tag className="h-3 w-3 me-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Card>

                {/* Popular Posts */}
                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    {language === 'fa' ? 'پست‌های محبوب' : language === 'ar' ? 'المنشورات الشائعة' : 'Popular Posts'}
                  </h3>
                  <div className="space-y-4">
                    {posts
                      .sort((a, b) => b.views - a.views)
                      .slice(0, 3)
                      .map((post) => (
                        <div
                          key={post.id}
                          className="flex gap-3 cursor-pointer group"
                          onClick={() => navigate(`/blog/${post.id}`)}
                        >
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                              {post.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(post.publishedAt)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
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

export default Blog;

