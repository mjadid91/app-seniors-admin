
-- Remove the existing policies that might conflict and recreate them properly
DROP POLICY IF EXISTS "Users can view their own documents" ON public."Document";
DROP POLICY IF EXISTS "Users can insert their own documents" ON public."Document";
DROP POLICY IF EXISTS "Users can update their own documents" ON public."Document";
DROP POLICY IF EXISTS "Users can delete their own documents" ON public."Document";

-- Ensure RLS is enabled
ALTER TABLE public."Document" ENABLE ROW LEVEL SECURITY;

-- Create policies for Document table with proper user ID handling
CREATE POLICY "Users can view their own documents" 
  ON public."Document" 
  FOR SELECT 
  USING (auth.uid()::text = "IDUtilisateurs"::text);

CREATE POLICY "Users can insert their own documents" 
  ON public."Document" 
  FOR INSERT 
  WITH CHECK (auth.uid()::text = "IDUtilisateurs"::text);

CREATE POLICY "Users can update their own documents" 
  ON public."Document" 
  FOR UPDATE 
  USING (auth.uid()::text = "IDUtilisateurs"::text);

CREATE POLICY "Users can delete their own documents" 
  ON public."Document" 
  FOR DELETE 
  USING (auth.uid()::text = "IDUtilisateurs"::text);

-- Create the documents bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- Remove existing storage policies and recreate them
DROP POLICY IF EXISTS "Users can upload their own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can view documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own documents" ON storage.objects;

-- Create storage policies
CREATE POLICY "Users can upload their own documents"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'documents');

CREATE POLICY "Users can view documents"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'documents');

CREATE POLICY "Users can update their own documents"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'documents');

CREATE POLICY "Users can delete their own documents"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'documents');
