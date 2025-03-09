
import React from 'react';
import PostDialog from '@/components/post/PostDialog';
import { usePosts } from '@/hooks/usePosts';
import { Post } from '@/types/post';
import { useRouter } from 'next/router';

const CreatePost = () => {
  const router = useRouter();
  const { handleSavePost } = usePosts();
  
  const handleSave = (post: Post) => {
    handleSavePost(post);
    router.push('/home');
  };
  
  const handleClose = () => {
    router.push('/home');
  };
  
  return (
    <PostDialog
      isOpen={true}
      onClose={handleClose}
      onSave={handleSave}
      editingPost={null}
    />
  );
};

export default CreatePost;