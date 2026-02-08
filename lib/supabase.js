import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database schema for tickets table:
/*
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_number TEXT UNIQUE NOT NULL,
  wallet_address TEXT NOT NULL,
  issue_type TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  priority TEXT DEFAULT 'normal',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  admin_notes TEXT,
  resolution TEXT
);

-- Create index on ticket_number for fast lookups
CREATE INDEX idx_ticket_number ON tickets(ticket_number);

-- Create index on wallet_address for user queries
CREATE INDEX idx_wallet_address ON tickets(wallet_address);

-- Create index on status for filtering
CREATE INDEX idx_status ON tickets(status);
*/