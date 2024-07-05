import { Player } from "@/lib/Player";
import PlayerCard from "./PlayerCard";

export default function Players({ players }: { players: Player[] }) {
  return (
    <div className="row">
      {players.map((player, index) => {
        return <PlayerCard player={player} key={index} />;
      })}
    </div>
  );
}
