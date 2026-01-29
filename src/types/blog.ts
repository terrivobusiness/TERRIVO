// src/types/blog.ts
export interface SanityPost {
    _id: string;
    title: string;
    slug: {
        current: string;
    };
    mainImage?: any;
    body: any; // Portable Text
    publishedAt: string;
    authorName?: string;
    excerpt?: string;
}
