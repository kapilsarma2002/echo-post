import axios from "axios";

export type SocialPlatform = "instagram" | "facebook" | "twitter" | "linkedin";
export type PostStatus = "scheduled" | "draft" | "published";

export interface Post {
  id: number;
  title: string;
  content?: string;
  platform: SocialPlatform;
  date: string;
  time: string;
  status: PostStatus;
  image: string | null;
  scheduledAt?: Date;
}

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await axios.get<Post[]>("/api/posts");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
};
