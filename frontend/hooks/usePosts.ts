
import { useState } from 'react';
import { Post, initialPosts } from '@/types/post';
import { toast } from 'sonner';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const createPost = (newPost: Post) => {
    setPosts(prev => [
      {
        ...newPost,
        id: prev.length > 0 ? Math.max(...prev.map(p => p.id)) + 1 : 1
      },
      ...prev
    ]);
  };

  const updatePost = (updatedPost: Post) => {
    setPosts(prev => prev.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ));
  };

  const deletePost = (postId: number) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
    toast.success("Post deleted successfully");
  };

  const handleOpenCreateDialog = () => {
    setEditingPost(null);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (post: Post) => {
    setEditingPost(post);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingPost(null);
  };

  const handleSavePost = (post: Post) => {
    if (editingPost) {
      updatePost(post);
    } else {
      createPost(post);
    }
  };

  return {
    posts,
    editingPost,
    isDialogOpen,
    createPost,
    updatePost,
    deletePost,
    handleOpenCreateDialog,
    handleOpenEditDialog,
    handleCloseDialog,
    handleSavePost
  };
};
