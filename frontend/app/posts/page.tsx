'use client' 

import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from 'lucide-react';
import { usePosts } from '@/hooks/usePosts';
import PostItem from '@/components/post/PostItem';
import PostDialog from '@/components/post/PostDialog';
import { useRouter } from 'next/navigation';

const PostsList = () => {
  const router = useRouter();
  const {
    allPosts,
    editingPost,
    isDialogOpen,
    deletePost,
    handleOpenCreateDialog,
    handleOpenEditDialog,
    handleCloseDialog,
    handleSavePost
  } = usePosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => router.push('/home')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">All Scheduled Posts</h1>
          </div>
          <Button onClick={handleOpenCreateDialog} className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Create Post
          </Button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="space-y-4">
            {allPosts.length > 0 ? (
              allPosts.map(post => (
                <PostItem 
                  key={post.id} 
                  post={post} 
                  onEditPost={handleOpenEditDialog}
                  onDeletePost={deletePost}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No posts available</p>
                <Button 
                  onClick={handleOpenCreateDialog} 
                  variant="outline" 
                  className="mt-4"
                >
                  Create your first post
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

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

export default PostsList;
