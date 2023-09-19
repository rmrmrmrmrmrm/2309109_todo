"use client";

import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  router.push(`/top`);
  return <>複数issueの自動クローズテスト</>;
};

export default Home;
