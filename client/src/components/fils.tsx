import { v4 as uuidv4 } from "uuid"; // Import uuid for generating the session token
import { NextResponse } from "next/server";

const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);

  const searchText = searchParams.get("q");

  // Generate a dynamic session token
  const sessionToken = uuidv4();

  const res = await fetch(
    BASE_URL +
      "?q=" +
      searchText +
      "&language=en&limit=6&session_token=" +
      sessionToken +
      "&access_token=" +
      process.env.MAPBOX_ACCESS_TOKEN,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const searchResult = await res.json();
  return NextResponse.json(searchResult);
}
