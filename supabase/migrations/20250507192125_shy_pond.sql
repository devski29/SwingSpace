/*
  # Add missing profile policies

  1. Security
    - Add policy for authenticated users to create their own profile
    - Add policy for public profile viewing
    
  Note: Update policy already exists and is skipped
*/

-- Policy to allow users to insert their own profile
CREATE POLICY "Users can create their own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Policy to allow public read access to all profiles
CREATE POLICY "Profiles are viewable by everyone"
ON public.profiles
FOR SELECT
TO public
USING (true);