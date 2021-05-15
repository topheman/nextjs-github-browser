/* eslint-disable global-require */
/**
 * For the moment, it won't work directly on NextJS due to the bug describe here:
 * https://github.com/mswjs/msw/issues/642
 */

// if (typeof window === "undefined") {
//   const { server } = require("./server");
//   server.listen();
// } else {
//   const { worker } = require("./browser");
//   worker.start();
// }

if (typeof window !== "undefined") {
  const { worker } = require("./browser");
  worker.start();
}
export {};
