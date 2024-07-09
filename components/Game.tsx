"use client";
import { useEffect, useState } from "react";
import PlayingCard from "./PlayingCard";
import Players from "./Players";
import { Player } from "@/lib/Player";
import { useChannel, usePresence, usePresenceListener } from "ably/react";
import shortUUID from "short-uuid";
import PlayerName from "./PlayerName";
import { Message } from "ably";

export default function Game({
  channelName,
  gameId,
}: {
  channelName: string;
  gameId: string;
}) {
  const [player, setPlayer] = useState<Player>(
    new Player(shortUUID.generate(), "You")
  );
  const [players, setPlayers] = useState<Player[]>([player]);
  const fibonacci = [1, 2, 3, 5, 8, 13, 21, "?"];
  const { channel, ably } = useChannel(channelName, (message) => {
    console.log(message);
    if (message.connectionId !== ably.connection.id) {
      switch (message.name) {
        case "vote":
          handleVoteMessage(message);
          break;
        case "show":
          showVotes();
          break;
        case "reset":
          resetVotes();
          break;
      }
    }
  });

  const { updateStatus } = usePresence(channelName, player);

  const { presenceData } = usePresenceListener<Player>(channelName);

  useEffect(() => {
    console.log(presenceData);
    const ps = presenceData.map((presence, i) => {
      let p: Player;
      p = presence.data;
      return p;
    });
    setPlayers(ps);
  }, [presenceData]);

  function handleVoteMessage(message: Message) {
    let p = players.find((i) => i.id === message.data.playerId);
    if (p) {
      p.choice = message.data.vote;
      p.done = true;
      updatePlayers(p);
    }
  }

  function onVote(value: string | number) {
    player.choice = value;
    player.done = true;
    setPlayer(player);
    updatePlayers(player);
    const message = {
      playerId: player.id,
      vote: player.choice,
    };
    channel.publish("vote", message);
  }

  function updatePlayers(player: Player) {
    setPlayers([player, ...players.filter((i) => i.id !== player.id)]);
  }

  function showVotes() {
    const ps = players.map((player, i) => {
      player.reveal = true;
      return player;
    });
    setPlayers(ps);
  }

  function onShowVotes() {
    showVotes();
    channel.publish("show", {});
  }

  function resetVotes() {
    player.choice = "";
    setPlayer(player);
    const ps = players.map((player, i) => {
      player.choice = "";
      player.done = false;
      player.reveal = false;
      return player;
    });
    setPlayers(ps);
  }

  function onResetVotes() {
    resetVotes();
    channel.publish("reset", {});
  }

  function setPlayerName(name: string) {
    player.name = name;
    setPlayer(player);
    updateStatus(player);
    updatePlayers(player);
  }

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col me-2">
          <div className="shadow p-3">
            <div className="row">
              <div className="col">
                <p className="fs-2">Game {gameId}</p>
              </div>
              <PlayerName setPlayerName={setPlayerName} />
            </div>
            <Players players={players} />
            <div className="row mt-3">
              <p className="fs-3">Choose a card</p>
              {fibonacci.map((fib, i) => {
                return (
                  <PlayingCard value={fib} key={i} onVote={() => onVote(fib)} />
                );
              })}
            </div>
            <div className="row mt-3">
              <div className="col text-center">
                <button className="btn btn-primary" onClick={onShowVotes}>
                  Show Votes
                </button>
              </div>
              <div className="col text-center">
                <button className="btn btn-secondary" onClick={onResetVotes}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
