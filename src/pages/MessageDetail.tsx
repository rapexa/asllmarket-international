import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Paperclip, Building2, User, Clock, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNotifications } from '@/contexts/NotificationContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { messageService, ConversationPreview, Message } from '@/services';

const MessageDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language, dir } = useLanguage();
  const navigate = useNavigate();
  const { notifications, markAsRead } = useNotifications();
  const [newMessage, setNewMessage] = useState('');
  const [conversation, setConversation] = useState<ConversationPreview | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sending, setSending] = useState<boolean>(false);

  // Mark related notifications as read
  React.useEffect(() => {
    notifications
      .filter(n => n.type === 'interaction' && n.actionUrl?.includes('/messages'))
      .forEach(n => {
        if (!n.read) markAsRead(n.id);
      });
  }, [notifications, markAsRead]);

  useEffect(() => {
    const loadConversation = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const convRes = await messageService.listConversations();
        const conv = (convRes.items || []).find(c => c.conversationId === id) || null;
        setConversation(conv);

        const msgRes = await messageService.listMessages(id, { limit: 100, offset: 0 });
        setMessages(msgRes.items || []);
      } catch (error) {
        console.error('Failed to load conversation:', error);
      } finally {
        setLoading(false);
      }
    };

    loadConversation();
  }, [id]);

  const formatTimestamp = (iso: string) => {
    const date = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !conversation) return;
    try {
      setSending(true);
      const created = await messageService.create({
        receiverId: conversation.otherUserId,
        body: newMessage.trim(),
      });
      setMessages(prev => [...prev, created]);
      setNewMessage('');
    } catch (e) {
      console.error('Failed to send message:', e);
    } finally {
      setSending(false);
    }
  };

  if (loading || !conversation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <Header />
        <div className="container py-12 flex items-center justify-center">
          <span className="text-muted-foreground">
            {language === 'fa'
              ? 'در حال بارگذاری گفتگو...'
              : language === 'ar'
              ? 'جارٍ تحميل المحادثة...'
              : 'Loading conversation...'}
          </span>
        </div>
        <Footer />
      </div>
    );
  }

  const supplier = {
    id: conversation.otherUserId,
    name: conversation.otherUserName,
    company: conversation.otherUserName,
    country: '',
    verified: false,
    avatar: '',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />
      <div className="container py-8 md:py-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 gap-2"
        >
          <ArrowLeft className={cn("h-4 w-4", dir === 'rtl' && "rotate-180")} />
          Back to Messages
        </Button>

        {/* Header */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={supplier.avatar} alt={supplier.name} />
                <AvatarFallback>
                  <Building2 className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold">{supplier.company}</h1>
                  {supplier.verified && (
                    <Badge variant="default" className="gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {supplier.name} {supplier.country && <>• {supplier.country}</>}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate(`/suppliers/${supplier.id}`)}>
                <Building2 className="h-4 w-4 me-2" />
                View Supplier
              </Button>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <h2 className="text-lg font-semibold">{conversation.lastMessage}</h2>
          </div>
        </Card>

        {/* Messages */}
        <Card className="p-6 mb-6">
          <div className="space-y-6 min-h-[400px] max-h-[600px] overflow-y-auto">
            {messages.map((message) => {
              const isBuyer = message.senderId !== supplier.id;
              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-4",
                    isBuyer ? "flex-row-reverse" : "flex-row",
                    dir === 'rtl' && "flex-row-reverse"
                  )}
                >
                  {!isBuyer && (
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarImage src={supplier.avatar} alt={supplier.name} />
                      <AvatarFallback>
                        <Building2 className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className={cn(
                    "flex-1 space-y-1",
                    isBuyer && "flex items-end flex-col"
                  )}>
                    <div className={cn(
                      "inline-block p-4 rounded-2xl max-w-[70%]",
                      isBuyer
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground",
                      dir === 'rtl' && (isBuyer ? "rounded-tr-none" : "rounded-tl-none"),
                      !dir || dir === 'ltr' && (isBuyer ? "rounded-tr-none" : "rounded-tl-none")
                    )}>
                      <p className="text-sm whitespace-pre-wrap">{message.body}</p>
                    </div>
                    <div className={cn(
                      "flex items-center gap-2 text-xs text-muted-foreground",
                      isBuyer && "flex-row-reverse"
                    )}>
                      <Clock className="h-3 w-3" />
                      <span>{formatTimestamp(message.createdAt)}</span>
                      {message.read && isBuyer && (
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                      )}
                    </div>
                  </div>
                  {isBuyer && (
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Message Input */}
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="shrink-0">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="shrink-0">
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Textarea
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="min-h-[100px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || sending}
                className="shrink-0 self-end"
              >
                <Send className="h-4 w-4 me-2" />
                {sending ? 'Sending...' : 'Send'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default MessageDetail;

