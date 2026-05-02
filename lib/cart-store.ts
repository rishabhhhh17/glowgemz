"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  clampDiscountForMinTotal,
  computeSystemDiscountAmount,
  findSystemDiscountCode,
} from "./discounts";

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
  discountCode: string | null;
  open: () => void;
  close: () => void;
  toggle: () => void;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (variantSku: string) => void;
  setQty: (variantSku: string, qty: number) => void;
  clear: () => void;
  applyCode: (code: string) => { ok: true } | { ok: false; error: string };
  removeCode: () => void;
  itemCount: () => number;
  subtotal: () => number;
  discount: (shippingPaise?: number) => number;
  total: (shippingPaise?: number) => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      discountCode: null,
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
      clear: () => set({ items: [], discountCode: null }),
      applyCode: (code) => {
        const found = findSystemDiscountCode(code);
        if (!found) return { ok: false, error: "Invalid code." };
        set({ discountCode: found.code });
        return { ok: true };
      },
      removeCode: () => set({ discountCode: null }),
      itemCount: () => get().items.reduce((a, i) => a + i.qty, 0),
      subtotal: () => get().items.reduce((a, i) => a + i.unitPrice * i.qty, 0),
      discount: (shippingPaise = 0) => {
        const subtotal = get().subtotal();
        const code = get().discountCode;
        if (!code || subtotal <= 0) return 0;
        const found = findSystemDiscountCode(code);
        if (!found || subtotal < found.minOrderPaise) return 0;
        const raw = computeSystemDiscountAmount(found, subtotal);
        return clampDiscountForMinTotal(subtotal, raw, shippingPaise).discount;
      },
      total: (shippingPaise = 0) => {
        const subtotal = get().subtotal();
        const discount = get().discount(shippingPaise);
        return Math.max(0, subtotal - discount + shippingPaise);
      },
    }),
    {
      name: "glowgemz-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items, discountCode: s.discountCode }),
    },
  ),
);
