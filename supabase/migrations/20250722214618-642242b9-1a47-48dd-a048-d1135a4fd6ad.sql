
-- Step 1: Update available_seats in flights table to match the seating_capacity of associated jets
UPDATE flights 
SET available_seats = jets.seating_capacity
FROM jets 
WHERE flights.jet_id = jets.id 
AND jets.seating_capacity IS NOT NULL
AND flights.available_seats != jets.seating_capacity;

-- Step 2: For jets without seating_capacity, set a reasonable default
UPDATE jets 
SET seating_capacity = CASE 
  WHEN type = 'Light Jet' THEN 6
  WHEN type = 'Mid-size' THEN 8
  WHEN type = 'Super Mid-size' THEN 10
  WHEN type = 'Heavy Jet' THEN 12
  ELSE 8
END
WHERE seating_capacity IS NULL;

-- Step 3: Update flights that reference jets with previously NULL seating_capacity
UPDATE flights 
SET available_seats = jets.seating_capacity
FROM jets 
WHERE flights.jet_id = jets.id 
AND flights.available_seats != jets.seating_capacity;

-- Step 4: Add placeholder image URLs for jets that don't have images
UPDATE jets 
SET image_url = '/src/assets/jet-interior.jpg'
WHERE image_url IS NULL;

-- Step 5: Ensure all flights have valid jet_id references
-- First, let's check if there are any flights without jet_id and assign them
UPDATE flights 
SET jet_id = (
  SELECT id 
  FROM jets 
  ORDER BY id 
  LIMIT 1
)
WHERE jet_id IS NULL;

-- Step 6: Add RLS policy for jets table if not already present
ALTER TABLE public.jets ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists and recreate it
DROP POLICY IF EXISTS "Anyone can view jets" ON public.jets;

CREATE POLICY "Anyone can view jets" 
ON public.jets 
FOR SELECT 
USING (true);
