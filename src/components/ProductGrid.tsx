import ProductCard from "./ProductCard";
import { useMedusaProducts } from "@/hooks/useMedusaProducts";
import { Loader2, AlertCircle } from "lucide-react";

const ProductGrid = () => {
  const { data: products, isLoading, error } = useMedusaProducts();

  // Loading State
  if (isLoading) {
    return (
      <section className="section-padding bg-background">
        <div className="container-brand">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Loading products...</span>
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="section-padding bg-background">
        <div className="container-brand">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <AlertCircle className="w-12 h-12 text-destructive mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Failed to Load Products
            </h3>
            <p className="text-muted-foreground mb-4">
              {error.message || "Please try again later."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Empty State
  if (!products || products.length === 0) {
    return (
      <section className="section-padding bg-background">
        <div className="container-brand">
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No products available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Success - Render Products (preserves existing UI)
  return (
    <section className="section-padding bg-background">
      <div className="container-brand">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-section mb-4">
            Our <span className="text-primary">Products</span>
          </h2>
          <p className="text-lead">
            Designed by Terrivo. Purchased where you already trust.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;

