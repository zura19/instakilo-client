"use client";
import { store } from "@/store";
import { Provider } from "react-redux";
import ClientUserInitializer from "./ClientUserInitializer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotificationsProvider from "./NotificationsProvider";
import { ThemeProvider } from "./settings/ThemeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
      },
    },
  });
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute={"class"}
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ClientUserInitializer />
        <NotificationsProvider />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  );
}
