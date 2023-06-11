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
import { celoAlfajores, celo } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { usePublicClient } from 'wagmi'
import { createPublicClient, http } from 'viem'

import { Masa } from "@masa-finance/masa-sdk";








const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ celoAlfajores, celo],
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
  publicClient,
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
