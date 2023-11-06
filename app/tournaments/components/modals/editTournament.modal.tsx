import { EditTournament, CreateTournamentPayload } from '../../../../utils/tournamentquery';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Modal } from '../modal';
import toast from 'react-hot-toast';
import { Button } from '../button/button';

interface EditTournamentModalProps {
    editTournamentModal: boolean;
    setEditTournamentModal: Dispatch<SetStateAction<boolean>>;
    refetch?: any;
    tournamentData?: any;
}

let fileUploadName: string = '';

export const EditTournamentModal = ({
    editTournamentModal,
    setEditTournamentModal,
    refetch,
    tournamentData,
}: EditTournamentModalProps) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm();
    const { mutate, isLoading } = useMutation({
        mutationFn: async (payload: CreateTournamentPayload) => {
            if (fileUploadName === '' || fileUploadName === null) {
            } else {
                payload.tournament_logo = `http://localhost:3000/uploads/${fileUploadName}`;
            }
            const data = await EditTournament(tournamentData.tournament_id, payload);
            if (data.error) {
                toast.error(data.message);
            } else {
                toast.success('Successfully Edited!');
                reset();
                setEditTournamentModal(false);
                fileUploadName = '';
                setSelectedFile(null);
                setPreview(null);
                refetch();
            }
        },
    });

    const resetData = useMutation({
        mutationFn: async () => {
            reset();
            setEditTournamentModal(false);
            fileUploadName = '';
            setSelectedFile(null);
            setPreview(null);
        },
    });

    const onSubmit = async (data: any) => {
        try {
            await handleUpload();
            mutate(data);
        } catch (error) {
            // Handle errors from handleUpload
            console.error('Error handling upload:', error);
        }
    };

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<any | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
    };

    useEffect(() => {
        if (!selectedFile) return;

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // free memory
        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [selectedFile]);

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('http://localhost:3000/tournaments/image', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const fileData = await response.json();
                const { filename } = fileData;
                fileUploadName = filename;
                console.log(fileUploadName)
            } else {
                console.error('Image upload failed.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <Modal modal={editTournamentModal} setModal={setEditTournamentModal}>
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
                        <h1 className="font-semibold text-center text-2xl">Edit Tournament</h1>
                        <div className='grid text-xl'>
                            <label className='text-md font-semibold'>Tournament Name</label>
                            <input
                                {...register('tournament_name')}
                                placeholder="Tournament Name"
                                defaultValue={tournamentData ? tournamentData.tournament_name : ''}
                                required
                                type={'text'}
                                className="input-field p-2 rounded-lg border-2 border-gray-500"
                            />
                        </div>
                        <div className='grid text-xl'>
                            <label className='text-md font-semibold'>Tournament Schedule</label>
                            <input
                                {...register('tournament_schedule')}
                                placeholder="Tournament Schedule"
                                defaultValue={tournamentData ? tournamentData.tournament_schedule : ''}
                                required
                                type={'text'}
                                className="input-field p-2 rounded-lg border-2 border-gray-500"
                            />
                        </div>
                        <div className='grid text-xl'>
                            <label className='text-md font-semibold'>Tournament Logo</label>
                            <input placeholder='file' type="file" accept="image/*" onChange={handleFileChange} />
                        </div>
                        {
                            (preview || tournamentData) && (
                                <img src={preview || tournamentData.tournament_logo} alt="Preview" className='w-auto h-36' />
                            )
                        }

                        <div>
                            <Button type="submit" isLoading={isLoading}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
};
