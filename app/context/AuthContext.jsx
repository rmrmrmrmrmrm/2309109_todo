import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
const { createContext, useContext, useState, useEffect } = require("react");

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState("");

  const value = {
    user,
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      console.log(user);
      setUser(user);
      if (user) {
        console.log("ログイン中");
      } else {
        console.log("ログアウト中");
      }
    });
    return () => {
      unsubscribed();
    };
  }, []);
  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
