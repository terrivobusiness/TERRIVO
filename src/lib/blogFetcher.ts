import type { BloggerPost } from '@/types/blog';

/**
 * Fetches blog posts directly from Blogger's public RSS feed.
 * Uses a CORS proxy to bypass browser restrictions.
 */
export const fetchBloggerPosts = async (
    blogId: string,
    maxItems = 10
): Promise<BloggerPost[]> => {
    // Blogger JSON feed URL
    const bloggerUrl = `https://www.blogger.com/feeds/${blogId}/posts/default?alt=json&max-results=${maxItems}`;

    // Use a CORS proxy to bypass browser restrictions
    const corsProxy = 'https://api.allorigins.win/raw?url=';
    const feedUrl = corsProxy + encodeURIComponent(bloggerUrl);

    try {
        const response = await fetch(feedUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch blog: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Parse Blogger's JSON feed format
        const entries = data.feed?.entry || [];

        if (entries.length === 0) {
            return [];
        }

        return entries.map((entry: any) => {
            // Extract content (prefer content over summary)
            const content = entry.content?.$t || entry.summary?.$t || '';

            // Extract author name
            const author = entry.author?.[0]?.name?.$t || 'Terrivo Team';

            // Extract published date
            const published = entry.published?.$t || new Date().toISOString();

            // Extract ID from entry.id (format: tag:blogger.com,1999:blog-BLOGID.post-POSTID)
            const id = entry.id?.$t?.split('.post-')[1] || entry.id?.$t || '';

            return {
                id,
                title: entry.title?.$t || 'Untitled',
                content,
                published,
                author,
            };
        });
    } catch (error) {
        console.error('Error fetching Blogger feed:', error);
        throw new Error(`Failed to fetch blog posts: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

// Keep the old function name for compatibility
export const fetchPrivateBloggerPosts = fetchBloggerPosts;
