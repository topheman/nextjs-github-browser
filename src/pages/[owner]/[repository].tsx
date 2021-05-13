import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";

import TheHeader from "../../components/TheHeader";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { owner, repository } = context.query;
  console.log("owner", owner, "repository", repository);
  console.log(context.resolvedUrl);
  return {
    props: {},
  };
};

export default function PageRepository() {
  const router = useRouter();
  const { owner, repository } = router.query;
  return (
    <>
      <h1>
        Owner: "{owner}" / Repository: "{repository}"
      </h1>
      <TheHeader />
    </>
  );
}
