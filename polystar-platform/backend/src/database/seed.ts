import bcrypt from "bcryptjs";
import { connectDatabase, disconnectDatabase } from "./connection.js";
import { env } from "../config/env.js";
import { RoleModel, UserModel } from "../models/index.js";

async function seed() {
  await connectDatabase({ failOnError: true });

  await RoleModel.updateOne(
    { slug: "admin" },
    {
      title: "Administrator",
      slug: "admin",
      status: "active",
      permissions: ["*"],
      metadata: { protected: true }
    },
    { upsert: true }
  );

  await UserModel.updateOne(
    { email: process.env.ADMIN_SEED_EMAIL ?? "admin@polystar.rw" },
    {
      name: process.env.ADMIN_SEED_NAME ?? "POLYSTAR Administrator",
      email: process.env.ADMIN_SEED_EMAIL ?? "admin@polystar.rw",
      passwordHash: await bcrypt.hash(process.env.ADMIN_SEED_PASSWORD ?? "ChangeMe123!", 12),
      role: "admin",
      permissions: ["*"],
      status: "active"
    },
    { upsert: true }
  );

  console.log(`Seed completed for ${env.NODE_ENV}.`);
  await disconnectDatabase();
}

seed().catch(async (error) => {
  console.error(error);
  await disconnectDatabase();
  process.exit(1);
});
