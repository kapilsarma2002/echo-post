
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Post, SocialPlatform, PostStatus } from "@/types/post";
import { Calendar as CalendarIcon, Image as ImageIcon, Clock as ClockIcon, Facebook, Instagram, Twitter } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface PostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: Post) => void;
  editingPost: Post | null;
}

const initialNewPost: Post = {
  id: 0,
  title: "",
  content: "",
  platform: "instagram",
  date: format(new Date(), "MMM dd"),
  time: format(new Date(), "h:mm a"),
  status: "draft",
  image: null
};

const PostDialog = ({ isOpen, onClose, onSave, editingPost }: PostDialogProps) => {
  const [post, setPost] = useState<Post>(editingPost || initialNewPost);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [previewImage, setPreviewImage] = useState<string | null>(post.image);

  React.useEffect(() => {
    if (editingPost) {
      setPost(editingPost);
      setPreviewImage(editingPost.image);
    } else {
      setPost(initialNewPost);
      setPreviewImage(null);
    }
  }, [editingPost, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const handlePlatformChange = (platform: SocialPlatform) => {
    setPost(prev => ({ ...prev, platform }));
  };

  const handleStatusChange = (status: PostStatus) => {
    setPost(prev => ({ ...prev, status }));
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setPost(prev => ({
        ...prev,
        date: format(selectedDate, "MMM dd")
      }));
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost(prev => ({ ...prev, time: e.target.value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setPost(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!post.title.trim()) {
      toast.error("Please add a title for your post");
      return;
    }
    
    const updatedPost: Post = {
      ...post,
      id: editingPost ? editingPost.id : Date.now(),
    };
    
    onSave(updatedPost);
    toast.success(editingPost ? "Post updated successfully" : "Post created successfully");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingPost ? "Edit Post" : "Create New Post"}</DialogTitle>
          <DialogDescription>
            {editingPost ? "Make changes to your post here" : "Fill in the details for your new social media post"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-3">
            <Label htmlFor="title">Post Title</Label>
            <Input
              id="title"
              name="title"
              value={post.title}
              onChange={handleInputChange}
              placeholder="Enter post title"
            />
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <Label htmlFor="content">Post Content</Label>
            <Textarea
              id="content"
              name="content"
              value={post.content || ""}
              onChange={handleInputChange}
              placeholder="Enter post content"
              rows={5}
            />
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <Label>Platform</Label>
            <div className="flex space-x-3">
              <Button
                type="button"
                variant={post.platform === "instagram" ? "default" : "outline"}
                onClick={() => handlePlatformChange("instagram")}
                className="flex-1"
              >
                <Instagram className="mr-2 h-4 w-4" />
                Instagram
              </Button>
              <Button
                type="button"
                variant={post.platform === "facebook" ? "default" : "outline"}
                onClick={() => handlePlatformChange("facebook")}
                className="flex-1"
              >
                <Facebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
              <Button
                type="button"
                variant={post.platform === "twitter" ? "default" : "outline"}
                onClick={() => handlePlatformChange("twitter")}
                className="flex-1"
              >
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>
              <Button
                type="button"
                variant={post.platform === "linkedin" ? "default" : "outline"}
                onClick={() => handlePlatformChange("linkedin")}
                className="flex-1"
              >
                <span className="mr-2 text-xs font-bold">Li</span>
                LinkedIn
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Post Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal mt-1",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label htmlFor="time">Post Time</Label>
              <div className="flex mt-1">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <ClockIcon className="h-4 w-4" />
                </span>
                <Input
                  id="time"
                  type="time"
                  name="time"
                  value={post.time}
                  onChange={handleTimeChange}
                  className="rounded-l-none"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <Label>Post Status</Label>
            <div className="flex space-x-3">
              <Button
                type="button"
                variant={post.status === "draft" ? "default" : "outline"}
                onClick={() => handleStatusChange("draft")}
                className="flex-1"
              >
                Draft
              </Button>
              <Button
                type="button"
                variant={post.status === "scheduled" ? "default" : "outline"}
                onClick={() => handleStatusChange("scheduled")}
                className="flex-1"
              >
                Scheduled
              </Button>
              <Button
                type="button"
                variant={post.status === "published" ? "default" : "outline"}
                onClick={() => handleStatusChange("published")}
                className="flex-1"
              >
                Published
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <Label htmlFor="image">Image (Optional)</Label>
            <div className="mt-1 flex items-center">
              <label
                htmlFor="image-upload"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                {previewImage ? "Change Image" : "Upload Image"}
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {previewImage && (
                <Button
                  type="button"
                  variant="ghost"
                  className="ml-2 text-red-500"
                  onClick={() => {
                    setPreviewImage(null);
                    setPost(prev => ({ ...prev, image: null }));
                  }}
                >
                  Remove
                </Button>
              )}
            </div>
            
            {previewImage && (
              <div className="mt-2 relative rounded-md overflow-hidden w-full h-48">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            {editingPost ? "Update" : "Create"} Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostDialog;
