import { useRouter } from "next/router";

export default function PageRepositoryTree(): JSX.Element {
  const router = useRouter();
  const { owner, repository, branchName } = router.query;
  const resolvedBranchName = Array.isArray(branchName)
    ? branchName.join("/")
    : branchName;
  return (
    <>
      <h1>Tree</h1>
      <h2>
        Owner: "{owner}" / Repository: "{repository}"" / branchName: "
        {resolvedBranchName}"
      </h2>
    </>
  );
}
