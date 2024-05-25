import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'

const app = new Elysia()
    .use(cors())
    .get("/", () => ({status: true}))
    .listen(Bun.env.PORT ?? 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
