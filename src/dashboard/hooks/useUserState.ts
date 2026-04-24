import { useEffect, useState } from "react";
import { supabase } from "../../api/client";

export type UserState = "NO_TEAM" | "PENDING" | "MEMBER" | "LEADER";

export function useUserState() {
  const [state, setState] = useState<UserState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchState() {
      try {
        // 1. Get logged in user
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setError("User not logged in");
          return;
        }

        // 2. Get profile
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("team_id, role")
          .eq("id", user.id)
          .single();

        if (profileError) throw profileError;

        // 3. Get pending invitations
        const { data: invites, error: inviteError } = await supabase
          .from("invitations")
          .select("id")
          .eq("to_user_id", user.id)
          .eq("status", "pending");

        if (inviteError) throw inviteError;

        // 4. Decide state
        if (!profile.team_id && (!invites || invites.length === 0)) {
          setState("NO_TEAM");
        } else if (!profile.team_id && invites.length > 0) {
          setState("PENDING");
        } else if (profile.team_id) {
          if (profile.role === "leader") {
            setState("LEADER");
          } else {
            setState("MEMBER");
          }
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchState();
  }, []);

  return { state, loading, error };
    }
