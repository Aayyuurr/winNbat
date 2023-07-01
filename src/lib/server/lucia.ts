import lucia from "lucia-auth";
import { sveltekit } from "lucia-auth/middleware";
import prisma from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { dev } from "$app/environment";
import { Client_ID, Client_ID_FB, Client_Secret, Client_Secret_FB } from "$env/static/private";

export const auth = lucia({
  adapter: prisma(new PrismaClient()),
  env: dev ? "DEV" : "PROD",
  middleware: sveltekit(),
  transformDatabaseUser:(userData)=>{
    return {
      userId: userData.id,
      username: userData.username,
      email: userData.email,

    }
  }
});


//google provier
import { google } from "@lucia-auth/oauth/providers";
export const googleProvider = google(auth, {
    clientId: Client_ID,
    clientSecret: Client_Secret,
    redirectUri: `${dev ? "http://localhost:5173" : "https://win-nbat.vercel.app"}/oauth/google/callback`,
});

// facebook provider
import { facebook } from "@lucia-auth/oauth/providers";
export const facebookProvider = facebook(auth, {
    clientId: Client_ID_FB,
  clientSecret: Client_Secret_FB,
  redirectUri:"http://127.0.0.1:5173/oauth/facebook/callback",
  scope: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ],
});

export type Auth = typeof auth;
