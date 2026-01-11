import type { MedusaProduct, ProductUIData } from "@/types/medusa.types";

/**
 * Transform Medusa product to UI-compatible format
 * Preserves existing ProductCard interface
 */
export const mapMedusaProductToUI = (
    product: MedusaProduct
): ProductUIData => {
    const defaultVariant = product.variants[0];
    const price = defaultVariant?.prices[0];

    return {
        id: product.id,
        name: product.title,
        price: price ? formatPrice(price.amount, price.currency_code) : "",
        image: product.thumbnail || product.images[0]?.url || "",
        description: product.description || "",

        // Extract marketplace links from metadata
        amazonLink: (product.metadata?.amazon_link as string) || "",
        flipkartLink: (product.metadata?.flipkart_link as string) || "",

        // Add Medusa-specific fields
        variantId: defaultVariant?.id,
        stock: defaultVariant?.inventory_quantity || 0,
        inStock:
            !defaultVariant?.manage_inventory ||
            defaultVariant.inventory_quantity > 0 ||
            defaultVariant.allow_backorder,

        // Map all variants
        variants: product.variants.map((v) => ({
            id: v.id,
            title: v.title,
            price: formatPrice(v.prices[0].amount, v.prices[0].currency_code),
            inStock:
                !v.manage_inventory ||
                v.inventory_quantity > 0 ||
                v.allow_backorder,
        })),
    };
};

/**
 * Format price with currency symbol
 */
export const formatPrice = (
    amount: number,
    currencyCode: string
): string => {
    const value = amount / 100; // Medusa stores prices in cents

    const formatter = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: currencyCode.toUpperCase(),
        minimumFractionDigits: 0,
    });

    return formatter.format(value);
};

/**
 * Calculate total stock across all variants
 */
export const getProductStock = (product: MedusaProduct): number => {
    return product.variants.reduce(
        (total, variant) => total + (variant.inventory_quantity || 0),
        0
    );
};
