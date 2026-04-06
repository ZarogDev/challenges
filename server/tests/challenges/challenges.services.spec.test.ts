import { describe, expect, it, vi } from "vitest";
import request from "supertest";
import { prisma } from "../../src/db/prisma";
import app from "../../src/app";
import * as gameService from "../../src/services/rawgio/index";
import { generateJWTToken } from "../utils/token";

describe("GET /api/challenges", () => {
  it("should return challenges", async () => {
    const user = await prisma.user.create({
      data: {
        username: 'usertest',
        email: 'usertest@test.com',
        password: 'password',
        birthdate: new Date()
      }
    });

    await prisma.challenge.create({
      data: {
        title: 'Challenge 1',
        description: 'Description 1',
        conditions: 'Conditions 1',
        userId: user.id,
        gameId: 1,
        gameTitle: 'Game 1',
        gameThumbnail: 'Game 1 thumbnail',
      }
    });

    const res = await request(app).get("/api/challenges");

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
  });

  it("should return an empty array", async () => {
    const res = await request(app).get("/api/challenges");

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(0);
  });

  it("should return 2 pages of 1 challenge", async () => {
    const user = await prisma.user.create({
      data: {
        username: 'usertest',
        email: 'usertest@test.com',
        password: 'password',
        birthdate: new Date()
      }
    });

    await prisma.challenge.createMany({
      data: [{
        title: 'Challenge 1',
        description: 'Description 1',
        conditions: 'Conditions 1',
        userId: user.id,
        gameId: 1,
        gameTitle: 'Game 1',
        gameThumbnail: 'Game 1 thumbnail',
      },
      {
        title: 'Challenge 2',
        description: 'Description 2',
        conditions: 'Conditions 2',
        userId: user.id,
        gameId: 2,
        gameTitle: 'Game 2',
        gameThumbnail: 'Game 2 thumbnail',
      }]
    });

    const res = await request(app).get("/api/challenges?limit=1&page=2");

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
    expect(res.body.totalPages).toBe(2);
    expect(res.body.page).toEqual(2);
  });

  it("should return 1 challenge with accurate search", async () => {
    const user = await prisma.user.create({
      data: {
        username: 'usertest',
        email: 'usertest@test.com',
        password: 'password',
        birthdate: new Date()
      }
    });

    await prisma.challenge.createMany({
      data: [{
        title: 'Challenge 1',
        description: 'Description 1',
        conditions: 'Conditions 1',
        userId: user.id,
        gameId: 1,
        gameTitle: 'Game 1',
        gameThumbnail: 'Game 1 thumbnail',
      },
      {
        title: 'Challenge 2',
        description: 'Description 2',
        conditions: 'Conditions 2',
        userId: user.id,
        gameId: 2,
        gameTitle: 'Game 2',
        gameThumbnail: 'Game 2 thumbnail',
      }]
    });

    const res = await request(app).get("/api/challenges?search=Game 2");

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
    expect(res.body.totalPages).toBe(1);
    expect(res.body.data[0].gameTitle).toEqual("Game 2");
  });
});

describe("GET /api/challenges/:id", () => {
  it("should return a challenge", async () => {
    const user = await prisma.user.create({
      data: { 
        username: 'usertest', 
        email: 'usertest@test.com', 
        password: 'password',
        birthdate: new Date() 
      }
    });

    const challenge = await prisma.challenge.create({
      data: {
        title: 'Challenge 1',
        description: 'Description 1',
        conditions: 'Conditions 1',
        userId: user.id,
        gameId: 1,
        gameTitle: 'Game 1',
        gameThumbnail: 'Game 1 thumbnail',
      },
    });

    const res = await request(app).get(`/api/challenges/${challenge.id}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(challenge.id);
  });

  it("should return 404 if no challenge is found", async () => {
    const res = await request(app).get('/api/challenges/999');

    expect(res.status).toBe(404);
    expect(res.body.error).toEqual("Challenge not found");
  });

  it("should return 400 if id is not valid", async () => {
    const res = await request(app).get('/api/challenges/abc');

    expect(res.status).toBe(400);
    expect(res.body.error).toEqual("Challenge ID must be a number");
  });
});

describe("POST /api/challenges", () => {
  it("should create a challenge", async () => {
    vi.spyOn(gameService, 'fetchGame').mockResolvedValue({
      ok: true,
      data: { name: 'Game 1', background_image: 'Game 1 thumbnail' },
    });

    const user = await prisma.user.create({
      data: {
        username: 'usertest',
        email: 'usertest@test.com',
        password: 'password',
        birthdate: new Date()
      }
    });

    const res = await request(app)
      .post('/api/challenges')
      .send({
        title: 'New Challenge',
        description: 'Description',
        gameId: 1,
      })
      .set("Authorization", `Bearer ${generateJWTToken(user.id)}`);

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("New Challenge");
    expect(res.body.userId).toEqual(user.id);
  });

  it("should return 401 error if no token is provided", async () => {
    vi.spyOn(gameService, 'fetchGame').mockResolvedValue({
      ok: true,
      data: { name: 'Game 1', background_image: 'Game 1 thumbnail' },
    });

    const res = await request(app)
      .post('/api/challenges')
      .send({
        title: 'New Challenge',
        description: 'Description',
        gameId: 1,
      });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("No token provided");
  });

  it("should return 400 error if a required field is missing in the body", async () => {
    vi.spyOn(gameService, 'fetchGame').mockResolvedValue({
      ok: true,
      data: { name: 'Game 1', background_image: 'Game 1 thumbnail' },
    });

    const user = await prisma.user.create({
      data: {
        username: 'usertest',
        email: 'usertest@test.com',
        password: 'password',
        birthdate: new Date()
      }
    });

    const res = await request(app)
      .post('/api/challenges')
      .send({
        description: 'Description',
        gameId: 1,
      })
      .set("Authorization", `Bearer ${generateJWTToken(user.id)}`);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});

describe("GET /api/challenges/:id/participations", () => {
  it('should return formatted challenge', async () => {
    const user = await prisma.user.create({
      data: {
        username: 'usertest',
        email: 'usertest@test.com',
        password: 'password',
        birthdate: new Date()
      }
    });

    const challenge = await prisma.challenge.create({
      data: {
        title: 'Title',
        description: 'Description',
        conditions: 'Conditions',
        userId: user.id,
        gameId: 1,
        gameTitle: 'Game Title',
        gameThumbnail: 'Game Thumbnail',
      }
    });

    const res = await request(app).get(`/api/challenges/${challenge.id}/participations`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(challenge.id);
    expect(res.body.participations).toStrictEqual([]);
  });

  it("should return 404 if no challenge is found", async () => {
    const res = await request(app).get('/api/challenges/999/participations');

    expect(res.status).toBe(404);
    expect(res.body.error).toEqual("Challenge not found");
  });

  it("should return 400 if id is not valid", async () => {
    const res = await request(app).get('/api/challenges/abc/participations');

    expect(res.status).toBe(400);
    expect(res.body.error).toEqual("Challenge ID must be a number");
  });
});

describe("POST /api/challenges/:id/vote", () => {
  it("should create a vote", async () => {
    const user = await prisma.user.create({
      data: {
        username: 'usertest',
        email: 'usertest@test.com',
        password: 'password',
        birthdate: new Date()
      }
    });

    const challenge = await prisma.challenge.create({
      data: {
        title: 'Title',
        description: 'Description',
        conditions: 'Conditions',
        userId: user.id,
        gameId: 1,
        gameTitle: 'Game Title',
        gameThumbnail: 'Game Thumbnail',
      }
    });

    const res = await request(app)
      .post(`/api/challenges/${challenge.id}/votes`)
      .send({ rating: 4 })
      .set("Authorization", `Bearer ${generateJWTToken(user.id)}`);

    expect(res.status).toBe(201);
    expect(res.body.rating).toBe(4);
    expect(res.body.userId).toBe(user.id);
  });

  it("should return 409 error if user has already voted", async () => {
    const user = await prisma.user.create({
      data: {
        username: 'usertest',
        email: 'usertest@test.com',
        password: 'password',
        birthdate: new Date()
      }
    });

    const challenge = await prisma.challenge.create({
      data: {
        title: 'Title',
        description: 'Description',
        conditions: 'Conditions',
        userId: user.id,
        gameId: 1,
        gameTitle: 'Game Title',
        gameThumbnail: 'Game Thumbnail',
      }
    });

    await prisma.voteChallenge.create({
      data: {
        userId: user.id,
        challengeId: challenge.id,
        rating: 5,
      },
    });

    const res = await request(app)
      .post(`/api/challenges/${challenge.id}/votes`)
      .send({ rating: 4 })
      .set("Authorization", `Bearer ${generateJWTToken(user.id)}`);

    expect(res.status).toBe(409);
    expect(res.body.error).toBe("A user can only vote once for a challenge");
  });

  it("should return 401 if no token is provided", async () => {
    const res = await request(app)
      .post(`/api/challenges/123/votes`)
      .send({ rating: 4 });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("No token provided");
  });
});