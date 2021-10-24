import { useRouter } from "next/router";

export default function PageRepositoryBlob(): JSX.Element {
  const router = useRouter();
  const { owner, repository, branchName, path } = router.query;
  const resolvedBranchName = Array.isArray(branchName)
    ? branchName.join("/")
    : branchName;
  return (
    <>
      <h1>Blob</h1>
      <h2>
        Owner: "{owner}" / Repository: "{repository}"" / branchName: "
        {resolvedBranchName}"
      </h2>
      <p>path: {path}</p>
    </>
  );
}
