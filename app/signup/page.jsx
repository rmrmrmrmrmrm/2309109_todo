"use client";

import { Box, Button, Text, Input, VStack } from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = e.target.elements;
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      router.push("/top");
    } catch (error) {
      // console.log(error);
      switch (error.code) {
        case "auth/network-request-failed":
          setError(
            "通信がエラーになったのか、またはタイムアウトになりました。通信環境がいい所で再度やり直してください。"
          );
          break;

        case "auth/weak-password":
          setError("パスワードが短すぎます。6文字以上を入力してください。");
          break;

        case "auth/invalid-email":
          setError("メールアドレスが正しくありません");
          break;

        case "auth/email-already-in-use":
          setError(
            "メールアドレスがすでに使用されています。ログインするか別のメールアドレスで作成してください"
          );
          break;

        default:
          setError(
            "アカウントの作成に失敗しました。通信環境がいい所で再度やり直してください。"
          );
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
              placeholder="email"
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
              placeholder="password"
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
              SIGNUP
            </Button>
          </Box>
          <Box mt={"15px"} textAlign={"center"}>
            <VStack textAlign={"center"}>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </VStack>
          </Box>
          <Box mt={"15px"} textAlign={"center"}>
            ログインは
            <Link href={"/login"} style={{ color: "gray" }}>
              こちら
            </Link>
            から
          </Box>
        </Box>
      </form>
    </>
  );
};

export default SignUp;
