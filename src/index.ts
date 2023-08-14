import { PrismaClient } from "@prisma/client";
import app from "./app";

const prisma = new PrismaClient();
const port: number | string = process.env.PORT || 3003;

async function main() {
  // Create
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
}
main();
