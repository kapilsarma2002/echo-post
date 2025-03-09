'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Bell, Globe, Shield, Moon, Sun, Smartphone } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

const Settings = () => {
  const router = useRouter()
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    autoPublish: true,
    twoFactorAuth: false,
    mobilePreview: true
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => {
      const newSettings = { ...prev, [setting]: !prev[setting] };
      
      // Show toast with appropriate message
      const displayName = {
        emailNotifications: "Email notifications",
        pushNotifications: "Push notifications",
        darkMode: "Dark mode",
        autoPublish: "Auto-publish",
        twoFactorAuth: "Two-factor authentication",
        mobilePreview: "Mobile preview"
      }[setting];
      
      toast.success(`${displayName} ${newSettings[setting] ? 'enabled' : 'disabled'}`);
      
      return newSettings;
    });
  };

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-8">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => router.push('/home')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid md:grid-cols-[240px_1fr] divide-x divide-gray-100">
            {/* Sidebar */}
            <div className="p-6 space-y-1 border-b md:border-b-0">
              <Button variant="ghost" className="w-full justify-start" onClick={() => {}}>
                <User className="mr-2 h-4 w-4" />
                Account
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => {}}>
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => {}}>
                <Globe className="mr-2 h-4 w-4" />
                Publishing
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => {}}>
                <Shield className="mr-2 h-4 w-4" />
                Security
              </Button>
            </div>

            {/* Main content */}
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">General Settings</h2>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Appearance</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {settings.darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                    </div>
                    <Switch 
                      id="dark-mode" 
                      checked={settings.darkMode} 
                      onCheckedChange={() => handleToggle('darkMode')} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-4 w-4" />
                      <Label htmlFor="mobile-preview">Mobile Preview</Label>
                    </div>
                    <Switch 
                      id="mobile-preview" 
                      checked={settings.mobilePreview} 
                      onCheckedChange={() => handleToggle('mobilePreview')} 
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Notifications</h3>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <Switch 
                      id="email-notifications" 
                      checked={settings.emailNotifications} 
                      onCheckedChange={() => handleToggle('emailNotifications')} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <Switch 
                      id="push-notifications" 
                      checked={settings.pushNotifications} 
                      onCheckedChange={() => handleToggle('pushNotifications')} 
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Publishing</h3>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-publish">Auto-publish Scheduled Posts</Label>
                    <Switch 
                      id="auto-publish" 
                      checked={settings.autoPublish} 
                      onCheckedChange={() => handleToggle('autoPublish')} 
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Security</h3>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <Switch 
                      id="two-factor" 
                      checked={settings.twoFactorAuth} 
                      onCheckedChange={() => handleToggle('twoFactorAuth')} 
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleSaveSettings}>Save Changes</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
