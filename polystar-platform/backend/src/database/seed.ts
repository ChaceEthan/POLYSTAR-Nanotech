import bcrypt from "bcryptjs";
import { connectDatabase, disconnectDatabase } from "./connection.js";
import { env } from "../config/env.js";
import { RoleModel, UserModel } from "../models/index.js";

async function seed() {
  await connectDatabase({ failOnError: true });

  const protectedRoles = [
    { slug: "owner", title: "Owner", permissions: ["*"] },
    { slug: "partner", title: "Partner", permissions: ["*"] },
    {
      slug: "admin",
      title: "Administrator",
      permissions: ["content:write", "content:edit", "content:delete", "content:publish", "uploads:write", "settings:read", "settings:write", "analytics:read"]
    },
    { slug: "editor", title: "Editor", permissions: ["content:edit", "uploads:write", "settings:read"] }
  ];

  for (const role of protectedRoles) {
    await RoleModel.updateOne(
      { slug: role.slug },
      {
        title: role.title,
        slug: role.slug,
        status: "active",
        permissions: role.permissions,
        metadata: { protected: true }
      },
      { upsert: true }
    );
  }

  await UserModel.updateOne(
    { email: process.env.ADMIN_SEED_EMAIL ?? "admin@polystar.rw" },
    {
      name: process.env.ADMIN_SEED_NAME ?? "POLYSTAR Administrator",
      email: process.env.ADMIN_SEED_EMAIL ?? "admin@polystar.rw",
      passwordHash: await bcrypt.hash(process.env.ADMIN_SEED_PASSWORD ?? "ChangeMe123!", 12),
      role: "admin",
      permissions: ["content:write", "content:edit", "content:delete", "content:publish", "uploads:write", "settings:read", "settings:write", "analytics:read"],
      status: "active"
    },
    { upsert: true }
  );

  if (process.env.OWNER_SEED_EMAIL && process.env.OWNER_SEED_PASSWORD) {
    await UserModel.updateOne(
      { email: process.env.OWNER_SEED_EMAIL },
      {
        name: process.env.OWNER_SEED_NAME ?? "POLYSTAR Owner",
        email: process.env.OWNER_SEED_EMAIL,
        passwordHash: await bcrypt.hash(process.env.OWNER_SEED_PASSWORD, 12),
        role: "owner",
        permissions: ["*"],
        status: "active"
      },
      { upsert: true }
    );
  }

  if (process.env.PARTNER_SEED_EMAIL && process.env.PARTNER_SEED_PASSWORD) {
    await UserModel.updateOne(
      { email: process.env.PARTNER_SEED_EMAIL },
      {
        name: process.env.PARTNER_SEED_NAME ?? "POLYSTAR Partner",
        email: process.env.PARTNER_SEED_EMAIL,
        passwordHash: await bcrypt.hash(process.env.PARTNER_SEED_PASSWORD, 12),
        role: "partner",
        permissions: ["*"],
        status: "active"
      },
      { upsert: true }
    );
  }

  console.log(`Seed completed for ${env.NODE_ENV}.`);
  await disconnectDatabase();
}

seed().catch(async (error) => {
  console.error(error);
  await disconnectDatabase();
  process.exit(1);
});
