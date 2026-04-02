/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *
 *   responses:
 *     BadRequest:
 *       description: "Bad Request"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Error"
 *           example: { error: "Title is required" }
 *
 *     Unauthorized:
 *       description: "Unauthorized"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Error"
 *           example: { error: "Invalid token" }
 *
 *     NotFound:
 *       description: "Resource not found"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Error"
 *           example: { error: "Not found" }
 *
 *     InternalServerError:
 *       description: "Internal server error"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Error"
 *           example: { error: "Internal server error" }
 */