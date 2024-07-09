import { MouseEventHandler } from "react";

export default function PlayingCard({
  value,
  onVote,
}: {
  value: React.ReactNode;
  onVote: MouseEventHandler;
}) {
  return (
    <div className="col text-center">
      <div className="card card-size card-front shadow" onClick={onVote}>
        <div className="card-body">{value}</div>
      </div>
    </div>
  );
}
