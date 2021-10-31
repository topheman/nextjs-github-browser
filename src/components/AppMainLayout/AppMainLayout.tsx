import clsx from "clsx";

export type AppMainLayoutProps = {
  reverse?: boolean;
  children: () => {
    nav: JSX.Element | null;
    main: JSX.Element | null;
    sidebar?: JSX.Element | null;
    topNav?: JSX.Element | null;
  };
};

export default function AppMainLayout({
  reverse = false,
  children,
}: AppMainLayoutProps): JSX.Element | null {
  const { nav, main, sidebar, topNav } = children();
  const navbar = (
    <div className="md:hidden px-3 border-b border-light">{nav}</div>
  );
  return (
    <>
      <div
        className={clsx("top-0 md:border-b border-light", !topNav && "sticky")}
      >
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
          {sidebar ? <div className="w-0 md:w-1/4" /> : null}
          <div className={clsx("w-full bg-primary", sidebar ? "md:w-3/4" : "")}>
            {nav}
          </div>
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
          {sidebar ? (
            <div
              className={clsx(
                "z-10 px-4 mt-2 md:-mt-8 w-full md:w-1/4",
                reverse ? "md:mt-4" : ""
              )}
            >
              {sidebar}
            </div>
          ) : null}
          {!reverse ? navbar : null}
          <div className={clsx("p-4 w-full", sidebar ? "md:w-3/4" : "")}>
            {main}
          </div>
          {reverse ? navbar : null}
        </div>
      </div>
    </>
  );
}
