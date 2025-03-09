'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Camera, Mail, Phone, User } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useRouter } from 'next/router';

const Profile = () => {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: 'Jessica Smith',
    email: 'jessica@postplanner.com',
    phone: '+1 (555) 123-4567',
    role: 'Marketing Manager',
    company: 'Acme Inc.',
    bio: 'Marketing professional with 5+ years of experience in social media management and content creation.',
    profileImage: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfile(prev => ({ ...prev, profileImage: file }));
      toast.success("Profile image uploaded");
    }
  };

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully");
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
          <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
            {/* Profile Image */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className="h-40 w-40 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {profile.profileImage ? (
                    <img 
                      src={URL.createObjectURL(profile.profileImage)} 
                      alt="Profile" 
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <User className="h-16 w-16 text-indigo-500" />
                  )}
                  <label 
                    htmlFor="profile-image"
                    className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow cursor-pointer"
                  >
                    <Camera className="h-5 w-5 text-gray-600" />
                  </label>
                  <input 
                    type="file" 
                    id="profile-image" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                </div>
                <h3 className="font-medium text-lg">{profile.name}</h3>
                <p className="text-gray-500">{profile.role}</p>
              </div>
            </div>

            {/* Profile Form */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={profile.name} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Job Title</Label>
                  <Input 
                    id="role" 
                    name="role" 
                    value={profile.role} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex">
                    <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-l-md border border-r-0 border-input">
                      <Mail className="h-4 w-4 text-gray-500" />
                    </div>
                    <Input 
                      id="email" 
                      name="email" 
                      value={profile.email} 
                      onChange={handleInputChange} 
                      className="rounded-l-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="flex">
                    <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-l-md border border-r-0 border-input">
                      <Phone className="h-4 w-4 text-gray-500" />
                    </div>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={profile.phone} 
                      onChange={handleInputChange} 
                      className="rounded-l-none"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input 
                  id="company" 
                  name="company" 
                  value={profile.company} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea 
                  id="bio" 
                  name="bio" 
                  value={profile.bio} 
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))} 
                  className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md"
                ></textarea>
              </div>

              <div className="pt-4 flex space-x-4">
                <Button onClick={handleSaveProfile}>Save Changes</Button>
                <Button variant="outline" onClick={() => router.push('/home')}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
