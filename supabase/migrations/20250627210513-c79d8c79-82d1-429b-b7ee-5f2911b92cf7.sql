
-- Disable RLS on products table since this is a public e-commerce catalog
-- Products should be manageable by admin users and viewable by everyone
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
