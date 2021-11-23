/**
 * inspired by https://github.com/topheman/d3-react-experiments/blob/master/src/components/TwitterButton/TwitterButton.js
 * and https://github.com/topheman/react-fiber-experiments/blob/master/src/components/TwitterButton.js
 * and finally https://github.com/topheman/nextjs-movie-browser/blob/master/src/components/TwitterButton.tsx
 */

import clsx from "clsx";
import React from "react";

import TwitterIcon from "../icons/TwitterIcon";

export interface ExternalTwitterButtonProps {
  text?: string;
  url?: string;
  hashtags?: string;
  via?: string;
  related?: string;
  buttonTitle?: string;
  className?: string;
}

/**
 * Not using the iframe because it breaks back button for some reason
 */
const ExternalTwitterButton: React.FunctionComponent<ExternalTwitterButtonProps> = (
  props
) => {
  const {
    text,
    url,
    hashtags,
    via,
    related,
    buttonTitle,
    className,
    ...remainingProps
  } = props;
  const params = [
    (typeof text !== "undefined" && `text=${encodeURIComponent(text)}`) ||
      undefined,
    (typeof url !== "undefined" && `url=${encodeURIComponent(url)}`) ||
      undefined,
    (typeof hashtags !== "undefined" &&
      `hashtags=${encodeURIComponent(hashtags)}`) ||
      undefined,
    (typeof via !== "undefined" && `via=${encodeURIComponent(via)}`) ||
      undefined,
    (typeof related !== "undefined" &&
      `related=${encodeURIComponent(related)}`) ||
      undefined,
  ]
    .filter((item) => item !== undefined)
    .join("&");
  return (
    <a
      href={`https://twitter.com/intent/tweet?${params}`}
      target="_blank"
      rel="noreferrer"
      className={clsx(
        className,
        "py-1 px-3 text-sm text-white-always bg-[#049ff5] hover:bg-[#006399] rounded-lg"
      )}
      title={buttonTitle}
      {...remainingProps}
    >
      <TwitterIcon className="mr-2" />
      tweet
    </a>
  );
};

ExternalTwitterButton.defaultProps = {
  buttonTitle: "Tweet about this",
  text: undefined,
  url: undefined,
  hashtags: undefined,
  via: undefined,
  related: undefined,
};

export default ExternalTwitterButton;
