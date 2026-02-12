import { randomUUID } from "crypto";

export const generateUUID = () => randomUUID();

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(generateUUID());
}
