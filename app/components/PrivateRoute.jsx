"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children, allowedRouters }) => {
  // ページがロードされた時にユーザーの認証状態をチェック
  const router = useRouter();
  const { user } = useAuthContext();
  useEffect(() => {
    console.log("ログイン状態をチェック");
    if (!user && !allowedRouters.includes(router.pathname)) {
      // ログアウト中 /login へリダイレクト
      console.log("ログアウト中");
      router.push("/login");
    } else {
      console.log("ログイン中");
    }
  }, [user, router.pathname]); // 依存リスト
  return <>{children}</>;
};

export default PrivateRoute;
