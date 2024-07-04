"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function JoinGame() {
  const router = useRouter();
  const [gameId, setGameId] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!gameId) return;
    router.push("/game/" + gameId);
  }

  return (
    <div className="container text-center mt-5">
      <h2>Join a game</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mt-5">
          <div className="col">
            <input
              type="text"
              id="gameId"
              name="gameId"
              className="form-control"
              placeholder="Game Id"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col">
            <button type="submit" className="btn btn-primary">
              Game On
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
