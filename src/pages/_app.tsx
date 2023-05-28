import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react'
import theme from '../components/theme'

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { Chain, configureChains, createConfig, WagmiConfig } from 'wagmi';
import { celoAlfajores } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const mantletestnet: Chain = {
  id: 5001,
  name: 'Mantle Testnet',
  network: 'Mantle Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'BIT',
    symbol: 'BIT',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.mantle.xyz'],
    },
    public: {
      http: ['https://rpc.testnet.mantle.xyz']
    }
  },
  blockExplorers: {
    default: { name: 'Mantle Testnet Explorer', url: 'https://explorer.testnet.mantle.xyz' },
  },
  testnet: true,
};

const { chains, publicClient } = configureChains(
  [ celoAlfajores, mantletestnet],
  [
    alchemyProvider({ apiKey: "FIOu28Q3CCOEkqymVRAu6impiDJtclAW" }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'FundzVilla',
  projectId: '001',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})


export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
    <ChakraProvider theme={theme}>
  <Component {...pageProps} />
  </ChakraProvider>
    </RainbowKitProvider>
  </WagmiConfig>
 
  )
  
}
