-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Table: profiles (Extends auth.users)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  role text default 'user', -- 'super_admin', 'reseller', 'user'
  company_name text,
  contact_number text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) for Profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Table: reseller_documents
create table public.reseller_documents (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  document_type text not null, -- 'aadhar', 'pan', 'cheque', 'photo', 'agreement'
  file_path text not null,
  status text default 'pending', -- 'pending', 'verified', 'rejected'
  uploaded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Documents
alter table public.reseller_documents enable row level security;

create policy "Users can upload their own documents."
  on reseller_documents for insert
  with check ( auth.uid() = user_id );

create policy "Users can view their own documents."
  on reseller_documents for select
  using ( auth.uid() = user_id );
  
create policy "Super Admins can view all documents."
  on reseller_documents for select
  using ( 
    exists (
      select 1 from profiles 
      where id = auth.uid() and role = 'super_admin'
    )
  );

-- Storage Buckets Setup (Run this in Supabase Storage UI or via API)
-- Bucket Name: 'reseller-docs'
-- Policy: Authenticated users can upload; Public/Auth read access based on need.

-- Table: licenses
create table public.licenses (
  id uuid default uuid_generate_v4() primary key,
  license_key text unique not null,
  client_name text not null,
  client_email text,
  license_type text not null, -- 'ERP', 'CRM', 'HRMS', 'Full Suite'
  issued_by uuid references public.profiles(id),
  issued_at timestamp with time zone default timezone('utc'::text, now()) not null,
  valid_until timestamp with time zone not null,
  status text default 'active', -- 'active', 'expired', 'revoked'
  max_users integer default 10,
  notes text
);

-- RLS for Licenses
alter table public.licenses enable row level security;

create policy "Super Admins can manage all licenses."
  on licenses for all
  using ( 
    exists (
      select 1 from profiles 
      where id = auth.uid() and role = 'super_admin'
    )
  );

create policy "Resellers can view their assigned licenses."
  on licenses for select
  using ( 
    exists (
      select 1 from profiles 
      where id = auth.uid() and role = 'reseller'
    )
  );

-- Table: commissions
create table public.commissions (
  id uuid default uuid_generate_v4() primary key,
  reseller_id uuid references public.profiles(id) not null,
  license_id uuid references public.licenses(id) not null,
  amount numeric not null,
  paid_at timestamp with time zone,
  status text default 'pending', -- 'pending', 'paid', 'cancelled'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Commissions
alter table public.commissions enable row level security;

create policy "Super Admins can manage all commissions."
  on commissions for all
  using ( 
    exists (
      select 1 from profiles 
      where id = auth.uid() and role = 'super_admin'
    )
  );

create policy "Resellers can view their own commissions."
  on commissions for select
  using ( 
    reseller_id = auth.uid()
  );
