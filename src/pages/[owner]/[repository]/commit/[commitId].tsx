import { useRouter } from "next/router";

export default function PageRepositoryCommit(): JSX.Element {
  const router = useRouter();
  const { owner, repository, commitId } = router.query;
  return (
    <>
      <h2>
        Owner: "{owner}" / Repository: "{repository}" / commit: "{commitId}"
      </h2>
    </>
  );
}
