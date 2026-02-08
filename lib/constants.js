// Issue types for ticket submission
export const ISSUE_TYPES = [
  'Wallet Connection',
  'Transaction Failed',
  'Gas Fees',
  'Token Transfer',
  'Smart Contract',
  'Network Issues',
  'Security Concern',
  'Account Recovery',
  'Other'
];

// Ticket status types
export const TICKET_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed'
};

// Priority levels
export const PRIORITY_LEVELS = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  URGENT: 'urgent'
};

// Social media links
export const SOCIAL_LINKS = {
  github: 'https://github.com/Fiercexontan-Ops',
  twitter: 'https://twitter.com/fiercexontan',
  discord: 'https://discord.gg/fiercexontan',
  telegram: 'https://t.me/fiercexontan'
};

// Navigation menu items
export const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'Submit Ticket', path: '/submit-ticket' },
  { name: 'Track Ticket', path: '/track-ticket' },
  { name: 'Help Center', path: '/help' },
];

// Blockchain icon SVG paths (for floating animation)
export const BLOCKCHAIN_ICONS = [
  { name: 'Bitcoin', symbol: 'BTC', color: '#F7931A' },
  { name: 'Ethereum', symbol: 'ETH', color: '#627EEA' },
  { name: 'BNB', symbol: 'BNB', color: '#F3BA2F' },
  { name: 'Polygon', symbol: 'MATIC', color: '#8247E5' },
  { name: 'Solana', symbol: 'SOL', color: '#14F195' },
  { name: 'Avalanche', symbol: 'AVAX', color: '#E84142' },
  { name: 'Arbitrum', symbol: 'ARB', color: '#28A0F0' },
  { name: 'Optimism', symbol: 'OP', color: '#FF0420' },
];

// Generate unique ticket number
export function generateTicketNumber() {
  const prefix = 'FCX';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

// Format wallet address for display
export function formatAddress(address) {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

// Validate Ethereum address
export function isValidAddress(address) {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// Format date for display (HANDLES POSTGRES TIMESTAMPTZ)
export function formatDate(dateString) {
  if (!dateString) return 'N/A';
  
  try {
    // Handle Postgres timestamptz format (e.g., "2026-02-06 21:46:57.016595+0")
    let dateStr = String(dateString);
    
    // Replace "+0" with "+00:00" for proper timezone parsing
    dateStr = dateStr.replace(/\+0$/, '+00:00');
    
    // Also handle space separator (Postgres uses space instead of T)
    dateStr = dateStr.replace(' ', 'T');
    
    const date = new Date(dateStr);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.error('Invalid date after parsing:', dateString, '→', dateStr);
      return 'Invalid date';
    }
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', dateString, error);
    return 'Date error';
  }
}