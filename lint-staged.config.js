module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --cache --fix", "npm run test:precommit"],
  "*{ts,tsx}": () => "tsc --project tsconfig.json --pretty --noEmit",
};
