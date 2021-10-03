/* eslint-disable @next/next/no-img-element */
export type AppAvatarImageProps = {
  avatarUrl: string;
  rounded: "full" | "medium";
} & typeof defaultProps;

const defaultProps = {
  alt: "Avatar",
};

export default function AppAvatarImage({
  avatarUrl,
  alt,
  rounded,
}: AppAvatarImageProps): JSX.Element | null {
  return (
    <img
      src={avatarUrl}
      alt={alt}
      className={`w-full h-auto ${
        rounded === "full" ? "rounded-full" : "rounded-xl"
      } border-primary border`}
    />
  );
}

AppAvatarImage.defaultProps = defaultProps;
