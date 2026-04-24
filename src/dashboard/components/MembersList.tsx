interface Member {
  id: string;
  full_name: string;
  role: string;
}

export function MembersList({ members }: { members: Member[] }) {
  return (
    <div>
      <h3>Team Members</h3>

      <ul>
        {members.map((m) => (
          <li key={m.id}>
            {m.full_name} {m.role === "leader" ? "👑" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
