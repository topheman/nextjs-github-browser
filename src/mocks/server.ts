import { setupServer } from "msw/node";
import { makeHandlers } from "./handlers";

export const server = setupServer(...makeHandlers());
