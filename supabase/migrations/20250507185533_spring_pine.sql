/*
  # Initial Schema Setup

  1. Authentication and Users
    - Enable auth schema
    - Create profiles table linked to auth.users
    - Set up RLS policies

  2. Content Tables
    - Posts table with privacy controls
    - Comments table
    - Chat rooms and messages
    - Profile views tracking
    - Roses system
    - Subscription tracking

  3. Security
    - Enable RLS on all tables
    - Set up appropriate policies
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  bio TEXT,
  location TEXT,
  age INT CHECK (age >= 18),
  profile_images TEXT[] DEFAULT ARRAY[]::TEXT[],
  cover_image TEXT,
  subscription_tier TEXT DEFAULT 'trial',
  roses INT DEFAULT 0,
  profile_views INT DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  profile_boost_until TIMESTAMPTZ,
  viewers_enabled BOOLEAN DEFAULT false,
  viewers_enabled_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create posts table
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  content TEXT NOT NULL,
  images TEXT[],
  is_public BOOLEAN DEFAULT true,
  likes INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create comments table
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create chat_rooms table
CREATE TABLE IF NOT EXISTS public.chat_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create profile_views table
CREATE TABLE IF NOT EXISTS public.profile_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  viewer_id UUID REFERENCES public.profiles(id),
  profile_id UUID REFERENCES public.profiles(id),
  viewed_at TIMESTAMPTZ DEFAULT now()
);

-- Create roses table
CREATE TABLE IF NOT EXISTS public.roses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES public.profiles(id),
  receiver_id UUID REFERENCES public.profiles(id),
  amount INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) UNIQUE,
  tier TEXT NOT NULL,
  started_at TIMESTAMPTZ DEFAULT now(),
  ends_at TIMESTAMPTZ NOT NULL,
  auto_renew BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Posts policies
CREATE POLICY "Public posts are viewable by everyone"
  ON public.posts FOR SELECT
  USING (is_public = true);

CREATE POLICY "Users can view private posts if premium"
  ON public.posts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND subscription_tier = 'premium'
    )
  );

CREATE POLICY "Users can create posts"
  ON public.posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Enable realtime for relevant tables
ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE roses;
ALTER PUBLICATION supabase_realtime ADD TABLE profile_views;