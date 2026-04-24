import { supabase } from "./client";

export const rpc = {
  acceptInvitation: async (invitationId: string) => {
    const { error } = await supabase.rpc("accept_invitation", {
      p_invitation_id: invitationId,
    });

    if (error) throw error;
  },

  leaveTeam: async () => {
    const { error } = await supabase.rpc("leave_team");

    if (error) throw error;
  },

  requestJoin: async (teamId: string) => {
    const { error } = await supabase.rpc("create_join_request", {
      p_team_id: teamId,
    });

    if (error) throw error;
  },
};
