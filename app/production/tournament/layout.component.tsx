'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CreateTournamentPayload, EditTournament, useGetProductionData } from '@/utils/tournamentquery'
import TeamComponent from './components/TeamComponent'

const TournamentProd = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const { data, isLoading, refetch } = useGetProductionData(id)
    const [updatedData, setUpdatedData] = useState({
        current_stage: '',
        current_day: '',
        current_match: '',
    });

    useEffect(() => {
        if (data) {
            setUpdatedData({
                current_stage: data.current_stage,
                current_day: data.current_day,
                current_match: data.current_match,
            });
        }
    }, [data]);

    const handleUpdateTournament = async () => {
        if (!updatedData) {
            return; // Don't update if data is not available
        }

        try {
            const updatedPayload: CreateTournamentPayload = {
                tournament_name: data.tournament_name, // You might need to fetch this from data or have it available
                tournament_logo: data.tournament_logo, // You might need to fetch this from data or have it available
                tournament_schedule: data.tournament_schedule, // You might need to fetch this from data or have it available
                current_stage: updatedData.current_stage,
                current_day: parseInt(updatedData.current_day),
                current_match: parseInt(updatedData.current_match),
            };

            const response = await EditTournament(data.tournament_id, updatedPayload);

            if (response.status === 200) {
                refetch();
            }
        } catch (error) {
            console.error('Error updating tournament:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div className="w-full h-full mr-5 bg-white border border-gray-300 rounded-md">
            <div className="w-full bg-white rounded-md flex items-center justify-between px-4" style={{ height: '8%' }}>
                <img className="h-full py-1 px-10" src={data.tournament_logo} alt="logo" />
                <h1 className="text-xl font-semibold ">{data.tournament_name}</h1>
                <div className="flex gap-2 items-center text-lg font-semibold">
                    <h1>Stage :</h1>
                    <input
                        type="text"
                        placeholder="Stage"
                        value={updatedData.current_stage}
                        onChange={(e) => setUpdatedData({ ...updatedData, current_stage: e.target.value })}
                        className="input text-center input-bordered input-secondary w-40 max-w-xs"
                    />
                </div>
                <div className="flex items-center w-1/3 gap-7 justify-end pr-10">
                    <div className="flex gap-2 items-center text-lg font-semibold">
                        <h1>Day :</h1>
                        <input
                            type="text"
                            placeholder="Day"
                            value={updatedData.current_day}
                            onChange={(e) => setUpdatedData({ ...updatedData, current_day: e.target.value })}
                            className="input text-center input-bordered input-primary w-20 max-w-xs"
                        />
                    </div>
                    <div className="flex gap-2 items-center text-lg font-semibold">
                        <h1>Match :</h1>
                        <input
                            type="text"
                            placeholder="Match"
                            value={updatedData.current_match}
                            onChange={(e) => setUpdatedData({ ...updatedData, current_match: e.target.value })}
                            className="input text-center input-bordered input-secondary w-20 max-w-xs"
                        />
                    </div>
                    <button className="btn btn-accent" onClick={handleUpdateTournament}>Update</button>
                </div>
            </div>
            <div className="w-full grid grid-cols-4 grid-rows-5 gap-2" style={{ height: '92%' }}>
                {data.team.map((team: any) => (
                    <TeamComponent key={team.team_id} {...team} />
                ))}
            </div>
        </div>
    )
}

export default TournamentProd
