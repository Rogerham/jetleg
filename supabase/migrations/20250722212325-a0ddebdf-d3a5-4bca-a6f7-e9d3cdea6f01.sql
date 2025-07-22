
-- Add available_seats column to flights table if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'flights' AND column_name = 'available_seats') THEN
        ALTER TABLE flights ADD COLUMN available_seats integer;
    END IF;
END $$;

-- Update existing flights to set available_seats based on jet seating capacity
UPDATE flights 
SET available_seats = jets.seating_capacity
FROM jets 
WHERE flights.jet_id = jets.id 
AND flights.available_seats IS NULL;

-- Set default available_seats for flights without a jet_id or where seating_capacity is null
UPDATE flights 
SET available_seats = 8 
WHERE available_seats IS NULL;

-- Make available_seats NOT NULL with a default value
ALTER TABLE flights ALTER COLUMN available_seats SET NOT NULL;
ALTER TABLE flights ALTER COLUMN available_seats SET DEFAULT 8;

-- Also ensure jet_id column is properly typed as integer to match the jets table
DO $$ 
BEGIN 
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'flights' AND column_name = 'jet_id' AND data_type = 'bigint') THEN
        ALTER TABLE flights ALTER COLUMN jet_id TYPE integer;
    END IF;
END $$;

-- Add foreign key constraint if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'flights_jet_id_fkey') THEN
        ALTER TABLE flights 
        ADD CONSTRAINT flights_jet_id_fkey 
        FOREIGN KEY (jet_id) REFERENCES jets(id);
    END IF;
END $$;
