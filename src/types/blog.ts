// src/types/blog.ts
export interface BloggerPost {
    id: string;
    title: string;
    content: string; // HTML string from Blogger
    published: string; // ISO date string
    author: string;
}
