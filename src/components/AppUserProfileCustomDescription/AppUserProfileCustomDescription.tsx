import BaseBox from "../BaseBox/BaseBox";
import BaseMarkdownDisplay, {
  BaseMarkdownDisplayProps,
} from "../BaseMarkdownDisplay/BaseMarkdownDisplay";

export type AppUserProfileCustomDescriptionProps = {
  profileReadme: BaseMarkdownDisplayProps["markdown"];
};

export default function AppUserProfileCustomDescription({
  profileReadme,
}: AppUserProfileCustomDescriptionProps): JSX.Element | null {
  if (profileReadme) {
    return (
      // eslint-disable-next-line tailwindcss/no-custom-classname
      <BaseBox className="p-4">
        <BaseMarkdownDisplay markdown={profileReadme} />
      </BaseBox>
    );
  }
  return null;
}
