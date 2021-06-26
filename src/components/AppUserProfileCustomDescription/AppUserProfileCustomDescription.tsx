/* eslint-disable react/no-danger */
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
      <div className="p-4 rounded-md border border-light">
        <BaseMarkdownDisplay markdown={profileReadme} />
      </div>
    );
  }
  return null;
}
