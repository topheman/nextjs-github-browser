const MAPPING = {
  user: {
    label: "User not found",
  },
  repository: {
    label: "Repository not found",
  },
  file: {
    label: "File not found",
  },
};

export type AppNotFoundProps = {
  type: keyof typeof MAPPING;
} & React.HTMLProps<HTMLDivElement>;

export default function AppNotFound({
  type,
  ...props
}: AppNotFoundProps): JSX.Element | null {
  return (
    <div {...props}>
      <p className="my-20 text-center">{MAPPING[type].label}</p>
    </div>
  );
}
