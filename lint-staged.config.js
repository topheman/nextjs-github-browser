module.exports = {
  "*.{js,jsx,ts,tsx}": "eslint --cache --fix",
  "*{ts,tsx}": () => "tsc --project tsconfig.json --pretty --noEmit",
};
