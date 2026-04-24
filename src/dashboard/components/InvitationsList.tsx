import { rpc } from "../../api/rpc";

export function InvitationsList({ invitations }: { invitations: any[] }) {
  async function handleAccept(id: string) {
    await rpc.acceptInvitation(id);
    window.location.reload(); // simple refresh (mobile friendly)
  }

  return (
    <div>
      <h3>Join Requests</h3>

      <ul>
        {invitations.map((inv) => (
          <li key={inv.id}>
            {inv.from_user_id}

            <button onClick={() => handleAccept(inv.id)}>
              Accept
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
