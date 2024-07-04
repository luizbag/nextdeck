export default function Game({ params }: { params: { gameId: string } }) {
  return <h1>Game {params.gameId}</h1>;
}
