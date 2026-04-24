export function TeamHeader({
  team,
}: {
  team: { name: string; team_code?: string; idea?: string };
}) {
  return (
    <div>
      <h2>{team.name}</h2>

      {team.idea && <p>{team.idea}</p>}

      {team.team_code && (
        <small>Code: {team.team_code}</small>
      )}
    </div>
  );
}
