import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { fetchBloggerPosts } from "@/lib/blogFetcher";
import type { BloggerPost } from "@/types/blog";

const BlogPost = () => {
    const { postId } = useParams<{ postId: string }>();
    const [post, setPost] = useState<BloggerPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const blogId = '2830692751435612787';

        fetchBloggerPosts(blogId, 50) // Fetch more posts to find the one we need
            .then(posts => {
                const foundPost = posts.find(p => p.id === postId);
                if (foundPost) {
                    setPost(foundPost);
                } else {
                    setError('Post not found');
                }
            })
            .catch(err => {
                console.error(err);
                setError(err.message || "Failed to load post");
            })
            .finally(() => setLoading(false));
    }, [postId]);

    if (loading) {
        return (
            <Layout>
                <section className="section-padding bg-background min-h-screen">
                    <div className="container-brand">
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }

    if (error || !post) {
        return (
            <Layout>
                <section className="section-padding bg-background min-h-screen">
                    <div className="container-brand">
                        <div className="text-center py-12 bg-red-50 text-red-600 rounded-lg max-w-2xl mx-auto border border-red-100">
                            <p className="font-semibold text-lg">Post not found</p>
                            <Link to="/blog" className="text-primary hover:underline mt-4 inline-block">
                                ← Back to Blog
                            </Link>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }

    return (
        <>
            <Helmet>
                <title>{post.title} - Terrivo Blog</title>
                <meta name="description" content={post.content.substring(0, 160).replace(/<[^>]*>/g, '')} />
            </Helmet>

            <Layout>
                <section className="section-padding bg-background min-h-screen">
                    <div className="container-brand">
                        <article className="max-w-4xl mx-auto">
                            <Link
                                to="/blog"
                                className="text-primary hover:underline mb-6 inline-flex items-center gap-2"
                            >
                                ← Back to Blog
                            </Link>

                            <h1 className="heading-display mt-4 mb-4">{post.title}</h1>

                            <div className="flex items-center gap-4 text-muted-foreground mb-8 pb-8 border-b border-border">
                                <span>{post.author}</span>
                                <span>•</span>
                                <time>{new Date(post.published).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</time>
                            </div>

                            <div
                                className="prose prose-lg max-w-none"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            <div className="mt-12 pt-8 border-t border-border">
                                <Link
                                    to="/blog"
                                    className="text-primary hover:underline inline-flex items-center gap-2"
                                >
                                    ← Back to all posts
                                </Link>
                            </div>
                        </article>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default BlogPost;
