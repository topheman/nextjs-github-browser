import { User } from "../../libs/graphql";
import AppUserProfileInfos from "../AppUserProfileInfos/AppUserProfileInfos";

export type AppUserProfileProps = {
  user?: User;
  children: () => {
    nav: JSX.Element;
    main: JSX.Element;
  };
};

AppUserProfile.defaultProps = {
  user: null,
  profileReadme: "",
};

export default function AppUserProfile({
  user,
  children,
}: AppUserProfileProps): JSX.Element | null {
  if (!user) {
    return null;
  }
  const { nav, main } = children();
  return (
    <>
      <div className="hidden md:flex sticky top-0 border-b border-light">
        <div className="w-0 md:w-1/4" />
        <div className="w-full md:w-3/4 bg-primary">{nav}</div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="z-10 px-4 mt-2 md:-mt-8 w-full md:w-1/4">
          <AppUserProfileInfos user={user} />
        </div>
        <div className="md:hidden px-3 border-b border-light">{children}</div>
        <div className="m-3 w-full md:w-3/4">{main}</div>
      </div>
    </>
  );
}
