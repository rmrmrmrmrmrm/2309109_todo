import { useAuthContext } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

const PrivateRoute = ({ children }) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  if (!user) {
    if (pathname !== "/login" && pathname !== "/signup") {
      router.push("/login");
    } else {
      return <>{children}</>;
    }
  } else {
    return <>{children}</>;
  }
};

export default PrivateRoute;
