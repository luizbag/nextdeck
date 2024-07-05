import dynamic from "next/dynamic";

const GameSession = dynamic(() => import("@/components/GameSession"), {
  ssr: false,
});

export default function GamePage() {
  return <GameSession />;
}
