-- =====================================================================
-- GlowGemz — Supabase schema
-- Run this in the Supabase SQL editor on a fresh project.
-- After running, also run data/supabase-seed.sql to load products.
-- =====================================================================

-- Extensions
create extension if not exists "uuid-ossp";

-- =====================================================================
-- Tables
-- =====================================================================

create table if not exists public.products (
  id              text primary key,
  slug            text unique not null,
  name            text not null,
  description     text not null,
  details         jsonb not null default '[]'::jsonb,
  category        text not null,
  metal           text not null,
  price           integer not null,           -- paise
  compare_at_price integer,
  images          jsonb not null default '[]'::jsonb,
  variants        jsonb not null default '[]'::jsonb,
  stock_count     integer not null default 0,
  is_active       boolean not null default true,
  is_featured     boolean not null default false,
  is_new          boolean not null default false,
  created_at      timestamptz not null default now()
);

create table if not exists public.inventory (
  id              uuid primary key default uuid_generate_v4(),
  product_id      text not null references public.products(id) on delete cascade,
  variant_sku     text not null,
  stock_count     integer not null default 0,
  updated_at      timestamptz not null default now(),
  unique (product_id, variant_sku)
);

create table if not exists public.orders (
  id                  uuid primary key default uuid_generate_v4(),
  customer_name       text not null,
  customer_email      text not null,
  customer_phone      text not null,
  shipping_address    jsonb not null,
  items               jsonb not null,             -- [{ product_id, variant_sku, name, qty, price_paise }]
  subtotal            integer not null,
  shipping            integer not null default 0,
  total_amount        integer not null,           -- paise
  currency            text not null default 'INR',
  payment_status      text not null default 'pending', -- pending | paid | failed | refunded
  fulfillment_status  text not null default 'unfulfilled', -- unfulfilled | fulfilled | cancelled
  razorpay_order_id   text,
  razorpay_payment_id text,
  meta_event_id       text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists orders_payment_status_idx on public.orders (payment_status);
create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists products_category_idx on public.products (category);
create index if not exists products_active_idx on public.products (is_active);

-- =====================================================================
-- Row Level Security
-- =====================================================================
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.inventory enable row level security;

-- Public can read active products only
drop policy if exists "Public reads active products" on public.products;
create policy "Public reads active products"
  on public.products for select
  using (is_active = true);

-- Inventory: read for active products via service role only (clients should not see)
drop policy if exists "Service role manages inventory" on public.inventory;
create policy "Service role manages inventory"
  on public.inventory for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- Orders: only service role (server) can read/write
drop policy if exists "Service role manages orders" on public.orders;
create policy "Service role manages orders"
  on public.orders for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- Triggers
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

drop trigger if exists inventory_set_updated_at on public.inventory;
create trigger inventory_set_updated_at
  before update on public.inventory
  for each row execute function public.set_updated_at();

-- =====================================================================
-- Atomic inventory decrement RPC (used by /api/orders on payment success)
-- =====================================================================
create or replace function public.decrement_inventory(
  p_product_id text,
  p_variant_sku text,
  p_qty integer
) returns void as $$
declare
  current_stock integer;
begin
  select stock_count into current_stock
    from public.inventory
   where product_id = p_product_id and variant_sku = p_variant_sku
   for update;

  if current_stock is null then
    raise exception 'Inventory row missing for % / %', p_product_id, p_variant_sku;
  end if;
  if current_stock < p_qty then
    raise exception 'Insufficient stock for % / % (have %, need %)',
      p_product_id, p_variant_sku, current_stock, p_qty;
  end if;

  update public.inventory
     set stock_count = stock_count - p_qty
   where product_id = p_product_id and variant_sku = p_variant_sku;
end;
$$ language plpgsql security definer;
