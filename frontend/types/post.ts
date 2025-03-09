
export type SocialPlatform = 'instagram' | 'facebook' | 'twitter' | 'linkedin';
export type PostStatus = 'scheduled' | 'draft' | 'published';

export interface Post {
  id: number;
  title: string;
  content?: string;
  platform: SocialPlatform;
  date: string;
  time: string;
  status: PostStatus;
  image: string | null;
}

export const initialPosts: Post[] = [
  {
    id: 1,
    title: "Summer Product Launch",
    content: "Check out our amazing new summer products! Perfect for the hot weather ahead. #SummerVibes #NewLaunch",
    platform: "instagram",
    date: "Today",
    time: "2:30 PM",
    status: "scheduled",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    title: "Weekend Sale Announcement",
    content: "🔥 WEEKEND SALE ALERT! 🔥 Get up to 50% off on selected items this weekend only! #WeekendSale #ShopNow",
    platform: "facebook",
    date: "Tomorrow",
    time: "10:00 AM",
    status: "scheduled",
    image: "https://images.unsplash.com/photo-1572584642822-6f8de0243c93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    title: "Customer Testimonial",
    content: "\"I've been using this product for a month and I'm absolutely loving it!\" - Jane D. #CustomerReview #Testimonial",
    platform: "twitter",
    date: "Jul 15",
    time: "1:15 PM",
    status: "draft",
    image: null
  },
  {
    id: 4,
    title: "New Blog Post Promotion",
    content: "Just published: '10 Tips to Boost Your Social Media Presence' - Read now on our blog! #SocialMediaTips #ContentMarketing",
    platform: "linkedin",
    date: "Jul 16",
    time: "9:00 AM",
    status: "scheduled",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];
