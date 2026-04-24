import { useEffect, useState } from "react";
import { supabase } from "../../api/client";

export function useTeamData() {
  const [team, setTeam] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [invitations, setInvitations] = useState<any[]>([]);
  const [role, setRole] = useState<"leader" | "member" | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTeamData() {
      try {
        // 1. Get user
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) throw new Error("User not found");

        // 2. Get profile
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("team_id, role")
          .eq("id", user.id)
          .single();

        if (profileError) throw profileError;

        if (!profile.team_id) {
          setLoading(false);
          return;
        }

        setRole(profile.role);

        // 3. Get team
        const { data: teamData, error: teamError } = await supabase
          .from("teams")
          .select("*")
          .eq("id", profile.team_id)
          .single();

        if (teamError) throw teamError;
        setTeam(teamData);

        // 4. Get members
        const { data: membersData, error: membersError } = await supabase
          .from("profiles")
          .select("id, full_name, role")
          .eq("team_id", profile.team_id);

        if (membersError) throw membersError;
        setMembers(membersData || []);

        // 5. Get invitations (only useful for leader)
        const { data: invitesData, error: invitesError } = await supabase
          .from("invitations")
          .select("*")
          .eq("team_id", profile.team_id)
          .eq("status", "pending");

        if (invitesError) throw invitesError;
        setInvitations(invitesData || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTeamData();
  }, []);

  return {
    team,
    members,
    invitations,
    role,
    loading,
    error,
  };
    }
