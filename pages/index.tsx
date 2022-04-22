import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/auth/login");
  }, [router]);

  return (
    <div>
      <h1 className="text-3xl font-bold underline"> Task Manager</h1>
    </div>
  );
};

export default Home;
