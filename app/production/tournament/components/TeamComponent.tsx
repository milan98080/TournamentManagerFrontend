import React from 'react'
import { TeamData } from '../interface'
import PlayerComponent from './PlayerComponent'

const TeamComponent: React.FC<TeamData> = (team) => {
    const [isTeamAlive, setIsTeamAlive] = React.useState<boolean>(team.team_is_alive)

    const changeTeamAlive = () => {
        setIsTeamAlive(!isTeamAlive)
    }
    return (
        <div key={team.team_id} className='grid grid-cols-12 border border-gray-300'>
            <div className="col-span-4 grid grid-rows-2 items-center justify-center">
                <img className="row-span-1 w-2/3 m-auto" src={team.team_logo} alt="logo" />
                <div className='row-span-1 grid grid-rows-2'>
                    <h1 className="row-span-1 text-xl font-semibold text-center">{team.team_tag}</h1>
                    <div className='row-span-1 flex justify-center items-center'>
                        <input placeholder='isTeamAlive' type="checkbox" className="toggle toggle-md toggle-success" checked={isTeamAlive} onClick={changeTeamAlive} />
                    </div>
                </div>
            </div>
            <div className="col-span-8 grid grid-rows-2 grid-cols-2 items-center justify-center">
                {team.player.map((player: any) => (
                    <PlayerComponent
                        key={player.player_id}
                        player={player} // Pass player as a prop
                        teamIsAlive={isTeamAlive} // Pass team_is_alive as a prop
                    />
                ))}
            </div>
        </div>
    )
}

export default TeamComponent
