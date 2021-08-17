import { setupWorker } from "msw";
import { baseHandlers } from "./handlers";

export const worker = setupWorker(...baseHandlers());
