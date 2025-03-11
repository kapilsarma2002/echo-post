import axios from 'axios';

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

export let posts: Post[], initialPosts: Post[];

export const fetchPosts = async () => {
  try {
    const response = await axios.get<Post[]>('/api/posts');
    posts.push(...response.data);

    if (response.data.length > 4) {
      initialPosts = response.data.slice(0, 4);
    } else {
      initialPosts = response.data;
    }
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }
};