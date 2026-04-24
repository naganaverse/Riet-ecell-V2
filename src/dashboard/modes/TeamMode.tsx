import { useTeamData } from "../hooks/useTeamData";

import { TeamHeader } from "../components/TeamHeader";
import { MembersList } from "../components/MembersList";
import { ActionPanel } from "../components/ActionPanel";
import { InvitationsList } from "../components/InvitationsList";

export function TeamMode() {
  const { team, members, invitations, role, loading, error } = useTeamData();

  if (loading) return <p>Loading team...</p>;
  if (error) return <p>Error loading team</p>;
  if (!team) return null;

  return (
    <div>
      <TeamHeader teamName={team.name} />

      <MembersList members={members} />

      {/* Only leader sees requests */}
      {role === "leader" && (
        <InvitationsList invitations={invitations} />
      )}

      <ActionPanel role={role} />
    </div>
  );
}
