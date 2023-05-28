import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react'
import theme from '../components/theme'



export default function App({ Component, pageProps }: AppProps) {
  return (
  <ChakraProvider theme={theme}>
  <Component {...pageProps} />
  </ChakraProvider>
  )
  
}
