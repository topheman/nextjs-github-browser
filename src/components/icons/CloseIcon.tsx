import React from "react";

import { getSvgProps } from "../../utils/svg";

export default function HamburgerIcon(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      {...getSvgProps(
        {
          viewBox: "0 0 24 24",
          role: "presentation",
          "aria-label": "Close",
        },
        props
      )}
    >
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      <path fill="none" d="M0 0h24v24H0z" />
    </svg>
  );
}
