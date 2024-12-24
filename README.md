# pocketbase-nextjs-auth

This is a [Next.js](https://nextjs.org) project integrated with [PocketBase](https://pocketbase.io).

## Features

- Dockerized PocketBase server.
- Basic registration and login pages.
- Example of server actions.
- Techniques for both server-side and client-side rendering.
- Typed PocketBase client using [pocketbase-typegen](https://github.com/patmood/pocketbase-typegen).

## Getting Started

First, run the PocketBase using Docker compose:

```bash
docker compose up --detach
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Middleware

`src/lib/pocketbase/middleware.ts`

It is important to note that the project uses Next.js middleware to check authentication on the server side. Make sure to adjust the middleware to allow unrestricted access to specific pages as needed.
