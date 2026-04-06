export async function fetchGame(gameId: number) {
  const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${process.env.RAWG_API_KEY}`);
  
  if (!response.ok) {
    return { ok: false, message: "Invalid game ID" };
  }

  return { ok: true, data: await response.json() };
}