"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { Header } from "./components/header";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

export function Providers({ children }) {
  return (
    <>
      <CacheProvider>
        <ChakraProvider>
          <AuthProvider>
            <Header />
            <PrivateRoute allowedRouters={["/login", "/signup"]}>
              {children}
            </PrivateRoute>
          </AuthProvider>
        </ChakraProvider>
      </CacheProvider>
    </>
  );
}
