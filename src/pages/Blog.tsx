// src/pages/BlogFromBlogger.tsx
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { client, urlFor } from "@/lib/sanityClient";
import type { SanityPost } from "@/types/blog";

const Blog = () => {
    const [posts, setPosts] = useState<SanityPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const query = `*[_type == "post"] | order(publishedAt desc) {
            _id,
            title,
            slug,
            mainImage,
            publishedAt,
            "authorName": author,
            "excerpt": excerpt
        }`;

        client.fetch(query)
            .then(fetchedPosts => {
                setPosts(fetchedPosts);
            })
            .catch(err => {
                console.error("Sanity fetch error:", err);
                setError(err.message || "Failed to load posts");
                if (err.response) {
                    console.error("Response data:", err.response);
                }
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
                            </div>
                        ) : posts.length === 0 ? (
                            <div className="text-center py-20 bg-card rounded-xl border border-border max-w-2xl mx-auto shadow-sm">
                                <h3 className="text-xl font-semibold mb-2">No Posts Found</h3>
                                <p className="text-muted-foreground">
                                    Check your Sanity dataset.
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {posts.map((p, index) => {
                                    return (
                                        <article
                                            key={p._id}
                                            className="bg-card rounded-xl shadow-lg border border-border overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300 animate-slide-up h-full"
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            {p.mainImage && (
                                                <div className="relative aspect-video overflow-hidden">
                                                    <img
                                                        src={urlFor(p.mainImage).width(800).url()}
                                                        alt={p.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-6 flex flex-col flex-1">
                                                <h2 className="text-xl font-semibold mb-2 line-clamp-2">{p.title}</h2>
                                                <p className="text-sm text-primary font-medium mb-4">
                                                    {new Date(p.publishedAt).toLocaleDateString()}
                                                </p>

                                                <div className="flex-1 mb-4 text-muted-foreground line-clamp-3 overflow-hidden text-sm">
                                                    {p.excerpt ? (p.excerpt.length > 180 ? p.excerpt.substring(0, 180) + '...' : p.excerpt) : ""}
                                                </div>

                                                <Link
                                                    to={`/blog/${p.slug.current}`}
                                                    className="mt-auto text-primary hover:underline font-medium inline-flex items-center gap-2"
                                                >
                                                    Read more →
                                                </Link>
                                            </div>
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

export default Blog;
