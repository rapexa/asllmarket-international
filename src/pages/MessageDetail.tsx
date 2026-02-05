import React, { useState } from 'react';
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

const MessageDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language, dir } = useLanguage();
  const navigate = useNavigate();
  const { notifications, markAsRead } = useNotifications();
  const [newMessage, setNewMessage] = useState('');

  // Mark related notifications as read
  React.useEffect(() => {
    notifications
      .filter(n => n.type === 'interaction' && n.actionUrl?.includes('/messages'))
      .forEach(n => {
        if (!n.read) markAsRead(n.id);
      });
  }, [notifications, markAsRead]);

  // Mock conversation data
  const conversation = {
    id: id || 'conv-1',
    subject: 'RFQ for Industrial Pumps',
    supplier: {
      id: 'supplier-1',
      name: 'TechGlobal Industries Ltd.',
      company: 'TechGlobal Industries',
      country: 'China',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80',
    },
    messages: [
      {
        id: 'msg-1',
        sender: 'supplier',
        senderName: 'TechGlobal Industries',
        content: 'Hello! Thank you for your RFQ regarding Industrial Pumps. We are very interested in supplying your requirements.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: true,
      },
      {
        id: 'msg-2',
        sender: 'supplier',
        senderName: 'TechGlobal Industries',
        content: 'We can provide the following specifications:\n- Flow rate: 100-500 GPM\n- Pressure: 50-200 PSI\n- Material: Cast Iron/Stainless Steel\n- MOQ: 10 units\n\nWould you like to discuss pricing and delivery terms?',
        timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
        read: true,
      },
      {
        id: 'msg-3',
        sender: 'buyer',
        senderName: 'You',
        content: 'Thank you for the quick response! Could you provide a detailed quote for 50 units with the stainless steel option?',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        read: true,
      },
      {
        id: 'msg-4',
        sender: 'supplier',
        senderName: 'TechGlobal Industries',
        content: 'Of course! I\'ll prepare a detailed quote and send it to you within 24 hours. In the meantime, please let me know your preferred delivery location.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: false,
      },
    ],
  };

  const formatTimestamp = (date: Date) => {
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

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // In a real app, this would send the message via API
    setNewMessage('');
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
                <AvatarImage src={conversation.supplier.avatar} alt={conversation.supplier.name} />
                <AvatarFallback>
                  <Building2 className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold">{conversation.supplier.company}</h1>
                  {conversation.supplier.verified && (
                    <Badge variant="default" className="gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {conversation.supplier.name} • {conversation.supplier.country}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate(`/suppliers/${conversation.supplier.id}`)}>
                <Building2 className="h-4 w-4 me-2" />
                View Supplier
              </Button>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <h2 className="text-lg font-semibold">{conversation.subject}</h2>
          </div>
        </Card>

        {/* Messages */}
        <Card className="p-6 mb-6">
          <div className="space-y-6 min-h-[400px] max-h-[600px] overflow-y-auto">
            {conversation.messages.map((message, index) => {
              const isBuyer = message.sender === 'buyer';
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
                      <AvatarImage src={conversation.supplier.avatar} alt={conversation.supplier.name} />
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
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <div className={cn(
                      "flex items-center gap-2 text-xs text-muted-foreground",
                      isBuyer && "flex-row-reverse"
                    )}>
                      <Clock className="h-3 w-3" />
                      <span>{formatTimestamp(message.timestamp)}</span>
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
                disabled={!newMessage.trim()}
                className="shrink-0 self-end"
              >
                <Send className="h-4 w-4 me-2" />
                Send
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

