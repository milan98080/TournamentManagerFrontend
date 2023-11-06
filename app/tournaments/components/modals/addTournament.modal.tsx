import { CreateTournament, CreateTournamentPayload } from '../../../../utils/tournamentquery';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { Modal } from '../modal';
import { Button } from '../button/button';

interface AddTournamentModalProps {
  addTournamentModal: boolean;
  setAddTournamentModal: Dispatch<SetStateAction<boolean>>;
  refetch?: any;
}
let fileUploadName: string = '';

export const AddTournamentModal = ({
  addTournamentModal,
  setAddTournamentModal,
  refetch,
}: AddTournamentModalProps) => {
  const {
    handleSubmit,
    register,
    reset,
  } = useForm();
  const { mutate, isLoading } = useMutation({
    mutationFn: async (payload: CreateTournamentPayload) => {
      if(fileUploadName === '' || fileUploadName === null){
      }else{
        payload.tournament_logo = `http://localhost:3000/uploads/${fileUploadName}`;
      }

      const data = await CreateTournament(payload);
      if (data.error) {
        toast.error(data.message);
      } else {
        toast.success('Successfully Added!');
        reset();
        setAddTournamentModal(false);
        fileUploadName = '';
        setSelectedFile(null);
        setPreview(null);
        refetch();
      }
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

  const resetData = useMutation({
    mutationFn: async () => {
      reset();
      setAddTournamentModal(false);
      fileUploadName = '';
      setSelectedFile(null);
      setPreview(null);
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

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
    <Modal modal={addTournamentModal} setModal={setAddTournamentModal}>
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
            <h1 className="font-semibold text-center text-2xl">Add Tournament</h1>
            <div className='grid text-xl'>
              <label className='text-md font-semibold'>Tournament Name</label>
              <input
                {...register('tournament_name')}
                placeholder="Tournament Name"
                required
                className="input-field p-2 rounded-lg border-2 border-gray-500"
              />
            </div>
            <div className='grid text-xl'>
              <label className='text-md font-semibold'>Tournament Date</label>
              <input
                {...register('tournament_schedule')}
                placeholder="Tournament Date"
                required
                className="input-field p-2 rounded-lg border-2 border-gray-500"
              />
            </div>
            <div className='grid text-xl'>
              <label className='text-md font-semibold'>Initial Stage</label>
              <input
                {...register('current_stage')}
                placeholder="Initial Stage"
                required
                className="input-field p-2 rounded-lg border-2 border-gray-500"
              />
            </div>
            <div className='grid text-xl'>
              <label className='text-md font-semibold'>Tournament Logo</label>
              <input placeholder='file' type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            {preview && <img src={preview} alt="Preview" className='w-auto h-36' />}
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