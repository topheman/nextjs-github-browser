import { setupWorker } from "msw";
import { makeHandlers } from "./handlers";

export const worker = setupWorker(...makeHandlers());
