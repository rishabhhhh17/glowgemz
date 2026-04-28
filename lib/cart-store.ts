"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  variantSku: string;
  variantLabel: string;
  unitPrice: number; // paise
  image: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (variantSku: string) => void;
  setQty: (variantSku: string, qty: number) => void;
  clear: () => void;
  itemCount: () => number;
  subtotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      add: (item, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.variantSku === item.variantSku);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.variantSku === item.variantSku ? { ...i, qty: i.qty + qty } : i,
              ),
              isOpen: true,
            };
          }
          return { items: [...s.items, { ...item, qty }], isOpen: true };
        }),
      remove: (variantSku) =>
        set((s) => ({ items: s.items.filter((i) => i.variantSku !== variantSku) })),
      setQty: (variantSku, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.variantSku === variantSku ? { ...i, qty: Math.max(0, qty) } : i))
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [] }),
      itemCount: () => get().items.reduce((a, i) => a + i.qty, 0),
      subtotal: () => get().items.reduce((a, i) => a + i.unitPrice * i.qty, 0),
    }),
    {
      name: "glowgemz-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items }),
    },
  ),
);
