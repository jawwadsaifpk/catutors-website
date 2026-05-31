// Blog posts for catutors.com — content to be written fresh.
// Add posts here as an array of BlogPost objects.

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
};

// No posts yet — add them here when ready.
export const BLOG_POSTS: BlogPost[] = [];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
