import React, { useState } from 'react';
import {
  Save,
  Globe,
  Bell,
  Shield,
  Mail,
  CreditCard,
  Database,
  Image as ImageIcon
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/components/admin/AdminLayout';
import { useToast } from '@/hooks/use-toast';

const Settings: React.FC = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    siteName: 'ASL Market',
    siteDescription: 'Global B2B Trade Platform',
    siteEmail: 'admin@aslmarket.com',
    sitePhone: '+1-234-567-8900',
    defaultCurrency: 'USD',
    defaultLanguage: 'en',
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
    requirePhoneVerification: false,
    enableNotifications: true,
    enableAnalytics: true,
    logoUrl: '',
    faviconUrl: '',
    // Email settings
    emailProvider: 'smtp',
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: '',
    smtpPassword: '',
    smtpEncryption: 'tls',
    fromEmail: 'noreply@aslmarket.com',
    fromName: 'ASL Market',
    // Payment settings
    stripeEnabled: false,
    stripePublicKey: '',
    stripeSecretKey: '',
    paypalEnabled: false,
    paypalClientId: '',
    paypalSecret: '',
    paymentCurrency: 'USD',
    transactionFee: 2.5,
  });

  const handleSave = () => {
    toast({
      title: 'Settings saved',
      description: 'Your settings have been saved successfully.',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground mt-1">Manage platform settings and configurations</p>
          </div>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 me-2" />
            Save Changes
          </Button>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
            <TabsTrigger value="general">
              <Globe className="h-4 w-4 me-2" />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 me-2" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 me-2" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="email">
              <Mail className="h-4 w-4 me-2" />
              <span className="hidden sm:inline">Email</span>
            </TabsTrigger>
            <TabsTrigger value="payment">
              <CreditCard className="h-4 w-4 me-2" />
              <span className="hidden sm:inline">Payment</span>
            </TabsTrigger>
            <TabsTrigger value="advanced">
              <Database className="h-4 w-4 me-2" />
              <span className="hidden sm:inline">Advanced</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure basic platform settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteEmail">Site Email</Label>
                    <Input
                      id="siteEmail"
                      type="email"
                      value={settings.siteEmail}
                      onChange={(e) => setSettings({ ...settings, siteEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sitePhone">Site Phone</Label>
                    <Input
                      id="sitePhone"
                      value={settings.sitePhone}
                      onChange={(e) => setSettings({ ...settings, sitePhone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultCurrency">Default Currency</Label>
                    <Select
                      value={settings.defaultCurrency}
                      onValueChange={(value) => setSettings({ ...settings, defaultCurrency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="CNY">CNY - Chinese Yuan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultLanguage">Default Language</Label>
                    <Select
                      value={settings.defaultLanguage}
                      onValueChange={(value) => setSettings({ ...settings, defaultLanguage: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fa">فارسی (Farsi)</SelectItem>
                        <SelectItem value="ar">العربية (Arabic)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable maintenance mode to restrict access
                    </p>
                  </div>
                  <Switch
                    id="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowRegistration">Allow Registration</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow new users to register
                    </p>
                  </div>
                  <Switch
                    id="allowRegistration"
                    checked={settings.allowRegistration}
                    onCheckedChange={(checked) => setSettings({ ...settings, allowRegistration: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Logo & Branding */}
            <Card>
              <CardHeader>
                <CardTitle>Logo & Branding</CardTitle>
                <CardDescription>Upload platform logo and favicon</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="logoUrl">Logo URL</Label>
                  <Input
                    id="logoUrl"
                    value={settings.logoUrl}
                    onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                    placeholder="https://example.com/logo.png"
                  />
                  <Button variant="outline" size="sm" className="mt-2">
                    <ImageIcon className="h-4 w-4 me-2" />
                    Upload Logo
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="faviconUrl">Favicon URL</Label>
                  <Input
                    id="faviconUrl"
                    value={settings.faviconUrl}
                    onChange={(e) => setSettings({ ...settings, faviconUrl: e.target.value })}
                    placeholder="https://example.com/favicon.ico"
                  />
                  <Button variant="outline" size="sm" className="mt-2">
                    <ImageIcon className="h-4 w-4 me-2" />
                    Upload Favicon
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security and verification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="requireEmailVerification">Require Email Verification</Label>
                    <p className="text-sm text-muted-foreground">
                      Users must verify their email address
                    </p>
                  </div>
                  <Switch
                    id="requireEmailVerification"
                    checked={settings.requireEmailVerification}
                    onCheckedChange={(checked) => setSettings({ ...settings, requireEmailVerification: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="requirePhoneVerification">Require Phone Verification</Label>
                    <p className="text-sm text-muted-foreground">
                      Users must verify their phone number
                    </p>
                  </div>
                  <Switch
                    id="requirePhoneVerification"
                    checked={settings.requirePhoneVerification}
                    onCheckedChange={(checked) => setSettings({ ...settings, requirePhoneVerification: checked })}
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Password Requirements</Label>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Minimum 8 characters</p>
                    <p>• At least one uppercase letter</p>
                    <p>• At least one number</p>
                    <p>• At least one special character</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure platform notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableNotifications">Enable Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable system-wide notifications
                    </p>
                  </div>
                  <Switch
                    id="enableNotifications"
                    checked={settings.enableNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, enableNotifications: checked })}
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Notification Types</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <Label>Order Notifications</Label>
                        <p className="text-sm text-muted-foreground">Notify about new orders</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <Label>Payment Notifications</Label>
                        <p className="text-sm text-muted-foreground">Notify about payments</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <Label>Verification Notifications</Label>
                        <p className="text-sm text-muted-foreground">Notify about verifications</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Server Configuration</CardTitle>
                <CardDescription>Configure SMTP settings for sending emails</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emailProvider">Email Provider</Label>
                  <Select
                    value={settings.emailProvider}
                    onValueChange={(value) => setSettings({ ...settings, emailProvider: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smtp">SMTP</SelectItem>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                      <SelectItem value="mailgun">Mailgun</SelectItem>
                      <SelectItem value="ses">AWS SES</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpHost">SMTP Host</Label>
                    <Input
                      id="smtpHost"
                      value={settings.smtpHost}
                      onChange={(e) => setSettings({ ...settings, smtpHost: e.target.value })}
                      placeholder="smtp.gmail.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input
                      id="smtpPort"
                      value={settings.smtpPort}
                      onChange={(e) => setSettings({ ...settings, smtpPort: e.target.value })}
                      placeholder="587"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpUsername">SMTP Username</Label>
                    <Input
                      id="smtpUsername"
                      type="email"
                      value={settings.smtpUsername}
                      onChange={(e) => setSettings({ ...settings, smtpUsername: e.target.value })}
                      placeholder="your-email@gmail.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">SMTP Password</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      value={settings.smtpPassword}
                      onChange={(e) => setSettings({ ...settings, smtpPassword: e.target.value })}
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpEncryption">Encryption</Label>
                  <Select
                    value={settings.smtpEncryption}
                    onValueChange={(value) => setSettings({ ...settings, smtpEncryption: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tls">TLS</SelectItem>
                      <SelectItem value="ssl">SSL</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fromEmail">From Email</Label>
                    <Input
                      id="fromEmail"
                      type="email"
                      value={settings.fromEmail}
                      onChange={(e) => setSettings({ ...settings, fromEmail: e.target.value })}
                      placeholder="noreply@aslmarket.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fromName">From Name</Label>
                    <Input
                      id="fromName"
                      value={settings.fromName}
                      onChange={(e) => setSettings({ ...settings, fromName: e.target.value })}
                      placeholder="ASL Market"
                    />
                  </div>
                </div>
                <Button variant="outline" className="w-full sm:w-auto">
                  Test Email Connection
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Templates</CardTitle>
                <CardDescription>Manage email templates for various notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label>Available Templates</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button variant="outline" className="justify-start">
                      <Mail className="h-4 w-4 me-2" />
                      Welcome Email
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Mail className="h-4 w-4 me-2" />
                      Order Confirmation
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Mail className="h-4 w-4 me-2" />
                      Password Reset
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Mail className="h-4 w-4 me-2" />
                      Verification Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Gateways</CardTitle>
                <CardDescription>Configure payment gateway integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Stripe Configuration */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-semibold">Stripe</Label>
                      <p className="text-sm text-muted-foreground">Accept credit card payments via Stripe</p>
                    </div>
                    <Switch
                      checked={settings.stripeEnabled}
                      onCheckedChange={(checked) => setSettings({ ...settings, stripeEnabled: checked })}
                    />
                  </div>
                  {settings.stripeEnabled && (
                    <div className="space-y-4 pt-4 border-t">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="stripePublicKey">Public Key</Label>
                          <Input
                            id="stripePublicKey"
                            value={settings.stripePublicKey}
                            onChange={(e) => setSettings({ ...settings, stripePublicKey: e.target.value })}
                            placeholder="pk_test_..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="stripeSecretKey">Secret Key</Label>
                          <Input
                            id="stripeSecretKey"
                            type="password"
                            value={settings.stripeSecretKey}
                            onChange={(e) => setSettings({ ...settings, stripeSecretKey: e.target.value })}
                            placeholder="sk_test_..."
                          />
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Test Connection
                      </Button>
                    </div>
                  )}
                </div>

                {/* PayPal Configuration */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-semibold">PayPal</Label>
                      <p className="text-sm text-muted-foreground">Accept payments via PayPal</p>
                    </div>
                    <Switch
                      checked={settings.paypalEnabled}
                      onCheckedChange={(checked) => setSettings({ ...settings, paypalEnabled: checked })}
                    />
                  </div>
                  {settings.paypalEnabled && (
                    <div className="space-y-4 pt-4 border-t">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="paypalClientId">Client ID</Label>
                          <Input
                            id="paypalClientId"
                            value={settings.paypalClientId}
                            onChange={(e) => setSettings({ ...settings, paypalClientId: e.target.value })}
                            placeholder="PayPal Client ID"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="paypalSecret">Secret</Label>
                          <Input
                            id="paypalSecret"
                            type="password"
                            value={settings.paypalSecret}
                            onChange={(e) => setSettings({ ...settings, paypalSecret: e.target.value })}
                            placeholder="PayPal Secret"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="paypalMode">Mode</Label>
                        <Select defaultValue="sandbox">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sandbox">Sandbox (Testing)</SelectItem>
                            <SelectItem value="live">Live (Production)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button variant="outline" size="sm">
                        Test Connection
                      </Button>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Payment Settings */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentCurrency">Payment Currency</Label>
                    <Select
                      value={settings.paymentCurrency}
                      onValueChange={(value) => setSettings({ ...settings, paymentCurrency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="CNY">CNY - Chinese Yuan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transactionFee">Transaction Fee (%)</Label>
                    <Input
                      id="transactionFee"
                      type="number"
                      step="0.1"
                      value={settings.transactionFee}
                      onChange={(e) => setSettings({ ...settings, transactionFee: parseFloat(e.target.value) || 0 })}
                      placeholder="2.5"
                    />
                    <p className="text-sm text-muted-foreground">
                      Percentage fee charged on each transaction
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Tracking</CardTitle>
                <CardDescription>Configure analytics and tracking services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableAnalytics">Enable Analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Track user behavior and platform usage
                    </p>
                  </div>
                  <Switch
                    id="enableAnalytics"
                    checked={settings.enableAnalytics}
                    onCheckedChange={(checked) => setSettings({ ...settings, enableAnalytics: checked })}
                  />
                </div>
                {settings.enableAnalytics && (
                  <div className="space-y-4 pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                      <Input
                        id="googleAnalyticsId"
                        placeholder="G-XXXXXXXXXX"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="facebookPixelId">Facebook Pixel ID</Label>
                      <Input
                        id="facebookPixelId"
                        placeholder="123456789012345"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
                <CardDescription>Manage API keys and integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="apiKey"
                      type="password"
                      value="sk_live_••••••••••••••••"
                      readOnly
                      className="font-mono"
                    />
                    <Button variant="outline" size="sm">
                      Regenerate
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Keep your API key secure and never share it publicly
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>API Rate Limits</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Requests per minute</Label>
                      <div className="text-lg font-semibold">1000</div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Requests per hour</Label>
                      <div className="text-lg font-semibold">50,000</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cache & Performance</CardTitle>
                <CardDescription>Optimize platform performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Caching</Label>
                    <p className="text-sm text-muted-foreground">
                      Cache static content for better performance
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cacheDuration">Cache Duration (seconds)</Label>
                  <Input
                    id="cacheDuration"
                    type="number"
                    defaultValue="3600"
                    placeholder="3600"
                  />
                </div>
                <Button variant="outline" className="w-full sm:w-auto">
                  Clear Cache
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
                <CardDescription>Platform version and system details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Platform Version</span>
                    <span className="text-sm font-medium">v1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Updated</span>
                    <span className="text-sm font-medium">2024-02-20</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Database Size</span>
                    <span className="text-sm font-medium">2.5 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Users</span>
                    <span className="text-sm font-medium">45,678</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;
