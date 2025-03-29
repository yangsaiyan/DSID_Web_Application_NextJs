import { http, createConfig } from 'wagmi'
import { mainnet, polygonAmoy } from 'wagmi/chains'
import { walletConnect } from 'wagmi/connectors'

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

export const config = createConfig({
  chains: [mainnet, polygonAmoy],
  connectors: [
    walletConnect({ projectId }),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygonAmoy.id]: http(),
  },
})