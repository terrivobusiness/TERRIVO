import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { Calendar, User, ArrowRight } from "lucide-react";

const Blog = () => {
    const blogPosts = [
        {
            id: 1,
            title: "5 Ways Cotton Storage Solutions Protect Your Precious Textiles",
            excerpt: "Discover how breathable cotton storage can extend the life of your garments and prevent common issues like moisture damage and odor buildup.",
            author: "Terrivo Team",
            date: "January 8, 2026",
            image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&auto=format&fit=crop",
            category: "Storage Tips"
        },
        {
            id: 2,
            title: "The Environmental Impact of Plastic Storage: Why Cotton is the Future",
            excerpt: "Learn about the environmental benefits of switching from plastic to cotton storage solutions for a more sustainable home.",
            author: "Terrivo Team",
            date: "January 5, 2026",
            image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop",
            category: "Sustainability"
        },
        {
            id: 3,
            title: "How to Organize Your Wardrobe Like a Pro",
            excerpt: "Expert tips and tricks for creating a clutter-free, organized closet that makes getting ready a breeze.",
            author: "Terrivo Team",
            date: "January 2, 2026",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
            category: "Organization"
        },
        {
            id: 4,
            title: "Understanding Your Terrivo Warranty: A Complete Guide",
            excerpt: "Everything you need to know about your 6-month warranty coverage, registration process, and how to make a claim.",
            author: "Terrivo Team",
            date: "December 28, 2025",
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop",
            category: "Product Guide"
        },
        {
            id: 5,
            title: "Seasonal Storage: Preparing Your Clothes for Long-Term Care",
            excerpt: "Proper storage techniques for seasonal clothing rotation to keep your garments fresh and damage-free year-round.",
            author: "Terrivo Team",
            date: "December 25, 2025",
            image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop",
            category: "Storage Tips"
        },
        {
            id: 6,
            title: "Why Premium Quality Matters in Storage Solutions",
            excerpt: "Explore the difference between cheap plastic storage and premium cotton canvas solutions for long-term value.",
            author: "Terrivo Team",
            date: "December 20, 2025",
            image: "https://images.unsplash.com/photo-1487700160041-babef9c3cb55?w=800&auto=format&fit=crop",
            category: "Product Guide"
        }
    ];

    return (
        <>
            <Helmet>
                <title>Blog | Terrivo - Storage Tips & Sustainability Insights</title>
                <meta
                    name="description"
                    content="Explore our blog for expert tips on cotton storage solutions, sustainable living, wardrobe organization, and care guides for your Terrivo products."
                />
                <link rel="canonical" href="https://terrivo.com/blog" />
            </Helmet>

            <Layout>
                {/* Hero Section */}
                <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-secondary/5">
                    <div className="container-brand">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                                <span className="text-sm font-medium text-primary">Latest Updates</span>
                            </div>
                            <h1 className="heading-display mb-4">
                                The <span className="text-primary">Terrivo</span> Blogs
                            </h1>
                            <p className="text-lead">
                                Expert insights on sustainable storage, organization tips, and caring for your precious textiles.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Blog Posts Grid */}
                <section className="section-padding">
                    <div className="container-brand">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogPosts.map((post) => (
                                <article
                                    key={post.id}
                                    className="group bg-card rounded-2xl border border-border overflow-hidden shadow-brand-sm hover:shadow-brand-md transition-all duration-300"
                                >
                                    {/* Image */}
                                    <div className="relative overflow-hidden aspect-[16/10]">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Meta */}
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{post.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <User className="w-4 h-4" />
                                                <span>{post.author}</span>
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h2>

                                        {/* Excerpt */}
                                        <p className="text-muted-foreground mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        {/* Read More Link */}
                                        <button className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                                            Read More
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
                    <div className="container-brand">
                        <div className="max-w-3xl mx-auto text-center bg-card rounded-2xl border border-border p-8 md:p-12 shadow-brand-lg">
                            <h2 className="text-3xl font-bold text-foreground mb-4">
                                Stay Updated with Our Latest Posts
                            </h2>
                            <p className="text-muted-foreground mb-6">
                                Get expert tips on storage solutions, sustainable living, and product care delivered to your inbox.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap">
                                    Subscribe
                                </button>
                            </div>
                            <p className="text-sm text-muted-foreground mt-4">
                                We respect your privacy. Unsubscribe at any time.
                            </p>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default Blog;
