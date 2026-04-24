import { useUserState } from "./hooks/useUserState";
import { DiscoveryMode } from "./modes/DiscoveryMode";
import { PendingMode } from "./modes/PendingMode";
import { TeamMode } from "./modes/TeamMode";

export default function Dashboard() {
  const { state, loading, error } = useUserState();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (state === "NO_TEAM") return <DiscoveryMode />;
  if (state === "PENDING") return <PendingMode />;
  if (state === "MEMBER" || state === "LEADER") return <TeamMode />;

  return null;
}
