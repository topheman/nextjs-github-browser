// inspired by https://github.com/topheman/nextjs-movie-browser/blob/master/src/components/MetaTags.tsx

import React from "react";
import Head from "next/head";

interface IUrlInfos {
  basePath?: string;
  pathname?: string;
  siteName?: string;
  twitterHandle?: string;
}

export interface PropsMetaTags {
  image?: string;
  twitterHandle?: string;
  twitterCard?: "summary" | "summary_large_image";
  title?: string;
  description?: string | null;
  siteName?: string;
  type?: "profile" | "object" | "website";
  url?: string;
  profileUsername?: string;
  keywords?: string;
  children?: React.ReactChild | React.ReactChild[];
}

export const commonMetaTagsExtractProps = ({
  pathname,
  basePath = process.env.NEXT_PUBLIC_APP_BASE_URL,
  siteName = process.env.NEXT_PUBLIC_APP_TITLE,
  twitterHandle = process.env.NEXT_PUBLIC_TWITTER_HANDLE,
}: IUrlInfos): PropsMetaTags => {
  return {
    siteName,
    twitterHandle,
    url: (basePath && pathname && `${basePath}${pathname}`) || undefined,
    twitterCard: "summary",
    title: process.env.NEXTJS_APP_CLIENT_TITLE as string,
    description: "A NextJS implementation of the github website.",
    keywords: [
      "NextJS",
      "ReactJS",
      "TypeScript",
      "Apollo/GraphQL",
      "Tailwind",
    ].join(", "),
    image: `${basePath}/nextjs-github-browser.png`,
    type: "website",
  };
};

const BaseMetaTags: React.FunctionComponent<PropsMetaTags> = ({
  children,
  siteName,
  twitterHandle,
  twitterCard,
  url,
  image,
  type,
  title,
  description,
  keywords,
}) => {
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" />
      {title && <title key="title">{title}</title>}
      {url && <link rel="canonical" href={url} />}
      {image && (
        <meta name="twitter:image" content={image} key="twitter-image" />
      )}
      {image && (
        <meta
          name="twitter:image:src"
          content={image}
          key="twitter-image-src"
        />
      )}
      {twitterHandle && (
        <meta name="twitter:site" content={twitterHandle} key="twitter-site" />
      )}
      {twitterCard && (
        <meta name="twitter:card" content={twitterCard} key="twitter-card" />
      )}
      {title && (
        <meta name="twitter:title" content={title} key="twitter-title" />
      )}
      {description && (
        <meta
          name="twitter:description"
          content={description}
          key="twitter-description"
        />
      )}
      {twitterHandle && (
        <meta
          name="twitter:creator"
          content={twitterHandle}
          key="twitter-creator"
        />
      )}
      {url && <meta name="twitter:url" content={url} key="twitter-url" />}
      {image && <meta property="og:image" content={image} key="og-image" />}
      {image && description && (
        <meta
          property="og:image:alt"
          content={description}
          key="og-image-alt"
        />
      )}
      {siteName && (
        <meta property="og:site_name" content={siteName} key="og-siteName" />
      )}
      {type && <meta property="og:type" content={type} key="og-type" />}
      {title && <meta property="og:title" content={title} key="og-title" />}
      {url && <meta property="og:url" content={url} key="og-url" />}
      {description && (
        <meta
          property="og:description"
          content={description}
          key="og-description"
        />
      )}
      {description && (
        <meta name="description" content={description} key="description" />
      )}
      {keywords && <meta name="keywords" content={keywords} key="keywords" />}
      {children}
    </Head>
  );
};

export default BaseMetaTags;
