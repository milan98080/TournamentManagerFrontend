import axios from "axios";
import { API } from "./api";
import { useQuery } from "react-query";

async function GetAllTournaments() {
  try {
    const response = await axios.get(`${API}/players`);
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
}

export const useGetAllTournaments = () => {
  return useQuery({
    queryKey: "tournaments",
    queryFn: () => GetAllTournaments(),
  });
};

async function GetProductionData(id: any) {
  try {
    const response = await axios.get(`${API}/${id}`);
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
}

export const useGetProductionData = (id: any) => {
  return useQuery({
    queryKey: "productionData",
    queryFn: () => GetProductionData(id),
  });
};

export interface CreateTournamentPayload {
  tournament_name: string;
  tournament_logo: string;
  tournament_schedule: string;
  current_stage: string;
  current_day: number;
  current_match: number;
}

export async function CreateTournament(payload: CreateTournamentPayload) {
  try {
    const response = await axios.post(`${API}`, payload);
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
}

export async function uploadImage(payload: any) {
  try {
    const response = await axios.post(`${API}/image`, payload);
    const data = await response.data;
    console.log(data);
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
}

export interface CreateTeamPayload {
  team_name: string;
  team_tag: string;
  team_logo: string;
  team_is_alive: boolean;
  team_players_alive: number;
  team_players_knocked: number;
  team_current_kills: number;
  team_current_position_points: number;
  team_current_total_points: number;
  team_is_winner: boolean;
  team_overall_kills: number;
  team_overall_position_points: number;
  team_overall_total_points: number;
  team_overall_chicken: number;
}

export async function CreateTeam(payload: CreateTeamPayload) {
  try {
    const response = await axios.post(`${API}/team`, payload);
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
}

export interface CreatePlayerPayload {
  player_name: string;
  player_is_alive: boolean;
  player_is_knocked: boolean;
  player_current_kills: number;
  player_overall_kills: number;
  player_image: string;
}

export async function CreatePlayer(payload: CreatePlayerPayload) {
  try {
    const response = await axios.post(`${API}/player`, payload);
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
}

export async function EditTournament(
  tournament_id: number,
  payload: CreateTournamentPayload
) {
  try {
    const response = await axios.patch(`${API}/${tournament_id}`, payload);
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
}

export async function EditTeam(team_id: number, payload: CreateTeamPayload) {
  try {
    const response = await axios.patch(`${API}/team/${team_id}`, payload);
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
}

export async function EditPlayer(
  player_id: number,
  payload: CreatePlayerPayload
) {
  try {
    const response = await axios.patch(`${API}/player/${player_id}`, payload);
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
}

export async function DeleteTournament(tournament_id: number) {
  try {
    const response = await axios.delete(`${API}/${tournament_id}`);
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
}

export async function DeleteTeam(team_id: number) {
  try {
    const response = await axios.delete(`${API}/team/${team_id}`);
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
}

export async function DeletePlayer(player_id: number) {
  try {
    const response = await axios.delete(`${API}/player/${player_id}`);
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
}
