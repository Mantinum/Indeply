/*
  # Fix appointments table relationships

  1. Changes
    - Drop and recreate appointments table with correct foreign key relationships
    - Update RLS policies
    - Add necessary indexes

  2. Details
    - Use profiles table instead of auth.users for foreign keys
    - Maintain all existing columns and constraints
    - Preserve RLS policies
*/

-- Drop existing table
DROP TABLE IF EXISTS appointments;

-- Create new appointments table with correct relationships
CREATE TABLE appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL,
  professional_id uuid NOT NULL,
  service_id uuid NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  notes text,
  status text NOT NULL DEFAULT 'Planifié',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT appointments_client_id_fkey 
    FOREIGN KEY (client_id) 
    REFERENCES profiles(id) 
    ON DELETE CASCADE,
  CONSTRAINT appointments_professional_id_fkey 
    FOREIGN KEY (professional_id) 
    REFERENCES profiles(id) 
    ON DELETE CASCADE,
  CONSTRAINT appointments_service_id_fkey 
    FOREIGN KEY (service_id) 
    REFERENCES professional_services(id) 
    ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "appointments_select_policy" ON appointments
  FOR SELECT USING (
    auth.uid() = client_id OR 
    auth.uid() = professional_id
  );

CREATE POLICY "appointments_insert_policy" ON appointments
  FOR INSERT WITH CHECK (
    auth.uid() = client_id OR 
    auth.uid() = professional_id
  );

CREATE POLICY "appointments_update_policy" ON appointments
  FOR UPDATE USING (
    auth.uid() = client_id OR 
    auth.uid() = professional_id
  );

-- Add indexes for better performance
CREATE INDEX idx_appointments_client_id ON appointments(client_id);
CREATE INDEX idx_appointments_professional_id ON appointments(professional_id);
CREATE INDEX idx_appointments_service_id ON appointments(service_id);
CREATE INDEX idx_appointments_date ON appointments(date);