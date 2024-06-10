import { PrismaClient } from "@prisma/client";

// In TypeScript, declare is used to add details or type information to variables, functions, modules, namespaces, or other elements without providing a concrete definition.
// This allows the TypeScript compiler to understand how these elements should be used in the code, even if they are not directly defined in the file where declare is used.
declare global {
  var prisma: PrismaClient | undefined;
}

// globaltThis.prisma doesn't exist yet, so create a new Prisma client instance.
const client = globalThis.prisma || new PrismaClient(); // 'globalThis' is a global object in JavaScript that always refers to the global context, regardless of where the code is executed (e.g., in a browser, Node.js, or a web worker). If it's used client-side, it refers to the window object. If it's used server-side, it refers to the global object in Node.js.

// If the environment is NOT production, assign the Prisma client to the global object. This prevents reinitialization of the Prisma client on subsequent module imports, which can be useful for hot reloading during development. Hot reloading* allows developers to see changes in their code immediately without restarting the server.
if (process.env.NODE_ENV !== "production") {
  // Assign the Prisma client to the global object to prevent reinitialization on subsequent module imports
  globalThis.prisma = client;
}

export default client;

// Hot reloading :
// It's a software development process that allows developers to see the effects of their code changes immediately, without manually reloading the application or restarting the server. 
// In other words, as soon as a developer saves changes in the source code, those changes are automatically injected into the running application, allowing to see the changes instantly without interrupting the workflow.
