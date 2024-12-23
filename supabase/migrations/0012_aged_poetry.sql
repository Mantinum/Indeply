/*
  # Correction de la structure des services

  1. Changements
    - Création d'une nouvelle table professional_services avec la bonne structure
    - Migration des données existantes
    - Mise à jour des références dans appointments

  2. Sécurité
    - Activation RLS
    - Ajout des politiques de sécurité appropriées
*/

-- Création de la nouvelle table
CREATE TABLE IF NOT EXISTS professional_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  duration integer NOT NULL,
  price numeric NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Migration des données existantes si nécessaire
INSERT INTO professional_services (professional_id, name, description, duration, price, category)
SELECT professional_id, name, description, duration, price, category
FROM services
ON CONFLICT DO NOTHING;

-- Mise à jour des références dans appointments
ALTER TABLE appointments
  DROP CONSTRAINT IF EXISTS appointments_service_id_fkey,
  ADD CONSTRAINT appointments_service_id_fkey 
    FOREIGN KEY (service_id) 
    REFERENCES professional_services(id) 
    ON DELETE CASCADE;

-- Activation RLS
ALTER TABLE professional_services ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Services visibles par tous"
  ON professional_services FOR SELECT
  USING (true);

CREATE POLICY "Professionnels peuvent gérer leurs services"
  ON professional_services FOR ALL
  USING (auth.uid() = professional_id);

-- Index pour les performances
CREATE INDEX IF NOT EXISTS idx_professional_services_professional_id 
  ON professional_services(professional_id);