"use client";

import { Box, Button, Text, Input, VStack } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = e.target.elements;
      await signInWithEmailAndPassword(auth, email.value, password.value);
      router.push("/top");
    } catch (error) {
      // console.log(error);
      switch (error.code) {
        case "auth/invalid-email":
          setError("正しいメールアドレスの形式で入力してください。");
          break;
        case "auth/user-not-found":
          setError("メールアドレスかパスワードに誤りがあります。");
          break;
        case "auth/wrong-password":
          setError("メールアドレスかパスワードに誤りがあります。");
          break;
        default:
          setError("メールアドレスかパスワードに誤りがあります。");
          break;
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          bg={"green.100"}
          m={"100px auto"}
          p={"60px"}
          width="50%"
          borderRadius={"40px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box>
            <Text fontWeight="bold" mb={2}>
              メールアドレス
            </Text>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="ドメイン正しくないとエラー"
              autoComplete="email"
              bg={"green.50"}
            />
          </Box>
          <Box mt={"24px"}>
            <Text fontWeight="bold" mb={2}>
              パスワード
            </Text>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="6文字以上でないとエラー"
              autoComplete="password"
              bg={"green.50"}
            />
          </Box>
          <Box mt={"24px"} textAlign={"center"}>
            <Button
              type="submit"
              bg={"green.600"}
              borderColor={"green.600"}
              color={"white"}
              variant="solid"
              borderRadius={"100px"}
              width={"200px"}
            >
              LOGIN
            </Button>
          </Box>
          <Box mt={"15px"} textAlign={"center"}>
            <VStack textAlign={"center"}>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </VStack>
          </Box>
          <Box mt={"15px"} textAlign={"center"}>
            ユーザー登録は
            <Link href={"/signup"} style={{ color: "gray" }}>
              こちら
            </Link>
            から
          </Box>
        </Box>
      </form>
    </>
  );
};

export default Login;
