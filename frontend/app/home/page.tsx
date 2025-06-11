"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Plus,
  BarChart,
  Instagram,
  Facebook,
  Twitter,
  Image,
  MessageCircle,
  CheckCircle2,
  Settings,
  MoreHorizontal,
  Search,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

// Import components
import PostItem from "@/components/post/PostItem";
import PostDialog from "@/components/post/PostDialog";
import ContentCalendar from "@/components/calendar/ContentCalendar";
import AnalyticsCard from "@/components/analytics/AnalyticsCard";
import { usePosts } from "@/hooks/usePosts";
import { NotificationsPopover } from "@/components/layout/NotificationsPopover";
import { ProfileDropdown } from "@/components/layout/ProfileDropdown";

const Home = () => {
  // All hooks must be called at the top level before any conditionals
  const { user } = useUser();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState("month");
  const [notificationsCount, setNotificationsCount] = useState(2);
  const {
    allPosts,
    editingPost,
    isDialogOpen,
    deletePost,
    handleOpenCreateDialog,
    handleOpenEditDialog,
    handleCloseDialog,
    handleSavePost,
  } = usePosts();

  // Early return after all hooks are called
  if (!user) return null;

  // Analytics data
  const analyticsData = {
    engagement: 24,
    followers: 530,
    reach: 2800,
    posts: 42,
  };

  // Button handlers
  const handleCreatePost = () => {
    toast.success("Create Post clicked", {
      description: "Opening post creation dialog",
    });
    handleOpenCreateDialog();
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("search");
    toast.info(`Searching for: ${searchQuery}`);
  };

  const handleViewAllPosts = () => {
    router.push("/posts");
  };

  const handleCalendarView = (view: string) => {
    setCalendarView(view);
    toast.info(`Calendar view changed to ${view}`);
  };

  const handleCalendarDateClick = (date: number) => {
    toast.info(`Selected date: ${date}`);
  };

  const handleDetailedAnalytics = () => {
    router.push("/analytics");
  };

  const handleQuickAction = (action: string) => {
    if (action === "Text Post" || action === "Media Upload") {
      handleOpenCreateDialog();
    } else {
      router.push("/posts");
    }
  };

  const handleConnectAccount = (platform: string) => {
    if (platform === "linkedin") {
      toast.success("Connecting to LinkedIn");
      // Simulating connection process
      setTimeout(() => {
        toast.success("LinkedIn connected successfully");
      }, 1500);
    } else {
      toast.info(`Managing ${platform} connection`);
    }
  };

  const handleManageConnections = () => {
    router.push("/connections");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => router.push("/")}
              >
                <Calendar className="h-6 w-6 text-indigo-600" />
                <span className="text-xl font-bold text-gray-900">
                  Echopost
                </span>
              </div>

              <form
                onSubmit={handleSearch}
                className="hidden md:flex bg-gray-100 rounded-md px-3 py-2 items-center space-x-2 w-64"
              >
                <Search className="h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  name="search"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-sm flex-1 text-gray-700"
                />
              </form>
            </div>

            <div className="flex items-center space-x-4">
              <NotificationsPopover
                notificationsCount={notificationsCount}
                setNotificationsCount={setNotificationsCount}
              />
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Welcome and Quick Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Hello, {user.firstName ?? ""} 👋
            </h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your posts today.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button onClick={handleCreatePost} className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Create Post
            </Button>
            <Button
              onClick={handleSettings}
              variant="outline"
              className="flex items-center"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Upcoming Posts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Posts */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">
                  Upcoming Posts
                </h2>
                <Button onClick={handleViewAllPosts} variant="ghost" size="sm">
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                {allPosts?.map((post) => (
                  <PostItem
                    key={post.id}
                    post={post}
                    onEditPost={handleOpenEditDialog}
                    onDeletePost={deletePost}
                  />
                )) || (
                  <div className="text-center py-4 text-gray-500">
                    No posts scheduled yet
                  </div>
                )}
              </div>

              <Button
                onClick={handleViewAllPosts}
                variant="outline"
                className="w-full mt-6"
              >
                View All Scheduled Posts
              </Button>
            </div>

            {/* Content Calendar */}
            <ContentCalendar
              posts={allPosts || []}
              calendarView={calendarView}
              onChangeView={handleCalendarView}
              onDateClick={handleCalendarDateClick}
            />
          </div>

          {/* Right Column - Analytics & Quick Actions */}
          <div className="space-y-6">
            {/* Analytics Summary */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                Analytics Overview
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <AnalyticsCard
                  title="Engagement"
                  value="68%"
                  change={analyticsData.engagement}
                  bgColor="bg-indigo-50"
                  progress={68}
                />

                <AnalyticsCard
                  title="Followers"
                  value={analyticsData.followers}
                  change={12}
                  bgColor="bg-pink-50"
                  progress={42}
                />

                <AnalyticsCard
                  title="Reach"
                  value={analyticsData.reach}
                  change={8}
                  bgColor="bg-blue-50"
                  progress={58}
                />

                <AnalyticsCard
                  title="Posts"
                  value={analyticsData.posts}
                  change={4}
                  bgColor="bg-green-50"
                  progress={75}
                />
              </div>

              <Button
                onClick={handleDetailedAnalytics}
                variant="outline"
                className="w-full mt-6"
              >
                <BarChart className="mr-2 h-4 w-4" />
                View Detailed Analytics
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Quick Actions
              </h2>

              <div className="space-y-3">
                <button
                  onClick={() => handleQuickAction("Text Post")}
                  className="w-full flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mr-3">
                    <MessageCircle className="h-5 w-5 text-indigo-600" />
                  </div>
                  <span className="font-medium text-gray-800">
                    Create Text Post
                  </span>
                </button>

                <button
                  onClick={() => handleQuickAction("Media Upload")}
                  className="w-full flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center mr-3">
                    <Image className="h-5 w-5 text-pink-600" />
                  </div>
                  <span className="font-medium text-gray-800">
                    Upload Media
                  </span>
                </button>

                <button
                  onClick={() => handleQuickAction("View Published")}
                  className="w-full flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">
                    View Published
                  </span>
                </button>
              </div>
            </div>

            {/* Connected Accounts */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Connected Accounts
              </h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Instagram className="h-5 w-5 text-pink-500 mr-3" />
                    <span className="text-gray-800">Instagram</span>
                  </div>
                  <span
                    onClick={() => handleConnectAccount("instagram")}
                    className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full cursor-pointer hover:bg-green-200"
                  >
                    Connected
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Facebook className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-800">Facebook</span>
                  </div>
                  <span
                    onClick={() => handleConnectAccount("facebook")}
                    className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full cursor-pointer hover:bg-green-200"
                  >
                    Connected
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Twitter className="h-5 w-5 text-blue-400 mr-3" />
                    <span className="text-gray-800">Twitter</span>
                  </div>
                  <span
                    onClick={() => handleConnectAccount("twitter")}
                    className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full cursor-pointer hover:bg-green-200"
                  >
                    Connected
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-5 h-5 flex items-center justify-center text-blue-800 mr-3 font-bold text-sm">
                      Li
                    </div>
                    <span className="text-gray-800">LinkedIn</span>
                  </div>
                  <Button
                    onClick={() => handleConnectAccount("linkedin")}
                    variant="outline"
                    size="sm"
                    className="text-xs h-7"
                  >
                    Connect
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleManageConnections}
                variant="ghost"
                className="w-full mt-4 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
              >
                Manage All Connections
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Post Dialog for creating/editing posts */}
      <PostDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSavePost}
        editingPost={editingPost}
      />
    </div>
  );
};

export default Home;
