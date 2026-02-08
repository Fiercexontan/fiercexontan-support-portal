import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';

// Define supported chains
export const chains = {
  ethereum: {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'
  },
  polygon: {
    chainId: 137,
    name: 'Polygon',
    currency: 'MATIC',
    explorerUrl: 'https://polygonscan.com',
    rpcUrl: 'https://polygon-rpc.com'
  },
  bsc: {
    chainId: 56,
    name: 'BNB Smart Chain',
    currency: 'BNB',
    explorerUrl: 'https://bscscan.com',
    rpcUrl: 'https://bsc-dataseed.binance.org'
  },
  arbitrum: {
    chainId: 42161,
    name: 'Arbitrum One',
    currency: 'ETH',
    explorerUrl: 'https://arbiscan.io',
    rpcUrl: 'https://arb1.arbitrum.io/rpc'
  },
  optimism: {
    chainId: 10,
    name: 'Optimism',
    currency: 'ETH',
    explorerUrl: 'https://optimistic.etherscan.io',
    rpcUrl: 'https://mainnet.optimism.io'
  },
  base: {
    chainId: 8453,
    name: 'Base',
    currency: 'ETH',
    explorerUrl: 'https://basescan.org',
    rpcUrl: 'https://mainnet.base.org'
  }
};

// Metadata for your dApp
const metadata = {
  name: 'Fiercexontan Support Portal',
  description: 'Multi-chain blockchain support and ticket management',
  url: 'https://fiercexontan-support.vercel.app',
  icons: ['https://fiercexontan-support.vercel.app/logo.svg']
};

// Create Web3Modal configuration
export function initializeWeb3Modal() {
  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
  
  if (!projectId) {
    console.warn('WalletConnect Project ID not found. Please add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID to .env.local');
  }

  const ethersConfig = defaultConfig({
    metadata,
    enableEIP6963: true,
    enableInjected: true,
    enableCoinbase: true,
    defaultChainId: 1,
  });

  return createWeb3Modal({
    ethersConfig,
    chains: Object.values(chains),
    projectId,
    enableAnalytics: true,
    themeMode: 'dark',
    themeVariables: {
      '--w3m-accent': '#0066FF',
      '--w3m-color-mix': '#00D9B5',
      '--w3m-color-mix-strength': 20
    }
  });
}