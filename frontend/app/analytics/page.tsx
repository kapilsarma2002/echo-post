'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  BarChart3, 
  LineChart, 
  PieChart, 
  Users, 
  TrendingUp,
  ExternalLink
} from 'lucide-react';
import { 
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { useRouter } from 'next/navigation';

const Analytics = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('engagement');

  // Sample data for charts
  const engagementData = [
    { name: 'Jan', value: 40 },
    { name: 'Feb', value: 30 },
    { name: 'Mar', value: 20 },
    { name: 'Apr', value: 27 },
    { name: 'May', value: 18 },
    { name: 'Jun', value: 23 },
    { name: 'Jul', value: 34 },
    { name: 'Aug', value: 45 },
  ];

  const followersData = [
    { name: 'Jan', facebook: 400, instagram: 240, twitter: 180, linkedin: 100 },
    { name: 'Feb', facebook: 430, instagram: 280, twitter: 190, linkedin: 110 },
    { name: 'Mar', facebook: 450, instagram: 300, twitter: 200, linkedin: 120 },
    { name: 'Apr', facebook: 470, instagram: 320, twitter: 210, linkedin: 130 },
    { name: 'May', facebook: 500, instagram: 340, twitter: 220, linkedin: 140 },
    { name: 'Jun', facebook: 520, instagram: 360, twitter: 230, linkedin: 150 },
    { name: 'Jul', facebook: 550, instagram: 380, twitter: 240, linkedin: 160 },
    { name: 'Aug', facebook: 570, instagram: 400, twitter: 250, linkedin: 170 },
  ];

  const postsData = [
    { name: 'Facebook', value: 45 },
    { name: 'Instagram', value: 30 },
    { name: 'Twitter', value: 15 },
    { name: 'LinkedIn', value: 10 },
  ];

  const COLORS = ['#3b82f6', '#ec4899', '#0ea5e9', '#64748b'];

  // Helper function to render the appropriate chart based on active tab
  const renderChart = () => {
    switch (activeTab) {
      case 'engagement':
        return (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={engagementData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        );
      case 'followers':
        return (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={followersData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="facebook" fill="#3b82f6" />
                <Bar dataKey="instagram" fill="#ec4899" />
                <Bar dataKey="twitter" fill="#0ea5e9" />
                <Bar dataKey="linkedin" fill="#64748b" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        );
      case 'posts':
        return (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={postsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {postsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-4 mb-8">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => router.push('/home')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Detailed Analytics</h1>
        </div>

        {/* Analytics Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-4 py-3 text-sm font-medium flex items-center ${activeTab === 'engagement' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('engagement')}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Engagement
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium flex items-center ${activeTab === 'followers' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('followers')}
            >
              <Users className="h-4 w-4 mr-2" />
              Followers
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium flex items-center ${activeTab === 'posts' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('posts')}
            >
              <PieChart className="h-4 w-4 mr-2" />
              Posts
            </button>
          </div>

          <div className="p-6">
            {renderChart()}
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Best Time to Post</h3>
              <LineChart className="h-5 w-5 text-indigo-600" />
            </div>
            <p className="text-gray-600 text-sm mb-2">Based on your audience activity</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Instagram</span>
                <span className="text-sm text-gray-500">9:00 AM - 11:00 AM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Facebook</span>
                <span className="text-sm text-gray-500">1:00 PM - 3:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Twitter</span>
                <span className="text-sm text-gray-500">5:00 PM - 7:00 PM</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Top Performing</h3>
              <BarChart3 className="h-5 w-5 text-pink-600" />
            </div>
            <p className="text-gray-600 text-sm mb-2">Posts with highest engagement</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium truncate w-48">Summer Collection Launch</span>
                <span className="text-sm text-green-600">+82%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium truncate w-48">Product Tutorial Video</span>
                <span className="text-sm text-green-600">+68%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium truncate w-48">Customer Testimonial</span>
                <span className="text-sm text-green-600">+45%</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Growth Trend</h3>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-gray-600 text-sm mb-2">Month over month performance</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Followers</span>
                <span className="text-sm text-green-600">+12.4%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Engagement</span>
                <span className="text-sm text-green-600">+8.7%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Post Reach</span>
                <span className="text-sm text-green-600">+15.2%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Recommendations</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-indigo-50 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-indigo-100 p-2 rounded-md">
                  <Users className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">Increase engagement on Instagram</h4>
                  <p className="mt-1 text-sm text-gray-600">Use more video content and post during peak hours for your audience.</p>
                  <Button variant="link" size="sm" className="mt-2 h-auto p-0 text-indigo-600">
                    Learn more <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-4 bg-pink-50 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-pink-100 p-2 rounded-md">
                  <LineChart className="h-5 w-5 text-pink-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">Optimize hashtag strategy</h4>
                  <p className="mt-1 text-sm text-gray-600">Your top performing hashtags are #marketing, #socialmedia, and #business.</p>
                  <Button variant="link" size="sm" className="mt-2 h-auto p-0 text-pink-600">
                    View full report <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
