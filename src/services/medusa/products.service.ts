import medusaClient from "./client";
import type { MedusaProduct } from "@/types/medusa.types";

/**
 * Fetch all products from Medusa store
 * @param options - Query options (limit, offset, collection_id)
 */
export const fetchProducts = async (options?: {
    collectionId?: string;
    salesChannelId?: string;
    limit?: number;
    offset?: number;
}): Promise<MedusaProduct[]> => {
    try {
        const { products } = await medusaClient.products.list({
            limit: options?.limit || 100,
            offset: options?.offset || 0,
            collection_id: options?.collectionId ? [options.collectionId] : undefined,
            sales_channel_id: options?.salesChannelId ? [options.salesChannelId] : undefined,
            expand: "variants,variants.prices,images,collection",
        });

        return products as MedusaProduct[];
    } catch (error) {
        console.error("Failed to fetch products:", error);
        throw new Error("Unable to load products. Please try again later.");
    }
};

/**
 * Fetch single product by ID
 */
export const fetchProductById = async (
    productId: string
): Promise<MedusaProduct> => {
    try {
        const { product } = await medusaClient.products.retrieve(productId, {
            expand: "variants,variants.prices,images,collection",
        });

        return product as MedusaProduct;
    } catch (error) {
        console.error(`Failed to fetch product ${productId}:`, error);
        throw new Error("Product not found.");
    }
};

/**
 * Fetch all collections
 */
export const fetchCollections = async () => {
    try {
        const { collections } = await medusaClient.collections.list();
        return collections;
    } catch (error) {
        console.error("Failed to fetch collections:", error);
        throw new Error("Unable to load categories.");
    }
};
