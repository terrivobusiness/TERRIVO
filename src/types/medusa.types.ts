// Medusa Product Schema
export interface MedusaProduct {
    id: string;
    title: string;
    handle: string;
    description: string | null;
    thumbnail: string | null;
    images: Array<{ id: string; url: string }>;
    variants: MedusaVariant[];
    collection_id: string | null;
    collection?: MedusaCollection;
    metadata: Record<string, any> | null;
}

export interface MedusaVariant {
    id: string;
    title: string;
    product_id: string;
    sku: string | null;
    prices: Array<{
        id: string;
        amount: number;
        currency_code: string;
    }>;
    inventory_quantity: number;
    allow_backorder: boolean;
    manage_inventory: boolean;
    metadata: Record<string, any> | null;
}

export interface MedusaCollection {
    id: string;
    title: string;
    handle: string;
    metadata: Record<string, any> | null;
}

// UI-Compatible Product Type (matches existing ProductCard)
export interface ProductUIData {
    id: string;
    name: string;
    price: string;
    image: string;
    description: string;
    amazonLink: string;
    flipkartLink: string;
    // New Medusa fields
    variantId?: string;
    stock?: number;
    inStock?: boolean;
    variants?: Array<{
        id: string;
        title: string;
        price: string;
        inStock: boolean;
    }>;
}

// Cart Types
export interface MedusaCart {
    id: string;
    items: MedusaLineItem[];
    subtotal: number;
    total: number;
    currency_code: string;
}

export interface MedusaLineItem {
    id: string;
    title: string;
    variant_id: string;
    quantity: number;
    unit_price: number;
    total: number;
    thumbnail: string | null;
}
