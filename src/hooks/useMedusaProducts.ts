import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/medusa/products.service";
import { mapMedusaProductToUI } from "@/utils/medusaMapper";
import type { ProductUIData } from "@/types/medusa.types";

interface UseProductsOptions {
    collectionId?: string;
}

export const useMedusaProducts = (options?: UseProductsOptions) => {
    const salesChannelId = import.meta.env.VITE_MEDUSA_SALES_CHANNEL_ID;

    return useQuery<ProductUIData[], Error>({
        queryKey: ["products", options?.collectionId, salesChannelId],
        queryFn: async () => {
            const products = await fetchProducts({
                collectionId: options?.collectionId,
                salesChannelId,
            });

            // Map to UI format
            return products.map(mapMedusaProductToUI);
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    });
};
