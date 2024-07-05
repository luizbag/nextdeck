"use client";
import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import Game from "@/components/Game";
import { useParams } from "next/navigation";

export default function GameSession() {
  const client = new Ably.Realtime({ authUrl: "/api" });
  const params = useParams<{ gameId: string }>();
  const channelName = "nextdeck:" + params.gameId;
  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName={channelName}>
        <Game channelName={channelName} gameId={params.gameId} />
      </ChannelProvider>
    </AblyProvider>
  );
}
