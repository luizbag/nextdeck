"use client";
import { v4 } from "uuid";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  const gameId = v4();
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" href={"/"}>
          NextDeck
        </Link>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={() => router.push("/game/" + gameId)}
        >
          <i className="bi bi-plus"></i> New Game
        </button>
      </div>
    </nav>
  );
}
