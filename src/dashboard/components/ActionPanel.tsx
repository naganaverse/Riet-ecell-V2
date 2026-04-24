import { rpc } from "../../api/rpc";

export function ActionPanel({ role }: { role: "leader" | "member" | null }) {
  async function handleLeave() {
    await rpc.leaveTeam();
    window.location.reload();
  }

  return (
    <div>
      {role === "leader" && (
        <button onClick={() => console.log("Invite flow later")}>
          Invite Member
        </button>
      )}

      <button onClick={handleLeave}>
        Leave Team
      </button>
    </div>
  );
}
