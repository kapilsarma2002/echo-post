import { useState, useEffect } from "react";
import { Post, fetchPosts } from "@/types/post";
import { toast } from "sonner";

export const usePosts = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const posts = await fetchPosts();
      setAllPosts(posts);
    } catch {
      const errorMessage = "Failed to load posts";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const createPost = async (newPost: Post) => {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) throw new Error("Failed to create post");

      const createdPost = await response.json();
      setAllPosts((prev) => [createdPost, ...prev]);
      toast.success("Post created successfully");
    } catch (_: unknown) {
      toast.error("Failed to create post");
    }
  };

  const updatePost = async (updatedPost: Post) => {
    try {
      const response = await fetch(`/api/posts/${updatedPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      });

      if (!response.ok) throw new Error("Failed to update post");

      setAllPosts((prev) =>
        prev.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      );
      toast.success("Post updated successfully");
    } catch (_: unknown) {
      toast.error("Failed to update post");
    }
  };

  const deletePost = async (postId: number) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete post");

      setAllPosts((prev) => prev.filter((post) => post.id !== postId));
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error("Failed to delete post");
    }
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

  const handleSavePost = async (post: Post) => {
    if (editingPost) {
      await updatePost(post);
    } else {
      await createPost(post);
    }
    handleCloseDialog();
  };

  return {
    allPosts,
    editingPost,
    isDialogOpen,
    isLoading,
    createPost,
    updatePost,
    deletePost,
    handleOpenCreateDialog,
    handleOpenEditDialog,
    handleCloseDialog,
    handleSavePost,
  };
};
