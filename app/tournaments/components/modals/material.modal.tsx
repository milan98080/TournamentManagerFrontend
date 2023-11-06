import { Dispatch, SetStateAction } from 'react';
import { Modal } from '../modal';

interface MaterialModalProps {
  materialModal: boolean;
  setMaterialModal: Dispatch<SetStateAction<boolean>>;
  refetch?: any;
}

export const MaterialModal = ({
  materialModal,
  setMaterialModal,
}: MaterialModalProps) => {
  return (
    <Modal modal={materialModal} setModal={setMaterialModal}>
      <h1>hello</h1>
    </Modal>
  );
};
