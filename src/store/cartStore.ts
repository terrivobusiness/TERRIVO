import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MedusaCart } from "@/types/medusa.types";

interface CartState {
    cartId: string | null;
    cart: MedusaCart | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    setCart: (cart: MedusaCart) => void;
    setCartId: (id: string) => void;
    clearCart: () => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cartId: null,
            cart: null,
            isLoading: false,
            error: null,

            setCart: (cart) => set({ cart, error: null }),
            setCartId: (id) => set({ cartId: id }),
            clearCart: () => set({ cart: null, cartId: null }),
            setLoading: (loading) => set({ isLoading: loading }),
            setError: (error) => set({ error }),
        }),
        {
            name: "terrivo-cart-storage",
            partialize: (state) => ({ cartId: state.cartId }), // Only persist cart ID
        }
    )
);
