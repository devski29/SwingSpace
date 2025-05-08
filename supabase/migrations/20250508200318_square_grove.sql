/*
  # Add Friends System

  1. New Tables
    - `friends` table to track user connections
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `friend_id` (uuid, references profiles)
      - `status` (text, friendship status)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on friends table
    - Add policies for friend management
*/

CREATE TABLE IF NOT EXISTS public.friends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  friend_id UUID REFERENCES public.profiles(id) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'blocked')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, friend_id)
);

ALTER TABLE public.friends ENABLE ROW LEVEL SECURITY;

-- Only allow users to see their own friend connections
CREATE POLICY "Users can see their own friends"
  ON public.friends
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to manage their friend connections
CREATE POLICY "Users can manage their friends"
  ON public.friends
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);