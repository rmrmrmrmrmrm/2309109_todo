import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

const PrivateRoute = ({ children }) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) {
      if (pathname !== "/login" && pathname !== "/signup") {
        router.push("/login");
      }
    }
  }, [pathname]);
  return <>{children}</>;
};

export default PrivateRoute;
