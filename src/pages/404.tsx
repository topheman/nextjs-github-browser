export default function page404(): JSX.Element {
  return (
    <div className="flex flex-col gap-0 justify-center items-center h-screen">
      <p className="text-xl text-secondary">
        This feature is not yet supported.
      </p>
      <p className="mt-2 text-lg text-brand-primary">
        <button
          onClick={() => window.history.back()}
          type="button"
          className="hover:underline"
          title="Go back"
        >
          Back
        </button>
      </p>
    </div>
  );
}
