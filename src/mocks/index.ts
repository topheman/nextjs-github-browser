/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/**
 * For the moment, it won't work directly on NextJS due to the bug describe here:
 * https://github.com/mswjs/msw/issues/642
 */

import { SetupServerApi } from "msw/lib/types/node";
import { SetupWorkerApi } from "msw";

if (typeof window === "undefined") {
  const { server } = require("./server");
  (server as SetupServerApi).listen({ onUnhandledRequest: "error" });
} else {
  const { worker } = require("./browser");
  (worker as SetupWorkerApi).start({ onUnhandledRequest: "error" });
}

// if (typeof window !== "undefined") {
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   const { worker } = require("./browser");
//   worker.start();
// }
export {};
