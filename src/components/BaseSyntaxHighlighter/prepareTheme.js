// eslint-disable-next-line @typescript-eslint/no-var-requires
const { cloneDeep } = require("lodash");

function hljsStyleToCssVar(styleObject, prefix = "hljs") {
  const clonedStyleObject = cloneDeep(styleObject);
  const cssVarsDeclaration = Object.entries(styleObject).reduce(
    (cssVarAcc, [hljsRuleName, rulesObject]) => {
      cssVarAcc.push(
        ...Object.entries(rulesObject).map(([cssRuleName, cssValue]) => {
          const cssVarName = `--${prefix}-${cssRuleName}-${hljsRuleName}`;
          clonedStyleObject[hljsRuleName][cssRuleName] = `var(${cssVarName})`;
          return `${cssVarName}: ${cssValue}`;
        })
      );
      return cssVarAcc;
    },
    []
  );
  return {
    cssVarsDeclaration: cssVarsDeclaration.join(";\n"),
    styleDeclaration: clonedStyleObject,
  };
}

/**
 * Put a theme from react-syntax-highlighter/dist/esm/styles/hljs here and run with nodejs
 */
const { cssVarsDeclaration, styleDeclaration } = hljsStyleToCssVar({
  "hljs-comment": {
    color: "#696969",
  },
  "hljs-quote": {
    color: "#696969",
  },
  "hljs-variable": {
    color: "#d91e18",
  },
  "hljs-template-variable": {
    color: "#d91e18",
  },
  "hljs-tag": {
    color: "#d91e18",
  },
  "hljs-name": {
    color: "#d91e18",
  },
  "hljs-selector-id": {
    color: "#d91e18",
  },
  "hljs-selector-class": {
    color: "#d91e18",
  },
  "hljs-regexp": {
    color: "#d91e18",
  },
  "hljs-deletion": {
    color: "#d91e18",
  },
  "hljs-number": {
    color: "#aa5d00",
  },
  "hljs-built_in": {
    color: "#aa5d00",
  },
  "hljs-builtin-name": {
    color: "#aa5d00",
  },
  "hljs-literal": {
    color: "#aa5d00",
  },
  "hljs-type": {
    color: "#aa5d00",
  },
  "hljs-params": {
    color: "#aa5d00",
  },
  "hljs-meta": {
    color: "#aa5d00",
  },
  "hljs-link": {
    color: "#aa5d00",
  },
  "hljs-attribute": {
    color: "#aa5d00",
  },
  "hljs-string": {
    color: "#008000",
  },
  "hljs-symbol": {
    color: "#008000",
  },
  "hljs-bullet": {
    color: "#008000",
  },
  "hljs-addition": {
    color: "#008000",
  },
  "hljs-title": {
    color: "#007faa",
  },
  "hljs-section": {
    color: "#007faa",
  },
  "hljs-keyword": {
    color: "#7928a1",
  },
  "hljs-selector-tag": {
    color: "#7928a1",
  },
  hljs: {
    display: "block",
    overflowX: "auto",
    background: "#fefefe",
    color: "#545454",
    padding: "0.5em",
  },
  "hljs-emphasis": {
    fontStyle: "italic",
  },
  "hljs-strong": {
    fontWeight: "bold",
  },
});

console.log("<!-- css var -->");
console.log(cssVarsDeclaration);
console.log("// javascript object");
console.log(styleDeclaration);
