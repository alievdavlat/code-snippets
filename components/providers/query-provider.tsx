"use client";
import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RandomProvider } from "../../context/RandomContext";
import { GlobalFilterProvider } from "@/context/TableFilterContext";
import { ModalProvider } from "../ui/animated-modal";

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // default: true
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalFilterProvider>
        <RandomProvider>
          <ModalProvider>
          {children}
          </ModalProvider>
          </RandomProvider>
      </GlobalFilterProvider>
    </QueryClientProvider>
  );
};

export default QueryProvider;
