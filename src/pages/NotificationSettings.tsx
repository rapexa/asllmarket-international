import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Bell, Mail, Smartphone, Moon, ArrowLeft, Save, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const NotificationSettings: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('notificationSettings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback to default
      }
    }
    return {
    // In-App Notifications
    inApp: {
      enabled: true,
      business: true,
      interaction: true,
      system: true,
      promotional: false,
    },
    // Email Notifications
    email: {
      enabled: true,
      business: true,
      interaction: true,
      system: false,
      promotional: false,
    },
    // Quiet Hours
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00',
    },
    // Promotional
    mutePromotional: false,
    };
  });

  const handleSave = () => {
    // In real app, save to backend
    localStorage.setItem('notificationSettings', JSON.stringify(settings));
    toast({
      title: 'Settings Saved',
      description: 'Your notification preferences have been updated.',
    });
  };

  const updateSetting = (path: string[], value: boolean | string) => {
    setSettings(prev => {
      const newSettings = { ...prev };
      let current: any = newSettings;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newSettings;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />
      <div className="container py-8 md:py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/notifications')}
          >
            <ArrowLeft className={cn("h-5 w-5", dir === 'rtl' && "rotate-180")} />
          </Button>
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-2">
              Notification Settings
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage how and when you receive notifications
            </p>
          </div>
        </div>

        <div className="max-w-3xl space-y-6">
          {/* In-App Notifications */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">In-App Notifications</h2>
                <p className="text-sm text-muted-foreground">
                  Receive notifications within the application
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-semibold">Enable In-App Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Show notifications in the app
                  </p>
                </div>
                <Switch
                  checked={settings.inApp.enabled}
                  onCheckedChange={(checked) => updateSetting(['inApp', 'enabled'], checked)}
                />
              </div>

              {settings.inApp.enabled && (
                <>
                  <Separator />
                  <div className="space-y-4 pl-4">
                    <div className="flex items-center justify-between">
                      <Label>Business & Orders</Label>
                      <Switch
                        checked={settings.inApp.business}
                        onCheckedChange={(checked) => updateSetting(['inApp', 'business'], checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Messages & Interactions</Label>
                      <Switch
                        checked={settings.inApp.interaction}
                        onCheckedChange={(checked) => updateSetting(['inApp', 'interaction'], checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>System Notifications</Label>
                      <Switch
                        checked={settings.inApp.system}
                        onCheckedChange={(checked) => updateSetting(['inApp', 'system'], checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Promotional</Label>
                      <Switch
                        checked={settings.inApp.promotional}
                        onCheckedChange={(checked) => updateSetting(['inApp', 'promotional'], checked)}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>

          {/* Email Notifications */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Email Notifications</h2>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-semibold">Enable Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send notifications to your email address
                  </p>
                </div>
                <Switch
                  checked={settings.email.enabled}
                  onCheckedChange={(checked) => updateSetting(['email', 'enabled'], checked)}
                />
              </div>

              {settings.email.enabled && (
                <>
                  <Separator />
                  <div className="space-y-4 pl-4">
                    <div className="flex items-center justify-between">
                      <Label>Business & Orders</Label>
                      <Switch
                        checked={settings.email.business}
                        onCheckedChange={(checked) => updateSetting(['email', 'business'], checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Messages & Interactions</Label>
                      <Switch
                        checked={settings.email.interaction}
                        onCheckedChange={(checked) => updateSetting(['email', 'interaction'], checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>System Notifications</Label>
                      <Switch
                        checked={settings.email.system}
                        onCheckedChange={(checked) => updateSetting(['email', 'system'], checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Promotional</Label>
                      <Switch
                        checked={settings.email.promotional}
                        onCheckedChange={(checked) => updateSetting(['email', 'promotional'], checked)}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>

          {/* Quiet Hours */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Moon className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Quiet Hours</h2>
                <p className="text-sm text-muted-foreground">
                  Pause non-urgent notifications during specific hours
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">Enable Quiet Hours</Label>
                <Switch
                  checked={settings.quietHours.enabled}
                  onCheckedChange={(checked) => updateSetting(['quietHours', 'enabled'], checked)}
                />
              </div>

              {settings.quietHours.enabled && (
                <div className="pl-4 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Label>Start Time</Label>
                      <input
                        type="time"
                        value={settings.quietHours.start}
                        onChange={(e) => updateSetting(['quietHours', 'start'], e.target.value)}
                        className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-background"
                      />
                    </div>
                    <div className="flex-1">
                      <Label>End Time</Label>
                      <input
                        type="time"
                        value={settings.quietHours.end}
                        onChange={(e) => updateSetting(['quietHours', 'end'], e.target.value)}
                        className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-background"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => navigate('/notifications')}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="btn-gradient-primary rounded-xl gap-2"
            >
              <Save className="h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotificationSettings;

