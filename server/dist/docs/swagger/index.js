import path from "node:path";
import swaggerJSDoc from "swagger-jsdoc";
export const spec = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Gamer Challenges API",
            version: "1.0.0",
        },
        servers: [
            {
                url: "/api",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: [
        path.join(import.meta.dirname, "../../src/routes/*.routes.ts"),
        path.join(import.meta.dirname, "../../src/routes/*.routes.js"),
        path.join(import.meta.dirname, "./schemas/*.schema.ts"),
        path.join(import.meta.dirname, "./schemas/*.schema.js")
    ],
});
