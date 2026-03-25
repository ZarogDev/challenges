/**
 * @openapi
 * components:
 *   schemas:
 *     Vote:
 *       type: object
 *       required:
 *         - value
 *       properties:
 *         value:
 *           type: string
 *           enum: ["up", "down"]
 *           example: "up"
 *     CreateVote:
 *       type: object
 *       properties:
 *         rating:
 *           type: number
 *           example: 3
 *      
 */