/* eslint-disable tailwindcss/no-custom-classname */
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import CloseIcon from "../components/icons/CloseIcon";

describe("An icon component", () => {
  it("matches snapshot", () => {
    const { container } = render(<CloseIcon />);
    expect(container.querySelector("svg")).toMatchSnapshot();
  });

  it('sets aria-hidden="false" if ariaLabel prop is present', () => {
    const { container } = render(<CloseIcon aria-label="icon" />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "false"
    );
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-label",
      "icon"
    );
  });

  it("respects the className prop", () => {
    const { container } = render(<CloseIcon className="foo" />);
    expect(container.querySelector("svg")).toHaveAttribute("class", "foo");
  });

  it("respects the fill prop", () => {
    const { container } = render(<CloseIcon fill="#f00" />);
    expect(container.querySelector("svg")).toHaveAttribute("fill", "#f00");
  });

  it("respects the style prop", () => {
    const { container } = render(
      <CloseIcon style={{ verticalAlign: "middle" }} />
    );
    expect(container.querySelector("svg")).toHaveStyle({
      verticalAlign: "middle",
    });
  });
});
