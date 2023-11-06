/* eslint-disable @next/next/no-img-element */
import React, { useMemo, useState } from 'react';
import { useGetAllTournaments } from '../../utils/tournamentquery';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { AddTournamentModal } from './components/modals/addTournament.modal';
import { AddTeamModal } from './components/modals/addTeam.modal';
import { AddPlayerModal } from './components/modals/addPlayer.modal';
import { EditTournamentModal } from './components/modals/editTournament.modal';
import { EditTeamModal } from './components/modals/editTeam.modal';
import { EditPlayerModal } from './components/modals/editPlayer.modal';
import { DeleteTournamentModal } from './components/modals/deleteTournament.modal';
import { DeleteTeamModal } from './components/modals/deleteTeam.modal';
import { DeletePlayerModal } from './components/modals/deletePlayer.modal';

const CourseTable = () => {
    const [expandedRows, setExpandedRows] = useState<any>(null);
    const [teamExpandedRows, setTeamExpandedRows] = useState<any>(null);

    const { data, isLoading, refetch } = useGetAllTournaments();
    const containerStyle = useMemo(() => ({ width: '100%', height: '80vh' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const imageBodyTemplate = (data: any) => {
        return (
            <img
                src={data.tournament_logo || data.team_logo || data.player_image}
                alt={'image'}
                className="h-10"
            />
        );
    };

    const editTournamentButton = (data: any) => {
        return (
            <div className="flex flex-wrap items-center justify-around gap-2">
                <button
                    onClick={() => {
                        setEditTournamentData(data);
                        setEditTournamentModal(true)
                    }}
                    className="btn px-6 py-0"
                >
                    Edit
                </button>
                <button
                    onClick={() => {
                        setDeleteTournamentData(data);
                        setDeleteTournamentModal(true)
                    }}
                    className="btn px-6 py-0 bg-red-600 text-white"
                >
                    Delete
                </button>
            </div>
        );
    }

    const editTeamButton = (data: any) => {
        return (
            <div className="flex flex-wrap items-center justify-around gap-2">
                <button
                    onClick={() => {
                        setEditTeamData(data);
                        setEditTeamModal(true)
                    }}
                    className="btn px-6 py-0"
                >
                    Edit
                </button>
                <button
                    onClick={() => {
                        setDeleteTeamData(data);
                        setDeleteTeamModal(true)
                    }}
                    className="btn px-6 py-0 bg-red-600 text-white"
                >
                    Delete
                </button>
            </div>
        );
    }

    const editPlayerButton = (data: any) => {
        return (
            <div className="flex flex-wrap items-center justify-around gap-2">
                <button
                    onClick={() => {
                        setEditPlayerData(data);
                        setEditPlayerModal(true)
                    }}
                    className="btn px-6 py-0"
                >
                    Edit
                </button>
                <button
                    onClick={() => {
                        setDeletePlayerData(data);
                        setDeletePlayerModal(true)
                    }}
                    className="btn px-6 py-0 bg-red-600 text-white"
                >
                    Delete
                </button>
            </div>
        );
    }

    const [addPlayerModal, setAddPlayerModal] = React.useState(false);
    const playerExpansionTemplate = (data: any) => {
        return (
            <div className="p-3 bg-blue-100">
                <div className="gap-2 p-2 flex flex-wrap items-center justify-between">
                    <p className="font-semibold text-lg text-blue-500">
                        Players for {data.team_name}
                    </p>
                    <button
                        onClick={() => setAddPlayerModal(true)}
                        className="btn px-6 py-0 mx-20"
                    >
                        Add Player
                    </button>
                </div>
                <DataTable removableSort value={data.player} className='items-center align-middle' >
                    <Column />
                    <Column />
                    <Column />
                    <Column
                        field="player_name"
                        header="Player Name"
                        sortable
                    ></Column>
                    <Column />
                    <Column />
                    <Column />
                    <Column />
                    <Column header="player_image" body={imageBodyTemplate}></Column>
                    <Column
                        body={null}
                        exportable={false}
                        style={{ minWidth: '12rem' }}
                    ></Column>
                    <Column
                        body={editPlayerButton}
                        exportable={false}
                        style={{ minWidth: '12rem' }}
                    ></Column>
                </DataTable>
            </div>
        );
    };

    const [addTeamModal, setAddTeamModal] = React.useState(false);

    const teamExpansionTemplate = (data: any) => {
        return (
            <div className="p-3 bg-green-100">
                <div className="gap-2 p-2 flex flex-wrap items-center justify-between">
                    <p className="font-semibold text-lg text-green-500">
                        Teams for {data.tournament_name}
                    </p>
                    <button
                        onClick={() => {
                            setAddTeamModal(true)
                        }}
                        className="btn px-6 py-0 mx-10"
                    >
                        Add Team
                    </button>
                </div>
                <DataTable
                    emptyMessage="No Teams found."
                    removableSort
                    value={data.team}
                    expandedRows={teamExpandedRows}
                    onRowToggle={(e) => setTeamExpandedRows(e.data)}
                    // onRowExpand={onRowExpand}
                    // onRowCollapse={onRowCollapse}
                    rowExpansionTemplate={playerExpansionTemplate}
                    dataKey="team_id"
                    tableStyle={{ minWidth: '60rem' }}
                >
                    <Column expander style={{ width: '5rem' }} />
                    <Column />
                    <Column field="team_name" header="Team Name" sortable></Column>
                    <Column />
                    <Column />
                    <Column />
                    <Column field="team_tag" header="Team Tag" ></Column>
                    <Column />
                    <Column />
                    <Column />
                    <Column header="Team Logo" body={imageBodyTemplate}></Column>
                    <Column />
                    <Column />
                    <Column />
                    <Column
                        body={editTeamButton}
                        exportable={false}
                        style={{ minWidth: '12rem' }}
                    ></Column>
                </DataTable>
            </div>
        );
    };

    const [addTournamentModal, setAddTournamentModal] = React.useState(false);
    const [editTournamentModal, setEditTournamentModal] = React.useState(false);
    const [editTournamentData, setEditTournamentData] = React.useState<any>(null)
    const [deleteTournamentModal, setDeleteTournamentModal] = React.useState(false);
    const [deleteTournamentData, setDeleteTournamentData] = React.useState<any>(null)
    const [editTeamData, setEditTeamData] = React.useState<any>(null)
    const [editTeamModal, setEditTeamModal] = React.useState(false);
    const [deleteTeamModal, setDeleteTeamModal] = React.useState<any>(null)
    const [deleteTeamData, setDeleteTeamData] = React.useState<any>(null)
    const [editPlayerData, setEditPlayerData] = React.useState<any>(null)
    const [editPlayerModal, setEditPlayerModal] = React.useState(false);
    const [deletePlayerModal, setDeletePlayerModal] = React.useState<any>(null)
    const [deletePlayerData, setDeletePlayerData] = React.useState<any>(null)

    const header = (
        <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xl text-900 font-bold">All Tournaments</span>
            <button
                onClick={() => setAddTournamentModal(true)}
                className="btn px-6 py-0"
            >
                Add Tournament
            </button>
        </div>
    );

    return (
        <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine">
                {isLoading ? (
                    'Loading'
                ) : (
                    <DataTable
                        emptyMessage="No Tournaments found."
                        header={header}
                        removableSort
                        value={data}
                        expandedRows={expandedRows}
                        onRowToggle={(e) => {
                            setExpandedRows(e.data)
                        }}
                        // onRowExpand={onRowExpand}
                        // onRowCollapse={onRowCollapse}
                        rowExpansionTemplate={teamExpansionTemplate}
                        dataKey="tournament_id"
                        tableStyle={{ minWidth: '60rem' }}
                    >
                        <Column expander style={{ width: '5rem' }} />
                        <Column filterElement field="tournament_name" header="Tournament" sortable />
                        <Column header="Tournament Logo" body={imageBodyTemplate}></Column>
                        <Column filterElement field="tournament_schedule" header="Tournament Schedule" />
                        <Column filterElement field="current_stage" header="Current Stage" />
                        <Column
                            body={editTournamentButton}
                            exportable={false}
                            style={{ minWidth: '12rem' }}
                        ></Column>
                    </DataTable>
                )}
            </div>

            <AddTournamentModal
                addTournamentModal={addTournamentModal}
                setAddTournamentModal={setAddTournamentModal}
                refetch={refetch}
            />

            <EditTournamentModal
                editTournamentModal={editTournamentModal}
                setEditTournamentModal={setEditTournamentModal}
                refetch={refetch}
                tournamentData={editTournamentData}
            />

            <DeleteTournamentModal
                deleteTournamentModal={deleteTournamentModal}
                setDeleteTournamentModal={setDeleteTournamentModal}
                refetch={refetch}
                tournamentData={deleteTournamentData}
            />

            <DeleteTeamModal
                deleteTeamModal={deleteTeamModal}
                setDeleteTeamModal={setDeleteTeamModal}
                refetch={refetch}
                teamData={deleteTeamData}
            />

            <DeletePlayerModal
                deletePlayerModal={deletePlayerModal}
                setDeletePlayerModal={setDeletePlayerModal}
                refetch={refetch}
                playerData={deletePlayerData}
            />

            <AddTeamModal
                addTeamModal={addTeamModal}
                setAddTeamModal={setAddTeamModal}
                refetch={refetch}
                teamData={expandedRows}
            />

            <EditTeamModal
                editTeamModal={editTeamModal}
                setEditTeamModal={setEditTeamModal}
                refetch={refetch}
                teamData={editTeamData}
            />

            <AddPlayerModal
                addPlayerModal={addPlayerModal}
                setAddPlayerModal={setAddPlayerModal}
                playerData={teamExpandedRows}
                refetch={refetch}
            />

            <EditPlayerModal
                editPlayerModal={editPlayerModal}
                setEditPlayerModal={setEditPlayerModal}
                refetch={refetch}
                playerData={editPlayerData}
            />

        </div>
    );
};
export default CourseTable;
