// import { User } from "../../libs/graphql";

export type AppUserProfileProps = {
  // user?: User;
  children: () => {
    nav: JSX.Element;
    main: JSX.Element;
    sidebar: JSX.Element;
  };
};

export default function AppUserProfile({
  children,
}: AppUserProfileProps): JSX.Element | null {
  const { nav, main, sidebar } = children();
  return (
    <>
      <div className="sticky top-0 border-b border-light">
        <div className="hidden md:flex mr-auto ml-auto w-auto max-w-screen-xl">
          <div className="w-0 md:w-1/4" />
          <div className="w-full md:w-3/4 bg-primary">{nav}</div>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col md:flex-row">
          <div className="z-10 px-4 mt-2 md:-mt-8 w-full md:w-1/4">
            {sidebar}
          </div>
          <div className="md:hidden px-3 border-b border-light">{nav}</div>
          <div className="p-4 w-full md:w-3/4">{main}</div>
        </div>
      </div>
    </>
  );
}
