module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --cache --fix", "npm run test:precommit"],
  "*{ts,tsx}": () => ["npm run type-check:src"],
  "cypress/**/*{ts,tsx}": () => ["npm run type-check:cy"],
};
