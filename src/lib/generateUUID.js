import { randomUUID } from "crypto";
import process from "node:process";

export const generateUUID = () => randomUUID();

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(generateUUID());
}
