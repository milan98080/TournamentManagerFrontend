import React, { useEffect } from 'react';
import { PlayerData } from '../interface';

interface PlayerProps {
    player: PlayerData;
    teamIsAlive: boolean;
}

const PlayerComponent: React.FC<PlayerProps> = ({
    player,
    teamIsAlive,
}) => {
    // Initialize player's states based on the team's state
    const initialPlayerAlive = teamIsAlive ? player.player_is_alive : false;
    const initialPlayerKnocked = teamIsAlive ? player.player_is_knocked : false;

    const [isPlayerKnocked, setIsPlayerKnocked] = React.useState<boolean>(initialPlayerKnocked);
    const [isPlayerAlive, setIsPlayerAlive] = React.useState<boolean>(initialPlayerAlive);
    const [playerKills, setPlayerKills] = React.useState<number>(player.player_current_kills);

    const changePlayerKnockedStatus = () => {
        setIsPlayerKnocked(!isPlayerKnocked);
    };

    const changePlayerAliveStatus = () => {
        setIsPlayerAlive(!isPlayerAlive)
        setIsPlayerKnocked(false);
    };

    const incrementKills = () => {
        setPlayerKills(playerKills + 1);

        // Check if player was killed and set is_knocked to false
        if (isPlayerKnocked) {
            setIsPlayerKnocked(false);
        }
    };

    const decrementKills = () => {
        if (playerKills > 0) {
            setPlayerKills(playerKills - 1);
        }
    };

    // Use useEffect to update player states when teamIsAlive changes
    useEffect(() => {
        // Check if the team is not alive, and update player states accordingly
        if (!teamIsAlive) {
            setIsPlayerKnocked(false);
            setIsPlayerAlive(false);
        }
    }, [teamIsAlive]);

    return (
        <div key={player.player_id} className='grid grid-rows-3 border border-gray-300'>
            <h1 className="row-span-1 text-xl font-semibold text-center">{player.player_name}</h1>
            <div className='row-span-2 grid grid-cols-3'>
                <div className="col-span-1 grid grid-rows-2">
                    <div className='row-span-1 flex justify-center items-center'>
                        <input
                            placeholder='isPlayerKnocked'
                            type="checkbox"
                            className="toggle toggle-sm toggle-warning"
                            disabled={!isPlayerAlive}
                            checked={isPlayerKnocked}
                            onClick={changePlayerKnockedStatus}
                        />
                    </div>
                    <div className='row-span-1 flex justify-center items-center'>
                        <input
                            placeholder='isPlayerAlive'
                            type="checkbox"
                            className="toggle toggle-sm toggle-success"
                            checked={isPlayerAlive}
                            onClick={changePlayerAliveStatus}
                            disabled={!teamIsAlive}
                        />
                    </div>
                </div>
                <div className="col-span-2 flex justify-between items-center m-1">
                    <button className="btn btn-sm rounded-full bg-red-600 w-0" onClick={decrementKills}>-</button>
                    <span className="text-xl font-semibold">{playerKills}</span>
                    <button className="btn btn-sm rounded-full bg-green-600 w-0" onClick={incrementKills}>+</button>
                </div>
            </div>
        </div>
    );
};

export default PlayerComponent;
