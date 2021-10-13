import clsx from "clsx";

export type AppProfileProps = {
  reverse?: boolean;
  children: () => {
    nav: JSX.Element;
    main: JSX.Element;
    sidebar: JSX.Element;
    topNav?: JSX.Element;
  };
};

export default function AppProfile({
  reverse = false,
  children,
}: AppProfileProps): JSX.Element | null {
  const { nav, main, sidebar, topNav } = children();
  const navbar = (
    <div className="md:hidden px-3 border-b border-light">{nav}</div>
  );
  return (
    <>
      <div className={clsx("top-0 border-b border-light", !topNav && "sticky")}>
        {topNav ? (
          <div className="md:flex p-4 my-2 mr-auto ml-auto w-auto max-w-screen-xl">
            <div className="w-full">{topNav}</div>
          </div>
        ) : null}
        <div
          className={clsx(
            "hidden md:flex mr-auto ml-auto w-auto max-w-screen-xl",
            reverse ? "flex-row-reverse" : "flex-row"
          )}
        >
          <div className="w-0 md:w-1/4" />
          <div className="w-full md:w-3/4 bg-primary">{nav}</div>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl">
        <div
          className={clsx(
            "flex",
            reverse
              ? "flex-col-reverse md:flex-row-reverse"
              : "flex-col md:flex-row"
          )}
        >
          <div
            className={clsx(
              "z-10 px-4 mt-2 md:-mt-8 w-full md:w-1/4",
              reverse ? "md:mt-4" : ""
            )}
          >
            {sidebar}
          </div>
          {!reverse ? navbar : null}
          <div className="p-4 w-full md:w-3/4">{main}</div>
          {reverse ? navbar : null}
        </div>
      </div>
    </>
  );
}
