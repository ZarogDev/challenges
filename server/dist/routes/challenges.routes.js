import { Router } from "express";
import { getAllChallenges, getChallengeById, createChallenge, getChallengeParticipations, voteOnChallenge } from "../controllers/challenges.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validateCreationBody } from "../middlewares/challenges.middleware.js";
import { validateVoteBody } from "../middlewares/common.middleware.js";
const router = Router();
/**
 * @openapi
 * "/challenges":
 *   get:
 *     tags:
 *      - "Challenges"
 *     description: "Return all challenges"
 *     responses:
 *       200:
 *         description: "An array of Challenges objects"
 *         schema:
 *           type: "array"
 *           items:
 *             $ref: "#/components/schemas/Challenge"
*/
router.get("/", getAllChallenges);
/**
 * @openapi
 * "/challenges/{id}":
 *   get:
 *     tags:
 *      - "Challenges"
 *     description: "Return a challenge by its ID"
 *     responses:
 *       200:
 *         description: "A Challenge object"
 *         schema:
 *           $ref: "#/components/schemas/Challenge"
 *       404:
 *         description: "Challenge not found"
*/
router.get("/:id", getChallengeById);
/**
 * @openapi
 * "/challenges/{id}/participations":
 *   get:
 *     tags:
 *      - "Challenges"
 *     description: "Get participations for a challenge"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: "List of participations"
 */
router.get("/:id/participations", getChallengeParticipations);
/**
 * @openapi
 * "/challenges":
 *   post:
 *     tags:
 *       - "Challenges"
 *     description: "Create a new challenge"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateChallenge"
 *     responses:
 *       201:
 *         description: "Challenge created"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Challenge"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */
router.post("/", authenticate, validateCreationBody, createChallenge);
/**
 * @openapi
 * "/challenges/{id}/votes":
 *   post:
 *     tags:
 *      - "Challenges"
 *     description: "Vote on a challenge"
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: "Vote recorded"
 */
router.post("/:id/votes", authenticate, validateVoteBody, voteOnChallenge);
export default router;
