-- Add created_at column if it doesn't exist
ALTER TABLE speakers 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create sequence for sort_order if it doesn't exist
CREATE SEQUENCE IF NOT EXISTS speakers_sort_order_seq;

-- Set sort_order column to use the sequence as default
ALTER TABLE speakers 
ALTER COLUMN sort_order SET DEFAULT nextval('speakers_sort_order_seq');

-- Update existing records to have sequential sort_order
UPDATE speakers 
SET sort_order = subquery.row_number
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) as row_number
  FROM speakers
) AS subquery
WHERE speakers.id = subquery.id;

-- Set the sequence to start after existing records
SELECT setval('speakers_sort_order_seq', COALESCE(MAX(sort_order), 0) + 1, false) FROM speakers;