import Link from 'next/link';
import { useGetAllTournaments } from '@/utils/tournamentquery'
export default function Tournaments() {
    const { data, isLoading, refetch } = useGetAllTournaments();
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='w-full'>
            <div className='flex w-full px-20 py-3 mr-10 justify-between items-center'>
                <h1>All Available Tournaments</h1>
                <button onClick={() => refetch()}>Refetch Tournaments</button>
            </div>
            <ul>
                {data.map((tournament: any) => (
                    <li key={tournament.tournament_id}>
                        <Link href={{
                            pathname:'/production/tournament',
                            query: {id: tournament.tournament_id}
                        }}>
                            {tournament.tournament_name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
