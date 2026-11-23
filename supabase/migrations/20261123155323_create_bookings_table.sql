/*
# Create bookings table (single-tenant, no auth)

1. New Tables
- `bookings`
  - `id` (uuid, primary key)
  - `name` (text, not null) — guest full name
  - `email` (text, not null) — guest contact email
  - `room_type` (text, not null) — selected suite name
  - `check_in` (date, not null) — arrival date
  - `check_out` (date, not null) — departure date
  - `guests` (integer, not null, default 2) — number of guests
  - `special_requests` (text, nullable) — optional guest notes
  - `status` (text, not null, default 'pending') — booking status
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `bookings`.
- Grant CRUD to `anon` + `authenticated` so the anon-key frontend can submit and (in future) read bookings.
- Allow anon + authenticated CRUD because this is a single-tenant public booking form.
3. Notes
- No user_id / no auth — the landing page has no sign-in screen, so anon must be able to insert.
- `check_out` must be after `check_in` (enforced with a CHECK constraint).
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  room_type text NOT NULL,
  check_in date NOT NULL,
  check_out date NOT NULL,
  guests integer NOT NULL DEFAULT 2 CHECK (guests >= 1 AND guests <= 12),
  special_requests text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','cancelled')),
  created_at timestamptz DEFAULT now(),
  CONSTRAINT check_out_after_check_in CHECK (check_out > check_in)
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON bookings TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_bookings" ON bookings;
CREATE POLICY "anon_select_bookings" ON bookings FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_bookings" ON bookings;
CREATE POLICY "anon_insert_bookings" ON bookings FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_bookings" ON bookings;
CREATE POLICY "anon_update_bookings" ON bookings FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_bookings" ON bookings;
CREATE POLICY "anon_delete_bookings" ON bookings FOR DELETE
TO anon, authenticated USING (true);
