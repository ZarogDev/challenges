"use strict";
/**
 * @openapi
 * components:
 *   schemas:
 *     Challenge:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         title:
 *           type: string
 *           example: "Titre du challenge"
 *         description:
 *           type: string
 *           example: "Description du challenge"
 *         conditions:
 *           type: string
 *           nullable: true
 *           example: "Avoir minimum 18 ans"
 *         gameId:
 *           type: number
 *           example: 457
 *         gameTitle:
 *           type: string
 *           example: "Minecraft"
 *         gameThumbnail:
 *           type: string
 *           example: "https://media.rawg.io/media/screenshots/598/5985fae6e3689fa05ddf246e45e031d3.jpg"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2022-01-01T12:00:00.000Z"
 *         userId:
 *           type: number
 *           example: 45
 *         creator:
 *           type: object
 *           example: { "username": "Utilisateur 1" }
 *
 *     CreateChallenge:
 *        type: object
 *        required: [title, description, gameId]
 *        properties:
 *          title:
 *            type: string
 *          description:
 *            type: string
 *          conditions:
 *            type: string
 *            nullable: true
 *          gameId:
 *            type: number
 */ 
