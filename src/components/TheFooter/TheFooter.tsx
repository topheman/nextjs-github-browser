import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import ExternalTwitterButton from "../ExternalTwitterButton/ExternalTwitterButton";

export type TheFooterProps = {
  fromFullYear: number;
  toFullYear?: number;
};

export default function TheFooter({
  fromFullYear,
  toFullYear,
  ...remainingProps
}: TheFooterProps): JSX.Element | null {
  const [currentUrl, setCurrentUrl] = useState<null | string>(null);
  const router = useRouter();
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [router.asPath]);
  return (
    <footer {...remainingProps} className="text-center">
      <p className="pt-2">
        ©
        {fromFullYear === toFullYear
          ? toFullYear
          : `${fromFullYear}-${toFullYear}`}{" "}
        <a
          href="http://labs.topheman.com/"
          className="text-brand-primary hover:underline"
        >
          labs.topheman.com
        </a>{" "}
        - Christophe Rosset
      </p>
      {currentUrl ? (
        <p className="pt-2 pb-4">
          <ExternalTwitterButton
            url={currentUrl}
            text="A #NextJS implementation of the github website by @topheman
#SSR #TypeScript #GraphQL #apollographql #tailwind #ReactJS"
            className="inline-block"
          />
        </p>
      ) : null}
    </footer>
  );
}
