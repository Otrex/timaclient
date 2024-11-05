
export interface InstagramProfileResponse {
  "Account ID": string;
  "Account Type": number;
  "Username": string;
  "Full Name": string;
  "Link in Bio": string;
  "Biography": string;
  "Category": null;
  "Followers": number;
  "Following": number;
  "Posts": number;
  "Verified": boolean;
  "Igtv Videos": number;
  "Email": null;
  "Profile Pic": string;
  "Profile Url": string;
  "Total Likes": number;
  "Total Comments": number;
  "Total Views": number;
  "Total Shares": number;
  "Average Likes": number;
  "Average Comments": number;
  "Average Views": number;
  "Average Shares": number;
  "Engagement Rate": number;
  "Estimated Reach": number;
}

export interface YoutubeChannelResponse {
  channel_id: string;
  title: string;
  description: string;
  country: string;
  subscriber_count: number;
  total_views: number;
  total_videos: number;
  total_likes: number;
  total_comments: number;
  average_likes_per_video: number;
  average_comments_per_video: number;
  average_views_per_video: number;
  engagement_rate: number;
  estimated_reach: number;
  profile_picture_url: string;
  channel_url: string;
}

export interface TiktokProfileResponse {
  user_id: string;
  unique_id: string;
  nickname: string;
  signature: string;
  avatar_url: string;
  follower_count: number;
  following_count: number;
  total_videos: number;
  total_hearts: number;
  verified: boolean;
  engagement_metrics: {
    total_likes: number;
    total_comments: number;
    total_views: number;
    total_shares: number;
    average_likes_per_video: number;
    average_comments_per_video: number;
    average_views_per_video: number;
    average_shares_per_video: number;
    engagement_rate: number;
    estimated_reach: number;
    estimated_impressions: number;
  };
}


