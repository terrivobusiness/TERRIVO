// src/pages/BlogFromBlogger.tsx
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Layout from "@/components/Layout";
import { fetchBloggerPosts } from "@/lib/blogFetcher";
import type { BloggerPost } from "@/types/blog";

const BlogFromBlogger = () => {
    const [posts, setPosts] = useState<BloggerPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Your Blogger blog ID
        const blogId = '2830692751435612787';

        fetchBloggerPosts(blogId)
            .then(fetchedPosts => {
                console.log('Fetched posts:', fetchedPosts.length, fetchedPosts);
                setPosts(fetchedPosts);
            })
            .catch(err => {
                console.error(err);
                setError(err.message || "Failed to load posts");
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <Helmet>
                <title>Terrivo Blog - Latest News & Updates</title>
                <meta
                    name="description"
                    content="Read the latest news, updates, and stories from Terrivo."
                />
            </Helmet>

            <Layout>
                <section className="section-padding bg-background min-h-screen">
                    <div className="container-brand">
                        <h1 className="heading-display mb-8 text-center animate-slide-up">
                            Terrivo <span className="text-primary">Blog</span>
                        </h1>

                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                            </div>
                        ) : error ? (
                            <div className="text-center py-12 bg-red-50 text-red-600 rounded-lg max-w-2xl mx-auto border border-red-100">
                                <p className="font-semibold text-lg">Unable to load blog posts.</p>
                                <p className="text-sm mt-2">{error}</p>
                                <p className="text-xs mt-4 text-muted-foreground">
                                    Check your .env variables (BLOG_ID, API_KEY) and ensure the Netlify function is running.
                                </p>
                            </div>
                        ) : posts.length === 0 ? (
                            <div className="text-center py-20 bg-card rounded-xl border border-border max-w-2xl mx-auto shadow-sm">
                                <h3 className="text-xl font-semibold mb-2">No Drafts Found</h3>
                                <p className="text-muted-foreground">
                                    Create a <strong>Draft</strong> post in your Blogger dashboard (do not publish it) to see it appear here.
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {posts.map((p, index) => {
                                    console.log(`Rendering post ${index}:`, p.title, 'ID:', p.id);
                                    return (
                                        <article
                                            key={p.id || `post-${index}`}
                                            className="bg-card rounded-xl shadow-lg border border-border p-6 flex flex-col hover:shadow-xl transition-shadow duration-300 animate-slide-up h-full"
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            <h2 className="text-xl font-semibold mb-2 line-clamp-2">{p.title}</h2>
                                            <p className="text-sm text-primary font-medium mb-4">
                                                {new Date(p.published).toLocaleDateString()}
                                            </p>

                                            <div className="flex-1 mb-4 text-muted-foreground line-clamp-3 overflow-hidden text-sm">
                                                {(() => {
                                                    const doc = new DOMParser().parseFromString(p.content, 'text/html');
                                                    const text = doc.body.textContent || "";
                                                    return text.length > 180 ? text.substring(0, 180).trim() + '...' : text.trim();
                                                })()}
                                            </div>

                                            <Link
                                                to={`/blog/${p.id}`}
                                                className="mt-auto text-primary hover:underline font-medium inline-flex items-center gap-2"
                                            >
                                                Read more →
                                            </Link>
                                        </article>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default BlogFromBlogger;
