-- Temporairement, rendre le bucket avatars public pour tester
UPDATE storage.buckets SET public = true WHERE id = 'avatars';