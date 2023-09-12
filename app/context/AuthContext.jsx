import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  const value = {
    user,
    loading,
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      console.log(user);
      setUser(user);
      setLoading(false);
      if (!user) {
        if (pathname !== "/login" && pathname !== "/signup") {
          router.push("/login");
        }
      }
    });
    return () => {
      unsubscribed();
    };
  }, [pathname]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
