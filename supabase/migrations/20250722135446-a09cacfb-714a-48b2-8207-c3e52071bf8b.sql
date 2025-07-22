
-- Step 1: Change flights.jet_id from bigint to integer to match jets.id
ALTER TABLE flights ALTER COLUMN jet_id TYPE integer;

-- Step 2: Add foreign key constraint between flights.jet_id and jets.id
ALTER TABLE flights 
ADD CONSTRAINT flights_jet_id_fkey 
FOREIGN KEY (jet_id) REFERENCES jets(id);

-- Step 3: Populate missing jet_id values for flights that don't have them
-- We'll assign jet IDs in a round-robin fashion to the 58 flights without jet_id
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

-- Step 4: Add sample image URLs to jets table
UPDATE jets SET image_url = CASE 
  WHEN brand = 'Cessna' AND model = 'Citation CJ3+' THEN '/src/assets/jet-interior.jpg'
  WHEN brand = 'Embraer' AND model = 'Legacy 450' THEN '/src/assets/jet-interior.jpg'
  WHEN brand = 'Bombardier' AND model = 'Challenger 350' THEN '/src/assets/jet-interior.jpg'
  WHEN brand = 'Gulfstream' AND model = 'G280' THEN '/src/assets/jet-interior.jpg'
  WHEN brand = 'Hawker' AND model = 'Beechcraft 400XP' THEN '/src/assets/jet-interior.jpg'
  WHEN brand = 'Dassault' AND model = 'Falcon 2000' THEN '/src/assets/jet-interior.jpg'
  WHEN brand = 'Pilatus' AND model = 'PC-24' THEN '/src/assets/jet-interior.jpg'
  WHEN brand = 'HondaJet' AND model = 'Elite' THEN '/src/assets/jet-interior.jpg'
  WHEN brand = 'Phenom' AND model = '300' THEN '/src/assets/jet-interior.jpg'
  WHEN brand = 'King Air' AND model = '350i' THEN '/src/assets/jet-interior.jpg'
  ELSE '/src/assets/jet-interior.jpg'
END
WHERE image_url IS NULL;
