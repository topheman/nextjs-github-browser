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
        },
        props
      )}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  );
}
