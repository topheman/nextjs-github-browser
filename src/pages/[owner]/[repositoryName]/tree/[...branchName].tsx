import { useRouter } from "next/router";

export default function PageRepositoryTree(): JSX.Element {
  const router = useRouter();
  const { owner, repositoryName, branchName } = router.query;
  const resolvedBranchName = Array.isArray(branchName)
    ? branchName.join("/")
    : branchName;
  return (
    <>
      <h1>Tree</h1>
      <h2>
        Owner: "{owner}" / Repository: "{repositoryName}"" / branchName: "
        {resolvedBranchName}"
      </h2>
    </>
  );
}
