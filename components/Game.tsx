import { useParams } from "next/navigation";
import { useState } from "react";
import PlayingCard from "./PlayingCard";
import Players from "./Players";
import { Player } from "@/lib/Player";

export default function Game() {
  const params = useParams<{ gameId: string }>();
  const [inputEnabled, setInputEnabled] = useState<boolean>(true);
  const [player, setPlayer] = useState<Player>(new Player("You"));
  const [players, setPlayers] = useState<Player[]>([player]);
  const [name, setName] = useState<string>("");
  const fibonacci = [1, 2, 3, 5, 8, 13, 21, "?"];

  function handleInputBlur() {
    if (!name) return;
    setInputEnabled(false);
  }

  function onVote(value: string | number) {
    player.choice = value;
    player.done = true;
    setPlayer(player);
    setPlayers([player, ...players.slice(1, players.length - 1)]);
  }

  function showVotes() {
    const ps = players.map((player, i) => {
      player.reveal = true;
      return player;
    });
    setPlayers(ps);
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

  function setPlayerName(name: string) {
    setName(name);
    player.name = name;
    setPlayer(player);
  }

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col me-2">
          <div className="shadow p-3">
            <div className="row">
              <div className="col">
                <p className="fs-2">Game {params.gameId}</p>
              </div>
              <div className="col-4">
                <p className="fs-2">
                  {inputEnabled && (
                    <input
                      type="text"
                      placeholder="User Name"
                      className="form-control"
                      value={name}
                      onChange={(e) => setPlayerName(e.target.value)}
                      onBlur={() => handleInputBlur()}
                    ></input>
                  )}
                  {!inputEnabled && (
                    <>
                      {name}
                      <button
                        className="btn btn-secondary ms-3"
                        onClick={() => setInputEnabled(true)}
                      >
                        Change Name
                      </button>
                    </>
                  )}
                </p>
              </div>
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
                <button className="btn btn-primary" onClick={showVotes}>
                  Show Votes
                </button>
              </div>
              <div className="col text-center">
                <button className="btn btn-secondary" onClick={resetVotes}>
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
