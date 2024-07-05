export default function PreviousGames({
  games,
}: {
  games: (string | number)[];
}) {
  return (
    <>
      <p className="fs-2">Previous Games</p>
      <ul>
        {games.map((game, i) => {
          return <li key={i}>{game}</li>;
        })}
      </ul>
    </>
  );
}
