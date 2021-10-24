import { useRouter } from "next/router";

export default function PageRepositoryCommit(): JSX.Element {
  const router = useRouter();
  const { owner, repositoryName, commitId } = router.query;
  return (
    <>
      <h2>
        Owner: "{owner}" / Repository: "{repositoryName}" / commit: "{commitId}"
      </h2>
    </>
  );
}
