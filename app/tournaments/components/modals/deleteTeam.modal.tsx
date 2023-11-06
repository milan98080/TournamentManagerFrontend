import { DeleteTeam } from '../../../../utils/tournamentquery';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Modal } from '../modal';
import toast from 'react-hot-toast';

interface DeleteTeamModalProps {
    deleteTeamModal: boolean;
    setDeleteTeamModal: Dispatch<SetStateAction<boolean>>;
    refetch?: any;
    teamData?: any;
}

export const DeleteTeamModal = ({
    deleteTeamModal,
    setDeleteTeamModal,
    refetch,
    teamData,
}: DeleteTeamModalProps) => {
    const {
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const { mutate } = useMutation({
        mutationFn: async (payload: number) => {
            const data = await DeleteTeam(payload);
            if (data.error) {
                toast.error(data.message);
            } else {
                toast.success('Successfully Deleted!');
                reset();
                setDeleteTeamModal(false);
                refetch();
            }
        },
    });

    const resetData = useMutation({
        mutationFn: async () => {
            reset();
            setDeleteTeamModal(false);
        },
    });

    const onSubmit = async (data: any) => {
        try {
            mutate(teamData.team_id);
        } catch (error) {
            // Handle errors from handleUpload
            console.error('Error handling upload:', error);
        }
    };

    return (
        <Modal modal={deleteTeamModal} setModal={setDeleteTeamModal}>
            <div className='relative flex px-5 pt-2 justify-end'>
                <p className='text-xl cursor-pointer' onClick={
                    () => {
                        resetData.mutate();
                    }
                }>X</p>
            </div>
            <div className="px-10 pb-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-5">
                        <h1 className="font-semibold text-center text-2xl">Are you sure you want to delete {teamData ? teamData.team_name : ''}?</h1>
                        <div className='flex justify-end gap-10'>
                            <button className='btn' onClick={()=>resetData.mutate()}>
                                Cancel
                            </button>
                            <button type="submit" className='btn bg-red-600 text-white'>
                                Delete
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
};
