import TheHeader from "../TheHeader/TheHeader";
import TheFooter from "../TheFooter/TheFooter";

export type BaseLayoutProps = {
  children: React.ReactChild | React.ReactChild[];
};

export default function BaseLayout({
  children,
}: BaseLayoutProps): JSX.Element | null {
  return (
    <>
      <TheHeader />
      {children}
      <TheFooter fromFullYear={2021} toFullYear={new Date().getFullYear()} />
    </>
  );
}
