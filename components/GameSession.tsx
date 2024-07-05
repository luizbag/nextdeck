"use client";
import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import Game from "@/components/Game";
import { useState } from "react";
import { Player } from "@/lib/Player";

export default function GameSession() {
  const client = new Ably.Realtime({ authUrl: "/api" });
  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName="nextdeck">
        <Game />
      </ChannelProvider>
    </AblyProvider>
  );
}
