import { rpc } from "../../api/rpc";

export function DiscoveryMode() {
  async function handleJoin(teamId: string) {
    await rpc.requestJoin(teamId);
    window.location.reload();
  }

  return (
    <div>
      <h2>Explore Teams</h2>

      {/* Temporary example */}
      <button onClick={() => handleJoin("TEAM_ID_HERE")}>
        Request Join
      </button>
    </div>
  );
}
