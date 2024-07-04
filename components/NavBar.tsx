"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import shortUUID from "short-uuid";

export default function NavBar() {
  const router = useRouter();
  const gameId = shortUUID.generate();
  const pathName = usePathname();
  const showNewGame = !pathName.includes("game");

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" href={"/"}>
          NextDeck
        </Link>
        {showNewGame && (
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() => router.push("/game/" + gameId)}
          >
            <i className="bi bi-plus"></i> New Game
          </button>
        )}
      </div>
    </nav>
  );
}
