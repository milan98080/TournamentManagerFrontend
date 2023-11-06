import { DeletePlayer } from '../../../../utils/tournamentquery';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Modal } from '../modal';
import toast from 'react-hot-toast';

interface DeletePlayerModalProps {
    deletePlayerModal: boolean;
    setDeletePlayerModal: Dispatch<SetStateAction<boolean>>;
    refetch?: any;
    playerData?: any;
}

export const DeletePlayerModal = ({
    deletePlayerModal,
    setDeletePlayerModal,
    refetch,
    playerData,
}: DeletePlayerModalProps) => {
    const {
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const { mutate } = useMutation({
        mutationFn: async (payload: number) => {
            const data = await DeletePlayer(payload);
            if (data.error) {
                toast.error(data.message);
            } else {
                toast.success('Successfully Deleted!');
                reset();
                setDeletePlayerModal(false);
                refetch();
            }
        },
    });

    const resetData = useMutation({
        mutationFn: async () => {
            reset();
            setDeletePlayerModal(false);
        },
    });

    const onSubmit = async (data: any) => {
        try {
            mutate(playerData.player_id);
        } catch (error) {
            // Handle errors from handleUpload
            console.error('Error handling upload:', error);
        }
    };

    return (
        <Modal modal={deletePlayerModal} setModal={setDeletePlayerModal}>
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
                        <h1 className="font-semibold text-center text-2xl">Are you sure you want to delete {playerData ? playerData.player_name : ''}?</h1>
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
