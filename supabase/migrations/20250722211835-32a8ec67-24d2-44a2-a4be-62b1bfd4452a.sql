
-- Step 1: Add available_seats column to flights table
ALTER TABLE flights ADD COLUMN available_seats integer;

-- Step 2: Change flights.jet_id from bigint to integer to match jets.id
ALTER TABLE flights ALTER COLUMN jet_id TYPE integer;

-- Step 3: Add foreign key constraint between flights.jet_id and jets.id
ALTER TABLE flights 
ADD CONSTRAINT flights_jet_id_fkey 
FOREIGN KEY (jet_id) REFERENCES jets(id);

-- Step 4: Set default available_seats based on jet seating capacity
-- For flights that have a jet_id, use the jet's seating capacity
UPDATE flights 
SET available_seats = jets.seating_capacity
FROM jets 
WHERE flights.jet_id = jets.id 
AND flights.available_seats IS NULL;

-- Step 5: For any remaining flights without available_seats, set a default
UPDATE flights 
SET available_seats = 8 
WHERE available_seats IS NULL;

-- Step 6: Make available_seats NOT NULL with a default value
ALTER TABLE flights ALTER COLUMN available_seats SET NOT NULL;
ALTER TABLE flights ALTER COLUMN available_seats SET DEFAULT 8;

-- Step 7: Ensure all flights have a valid jet_id (assign random jets to flights without one)
WITH flights_without_jets AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) as rn
  FROM flights 
  WHERE jet_id IS NULL
),
available_jets AS (
  SELECT id as jet_id, ROW_NUMBER() OVER (ORDER BY id) as jet_rn
  FROM jets
)
UPDATE flights 
SET jet_id = (
  SELECT jet_id 
  FROM available_jets 
  WHERE jet_rn = ((flights_without_jets.rn - 1) % (SELECT COUNT(*) FROM jets)) + 1
)
FROM flights_without_jets
WHERE flights.id = flights_without_jets.id;

-- Step 8: Make jet_id NOT NULL since all flights should have an associated jet
ALTER TABLE flights ALTER COLUMN jet_id SET NOT NULL;
