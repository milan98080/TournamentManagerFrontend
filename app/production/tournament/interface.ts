export interface PlayerData {
    player_id: number;
    player_name: string;
    player_is_alive: boolean;
    player_is_knocked: boolean;
    player_current_kills: number;
    player_image: string;
}

export interface TeamData {
    team_id: number;
    team_name: string;
    team_tag: string;
    team_logo: string;
    team_is_alive: boolean;
    team_players_alive: number;
    team_players_knocked: number;
    team_current_kills: number;
    player: PlayerData[];
}

export interface TournamentData {
    tournament_id: number;
    tournament_name: string;
    tournament_logo: string;
    tournament_schedule: string;
    current_stage: string;
    current_day: number;
    current_match: number;
    team: TeamData[];
}
