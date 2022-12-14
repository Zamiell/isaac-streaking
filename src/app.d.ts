import type { User } from "@prisma/client";

declare global {
  // https://kit.svelte.dev/docs/types#app
  namespace App {
    interface Locals {
      discordAccessToken: string | null;
      shouldSetCookie: boolean;
      shouldDeleteCookie: boolean;
      user: User | null;
    }

    /** Must match the ".env.example" file. */
    interface PrivateEnv {
      SESSION_KEY: string;
      DATABASE_URL: string;
      DISCORD_CLIENT_ID: string;
      DISCORD_CLIENT_SECRET: string;
    }
  }
}
