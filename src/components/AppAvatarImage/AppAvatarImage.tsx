export type AppAvatarImageProps = {
  avatarUrl: string;
  alt?: string;
  rounded: "full" | "medium";
};

AppAvatarImage.defaultProps = {
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
