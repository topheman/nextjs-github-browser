import { render } from "@testing-library/react";

import { makeUser } from "../../tests/helpers";
import AppUserProfileInfos from "./AppUserProfileInfos";

describe("components/AppUserProfileInfos", () => {
  it("it not render if no user passed", () => {
    const { container } = render(<AppUserProfileInfos />);
    expect(container).toBeEmptyDOMElement();
  });
  it("it shoud render a basic user", () => {
    const { container } = render(<AppUserProfileInfos user={makeUser()} />);
    expect(container).toBeTruthy();
  });
});
export {};
