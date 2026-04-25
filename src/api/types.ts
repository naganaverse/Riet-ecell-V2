export type UserRole = 'member' | 'leader' | 'mentor';
export type InvitationStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled';
export type InvitationType = 'invite' | 'request';

export interface Profile {
  id: string;
  full_name: string | null;
  whatsapp_no: string | null;
  role: UserRole | null;
  team_id: string | null;
  is_verified: boolean;
  roll_no: string | null;
  department: string | null;
}

export interface Team {
  id: string;
  name: string;
  idea: string | null;
  leader_id: string;
  mentor_id: string | null;
  team_code: string;
  members_count: number;
}

export interface Invitation {
  id: string;
  team_id: string;
  from_user_id: string;
  to_user_id: string;
  type: InvitationType;
  status: InvitationStatus;
  created_at: string;
  }
