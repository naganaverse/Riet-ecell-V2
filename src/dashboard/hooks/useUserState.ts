import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/api/client";

// Defined based on our core logic map
export type UserState = "NO_TEAM" | "PENDING" | "MEMBER" | "LEADER";

interface UserStateResult {
  state: UserState;
  profile: any;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useUserState(): UserStateResult {
  const [state, setState] = useState<UserState>("NO_TEAM");
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchState = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Check Auth Session
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error("Authentication required");
      }

      // 2. Fetch Profile (matches your specific 'profiles' schema)
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id, full_name, team_id, role, is_verified")
        .eq("id", user.id)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // 3. Logic: If user is already in a team
      if (profileData.team_id) {
        const { data: teamData, error: teamError } = await supabase
          .from("teams")
          .select("leader_id")
          .eq("id", profileData.team_id)
          .single();

        if (teamError) throw teamError;

        // Compare Auth UID with Team Leader ID
        if (teamData.leader_id === user.id) {
          setState("LEADER");
        } else {
          setState("MEMBER");
        }
        return; 
      }

      // 4. Logic: If no team, check for incoming pending invitations
      // We only check 'to_user_id' per your production-ready fix
      const { data: invites, error: inviteError } = await supabase
        .from("invitations")
        .select("id")
        .eq("to_user_id", user.id)
        .eq("status", "pending")
        .limit(1);

      if (inviteError) throw inviteError;

      if (invites && invites.length > 0) {
        setState("PENDING");
      } else {
        setState("NO_TEAM");
      }

    } catch (err: any) {
      console.error("Dashboard State Sync Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  return {
    state,
    profile,
    loading,
    error,
    refetch: fetchState,
  };
            }
