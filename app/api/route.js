import Ably from "ably";

export const revalidate = 0;

export async function GET(request) {
  try {
    console.log(request);
    const client = new Ably.Rest(process.env.ABLY_API_KEY);
    const tokenRequestData = await client.auth.createTokenRequest({
      clientId: "nextdeck",
    });
    return Response.json(tokenRequestData);
  } catch {
    console.log("ERROR");
  }
}
