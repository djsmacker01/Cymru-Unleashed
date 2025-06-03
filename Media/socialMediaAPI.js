// Social Media API Integration
class SocialMediaAPI {
  constructor() {
    // API Keys and credentials should be stored in environment variables
    this.instagramToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    this.twitterBearerToken = process.env.TWITTER_BEARER_TOKEN;
    this.tiktokAccessToken = process.env.TIKTOK_ACCESS_TOKEN;
  }

  // Instagram API Integration
  async fetchInstagramPosts() {
    try {
      const response = await fetch(
        `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${this.instagramToken}`
      );
      const data = await response.json();
      
      return data.data.map(post => ({
        image: post.media_url,
        avatar: post.thumbnail_url,
        username: post.username,
        timeAgo: this.getTimeAgo(post.timestamp),
        content: post.caption,
        likes: post.like_count || 0,
        comments: post.comments_count || 0,
        link: post.permalink
      }));
    } catch (error) {
      console.error('Error fetching Instagram posts:', error);
      return [];
    }
  }

  // Twitter API Integration
  async fetchTwitterPosts() {
    try {
      const response = await fetch(
        'https://api.twitter.com/2/users/me/tweets?tweet.fields=created_at,public_metrics&expansions=attachments.media_keys&media.fields=url',
        {
          headers: {
            'Authorization': `Bearer ${this.twitterBearerToken}`
          }
        }
      );
      const data = await response.json();
      
      return data.data.map(tweet => ({
        avatar: tweet.author.profile_image_url,
        username: tweet.author.username,
        timeAgo: this.getTimeAgo(tweet.created_at),
        content: tweet.text,
        retweets: tweet.public_metrics.retweet_count,
        likes: tweet.public_metrics.like_count,
        link: `https://twitter.com/${tweet.author.username}/status/${tweet.id}`
      }));
    } catch (error) {
      console.error('Error fetching Twitter posts:', error);
      return [];
    }
  }

  // TikTok API Integration
  async fetchTikTokPosts() {
    try {
      const response = await fetch(
        'https://open.tiktokapis.com/v2/user/posts/',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.tiktokAccessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fields: ['id', 'create_time', 'cover_image_url', 'video_description', 'statistics']
          })
        }
      );
      const data = await response.json();
      
      return data.data.map(video => ({
        image: video.cover_image_url,
        avatar: video.author.avatar_url,
        username: video.author.username,
        timeAgo: this.getTimeAgo(video.create_time),
        content: video.video_description,
        likes: video.statistics.like_count,
        comments: video.statistics.comment_count,
        link: `https://www.tiktok.com/@${video.author.username}/video/${video.id}`
      }));
    } catch (error) {
      console.error('Error fetching TikTok posts:', error);
      return [];
    }
  }

  // Helper function to convert timestamps to "time ago" format
  getTimeAgo(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval} years ago`;
    if (interval === 1) return '1 year ago';
    
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;
    if (interval === 1) return '1 month ago';
    
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;
    if (interval === 1) return '1 day ago';
    
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;
    if (interval === 1) return '1 hour ago';
    
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;
    if (interval === 1) return '1 minute ago';
    
    return 'just now';
  }
}

// Export the API class
export default SocialMediaAPI; 