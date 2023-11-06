import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
export function Modal({
  modal,
  setModal,
  children,
  height = 'default',
}: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  height?: 'full' | 'default';
}) {
  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-black bg-opacity-50 fixed w-full h-full top-0 left-0 z-40"
        >

          <div
            className="fixed z-40 justify-center top-20 flex overflow-x-hidden overflow-y-auto inset-0 outline-none focus:outline-none"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -50,
                opacity: 0,
              }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="w-1/2 h-fit z-50 overflow-auto rounded-lg bg-[#ffffff] dark:bg-gray-900 dark:text-white text-black"
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
