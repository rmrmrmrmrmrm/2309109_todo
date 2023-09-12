import { Flex, Spacer, Heading, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase";
import { useAuthContext } from "../context/AuthContext";

export const Header = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push("/login");
    } catch {
      alert("サインアウト失敗");
    }
  };
  return (
    <Flex
      bg={"green.300"}
      w="100%"
      p={2}
      pr="50px"
      pl="50px"
      mb={5}
      alignItems="center"
    >
      <Heading as="h1">
        <Link href={"/"}>TODO</Link>
      </Heading>
      <Spacer />
      {user && (
        <Button
          onClick={handleLogout}
          type="button"
          color={"white"}
          bg={"gray.400"}
          borderRadius={"50px"}
          h="40px"
          width={"100px"}
        >
          LOGOUT
        </Button>
      )}{" "}
      <span>テスト用メニュー｜</span>
      <Link href="/login">login｜</Link>
      <Link href="/signup">signup｜</Link>
      <Link href="/top">top｜</Link>
      <Link href="/show">show｜</Link>
      <Link href="/create">create｜</Link>
      <Link href="/edit">edit｜</Link>
    </Flex>
  );
};
