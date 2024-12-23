/*
  # Ajout de la table des disponibilités

  1. Nouvelle Table
    - `availabilities`
      - `id` (uuid, primary key)
      - `professional_id` (uuid, foreign key)
      - `date` (date)
      - `slots` (text[])
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for professionals and clients
*/

-- Création de la table des disponibilités
CREATE TABLE IF NOT EXISTS availabilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  date date NOT NULL,
  slots text[] NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Activation RLS
ALTER TABLE availabilities ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Les disponibilités sont visibles publiquement"
  ON availabilities FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Les professionnels peuvent gérer leurs disponibilités"
  ON availabilities FOR ALL
  USING (auth.uid() = professional_id);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_availabilities_professional_date 
  ON availabilities(professional_id, date);