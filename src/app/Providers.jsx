import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "../../wallet_connect/config";
import { Provider } from "react-redux";
import store from "../../redux/store/store";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {
  ssr: false,
});

const queryClient = new QueryClient();

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </Provider>
  );
}
