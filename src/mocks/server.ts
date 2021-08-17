import { setupServer } from "msw/node";
import { baseHandlers } from "./handlers";

export const server = setupServer(...baseHandlers());
