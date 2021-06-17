// inspired by https://github.com/primer/octicons/blob/main/lib/octicons_react/src/get-svg-props.js

import { CSSProperties } from "react";

type GetSvgPropsType = {
  viewBox: string;
  "aria-label"?: string;
  role: string;
  className?: string;
  fill?: string;
  width?: string | number;
  height?: string | number;
  verticalAlign?: string;
};

type GetSvgResultType = {
  "aria-hidden": boolean | "true" | "false";
  "aria-label"?: string;
  role: string;
  className?: string;
  viewBox: string;
  width: string | number;
  height?: string | number;
  fill: string;
  style: CSSProperties;
};

export function getSvgProps(
  {
    viewBox,
    "aria-label": ariaLabel,
    role = "img",
    className,
    fill = "currentColor",
    width = "1em",
    height,
    verticalAlign,
  }: GetSvgPropsType,
  runtimeProps?: React.SVGProps<SVGSVGElement>
): GetSvgResultType {
  const { style, ...rest } = runtimeProps || {};
  return {
    "aria-hidden": ariaLabel ? "false" : "true",
    "aria-label": ariaLabel,
    role,
    className,
    viewBox,
    width,
    height,
    fill,
    style: {
      display: "inline-block",
      userSelect: "none",
      verticalAlign,
      overflow: "visible",
      ...style,
    },
    ...rest,
  };
}
