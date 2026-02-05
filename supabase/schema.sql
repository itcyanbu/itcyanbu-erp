-- Supabase Database Schema for ITC Contacts Clone
-- Run this in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =============================================
-- CONTACTS TABLE
-- =============================================
create table if not exists public.contacts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  
  -- Basic Info
  name text not null,
  first_name text,
  last_name text,
  email text,
  phone text,
  
  -- Contact Details
  contact_type text default 'Lead',
  tags text[] default '{}',
  initials text,
  avatar_color text,
  time_zone text,
  dnd_all_channels boolean default false,
  
  -- Custom Fields (JSON for flexibility)
  custom_fields jsonb default '{}'::jsonb,
  
  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security for contacts
alter table public.contacts enable row level security;

create policy "Users can view own contacts"
  on public.contacts for select
  using (auth.uid() = user_id);

create policy "Users can insert own contacts"
  on public.contacts for insert
  with check (auth.uid() = user_id);

create policy "Users can update own contacts"
  on public.contacts for update
  using (auth.uid() = user_id);

create policy "Users can delete own contacts"
  on public.contacts for delete
  using (auth.uid() = user_id);

-- Index for faster queries
create index if not exists contacts_user_id_idx on public.contacts(user_id);
create index if not exists contacts_email_idx on public.contacts(email);

-- =============================================
-- CONVERSATIONS TABLE
-- =============================================
create table if not exists public.conversations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  contact_id uuid references public.contacts(id) on delete cascade,
  
  -- Conversation Details
  channel text not null check (channel in ('email', 'sms', 'whatsapp', 'chat', 'internal')),
  last_message jsonb,
  unread_count integer default 0,
  is_starred boolean default false,
  tags text[] default '{}',
  
  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security for conversations
alter table public.conversations enable row level security;

create policy "Users can view own conversations"
  on public.conversations for select
  using (auth.uid() = user_id);

create policy "Users can insert own conversations"
  on public.conversations for insert
  with check (auth.uid() = user_id);

create policy "Users can update own conversations"
  on public.conversations for update
  using (auth.uid() = user_id);

create policy "Users can delete own conversations"
  on public.conversations for delete
  using (auth.uid() = user_id);

-- Index
create index if not exists conversations_user_id_idx on public.conversations(user_id);
create index if not exists conversations_contact_id_idx on public.conversations(contact_id);

-- =============================================
-- MESSAGES TABLE
-- =============================================
create table if not exists public.messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid references public.conversations(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  
  -- Message Details
  type text not null check (type in ('message', 'internal_comment', 'system')),
  from_type text not null check (from_type in ('user', 'contact', 'system')),
  body text not null,
  channel text not null,
  is_internal boolean default false,
  status text check (status in ('sent', 'delivered', 'read', 'failed')),
  
  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security for messages
alter table public.messages enable row level security;

create policy "Users can view own messages"
  on public.messages for select
  using (auth.uid() = user_id);

create policy "Users can insert own messages"
  on public.messages for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own messages"
  on public.messages for delete
  using (auth.uid() = user_id);

-- Index
create index if not exists messages_conversation_id_idx on public.messages(conversation_id);
create index if not exists messages_created_at_idx on public.messages(created_at desc);

-- =============================================
-- CALENDARS TABLE
-- =============================================
create table if not exists public.calendars (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  
  -- Calendar Details
  name text not null,
  description text,
  color text default '#3b82f6',
  is_active boolean default true,
  settings jsonb default '{}'::jsonb,
  
  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security for calendars
alter table public.calendars enable row level security;

create policy "Users can view own calendars"
  on public.calendars for select
  using (auth.uid() = user_id);

create policy "Users can insert own calendars"
  on public.calendars for insert
  with check (auth.uid() = user_id);

create policy "Users can update own calendars"
  on public.calendars for update
  using (auth.uid() = user_id);

create policy "Users can delete own calendars"
  on public.calendars for delete
  using (auth.uid() = user_id);

-- Index
create index if not exists calendars_user_id_idx on public.calendars(user_id);

-- =============================================
-- APPOINTMENTS TABLE
-- =============================================
create table if not exists public.appointments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  contact_id uuid references public.contacts(id) on delete set null,
  calendar_id uuid references public.calendars(id) on delete set null,
  
  -- Appointment Details
  title text not null,
  description text,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  status text default 'scheduled' check (status in ('scheduled', 'confirmed', 'cancelled', 'completed')),
  location text,
  
  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security for appointments
alter table public.appointments enable row level security;

create policy "Users can view own appointments"
  on public.appointments for select
  using (auth.uid() = user_id);

create policy "Users can insert own appointments"
  on public.appointments for insert
  with check (auth.uid() = user_id);

create policy "Users can update own appointments"
  on public.appointments for update
  using (auth.uid() = user_id);

create policy "Users can delete own appointments"
  on public.appointments for delete
  using (auth.uid() = user_id);

-- Index
create index if not exists appointments_user_id_idx on public.appointments(user_id);
create index if not exists appointments_start_time_idx on public.appointments(start_time);


-- =============================================
-- FUNCTIONS AND TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger handle_contacts_updated_at
  before update on public.contacts
  for each row execute function public.handle_updated_at();

create trigger handle_conversations_updated_at
  before update on public.conversations
  for each row execute function public.handle_updated_at();

create trigger handle_appointments_updated_at
  before update on public.appointments
  for each row execute function public.handle_updated_at();

create trigger handle_calendars_updated_at
  before update on public.calendars
  for each row execute function public.handle_updated_at();

-- =============================================
-- Success Message
-- =============================================
do $$
begin
  raise notice 'Database schema created successfully!';
  raise notice 'All tables have Row Level Security enabled.';
  raise notice 'Users can only access their own data.';
end $$;
