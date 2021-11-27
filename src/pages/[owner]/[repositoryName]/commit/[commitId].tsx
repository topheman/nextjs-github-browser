import { useRouter } from "next/router";
import App404 from "../../../../components/App404/App404";

export default function PageRepositoryCommit(): JSX.Element {
  const router = useRouter();
  const { owner, repositoryName, commitId } = router.query;
  return (
    <App404
      data-owner={owner}
      data-repository-name={repositoryName}
      data-commit-id={commitId}
    />
  );
}
