import { EditPlayer, CreatePlayerPayload } from '../../../../utils/tournamentquery';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Modal } from '../modal';
import toast from 'react-hot-toast';
import { Button } from '../button/button';

interface EditPlayerModalProps {
    editPlayerModal: boolean;
    setEditPlayerModal: Dispatch<SetStateAction<boolean>>;
    refetch?: any;
    playerData?: any;
}

let fileUploadName: string = '';

export const EditPlayerModal = ({
    editPlayerModal,
    setEditPlayerModal,
    refetch,
    playerData,
}: EditPlayerModalProps) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
        reset,
    } = useForm();
    const img = watch('player_image');
    const { mutate, isLoading } = useMutation({
        mutationFn: async (payload: CreatePlayerPayload) => {
            if (fileUploadName === '' || fileUploadName === null) {
            } else {
                payload.player_image = `http://localhost:3000/uploads/${fileUploadName}`;
            }
            const data = await EditPlayer(playerData.player_id, payload);
            if (data.error) {
                toast.error(data.message);
            } else {
                toast.success('Successfully Edited!');
                reset();
                setEditPlayerModal(false);
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
            setEditPlayerModal(false);
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
    }

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
        <Modal modal={editPlayerModal} setModal={setEditPlayerModal}>
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
                        <h1 className="font-semibold text-center text-2xl">Edit Player</h1>
                        <div className='grid text-xl'>
                            <label className='text-md font-semibold'>Player Name</label>
                            <input
                                {...register('player_name')}
                                placeholder="Player Name"
                                defaultValue={playerData ? playerData.player_name : ''}
                                required
                                type={'text'}
                                className="input-field p-2 rounded-lg border-2 border-gray-500"
                            />
                        </div>
                        <div className='grid text-xl'>
                            <label className='text-md font-semibold'>Player Image</label>
                            <input placeholder='file' type="file" accept="image/*" onChange={handleFileChange} />
                        </div>
                        {
                            (preview || playerData) && (
                                <img src={preview || playerData.player_image} alt="Preview" className='w-auto h-36' />
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
