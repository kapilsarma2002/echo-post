
import React from 'react';
import { MoreHorizontal, Instagram, Facebook, Twitter, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Post } from "@/types/post";

interface PostItemProps {
  post: Post;
  onEditPost: (post: Post) => void;
  onDeletePost: (postId: number) => void;
}

const PostItem = ({ post, onEditPost, onDeletePost }: PostItemProps) => {
  const handlePostOptions = (e: React.MouseEvent, postId: number) => {
    e.stopPropagation();
    
    const options = [
      { label: 'Edit', action: () => onEditPost(post) },
      { label: 'Delete', action: () => onDeletePost(postId) },
      { label: 'Duplicate', action: () => toast.info(`Duplicating post #${postId}`) },
      { label: 'Share', action: () => toast.info(`Sharing post #${postId}`) },
    ];
    
    const actionsMenu = document.createElement('div');
    actionsMenu.className = 'absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-200';
    actionsMenu.style.top = '30px';
    
    options.forEach(option => {
      const button = document.createElement('button');
      button.className = 'block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100';
      button.textContent = option.label;
      button.onclick = () => {
        option.action();
        document.body.removeChild(actionsMenu);
      };
      actionsMenu.appendChild(button);
    });
    
    // Position the menu
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    actionsMenu.style.position = 'fixed';
    actionsMenu.style.left = `${rect.left}px`;
    actionsMenu.style.top = `${rect.bottom}px`;
    
    // Add click outside handler
    const closeMenu = (e: MouseEvent) => {
      if (!actionsMenu.contains(e.target as Node)) {
        document.body.removeChild(actionsMenu);
        document.removeEventListener('click', closeMenu);
      }
    };
    
    document.addEventListener('click', closeMenu);
    document.body.appendChild(actionsMenu);
  };

  const PlatformIcon = () => {
    switch (post.platform) {
      case 'instagram':
        return <Instagram className="h-4 w-4 text-pink-500" />;
      case 'facebook':
        return <Facebook className="h-4 w-4 text-blue-600" />;
      case 'twitter':
        return <Twitter className="h-4 w-4 text-blue-400" />;
      case 'linkedin':
        return <div className="text-xs font-bold text-blue-800">Li</div>;
      default:
        return null;
    }
  };

  return (
    <div 
      className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={() => onEditPost(post)}
    >
      <div className={`w-1.5 h-14 rounded-full ${
        post.platform === 'instagram' ? 'bg-pink-500' : 
        post.platform === 'facebook' ? 'bg-blue-600' : 
        post.platform === 'twitter' ? 'bg-blue-400' :
        'bg-blue-800'
      } mr-4`}></div>
      
      <div className="flex-1">
        <div className="flex justify-between">
          <span className="font-medium text-gray-900">{post.title}</span>
          <div className="flex items-center space-x-2">
            <PlatformIcon />
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <Clock className="h-3 w-3 mr-1" />
          <span>{post.date}, {post.time}</span>
          {post.status === 'scheduled' ? (
            <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">Scheduled</span>
          ) : (
            <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded-full">Draft</span>
          )}
        </div>
      </div>
      
      {post.image && (
        <div className="h-14 w-14 rounded-md overflow-hidden bg-gray-100 ml-2">
          <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
        </div>
      )}
      
      <button 
        onClick={(e) => handlePostOptions(e, post.id)}
        className="ml-3 p-2 text-gray-400 hover:text-gray-800 rounded-full hover:bg-gray-100"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
  );
};

export default PostItem;
