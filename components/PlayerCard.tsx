import { Player } from "@/lib/Player";

export default function PlayerCard({ player }: { player: Player }) {
  function Icon({ done }: { done: boolean }) {
    if (done) return <i className="bi bi-check"></i>;
    else return <i className="bi bi-hourglass-split"></i>;
  }

  return (
    <div className="col text-center">
      <div className="card card-size card-back shadow">
        <div className="card-title">
          <p className="text-light">
            {player.name}
            <Icon done={player.done}></Icon>
          </p>
        </div>
        <div className="card-body text-light">
          {player.reveal && player.choice}
        </div>
      </div>
    </div>
  );
}
