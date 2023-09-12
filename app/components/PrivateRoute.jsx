import { useAuthContext } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  if (!loading) {
    if (!user) {
      if (pathname !== "/login" && pathname !== "/signup") {
        router.push("/login");
        setTimeout(function () {
          return <>{children}</>;
        }, 1000);
      } else {
        return <>{children}</>;
      }
    } else {
      return <>{children}</>;
    }
  }
};

export default PrivateRoute;
