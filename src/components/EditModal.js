import { Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { manageSave, setEditModal } from '../app/appSlice';

export const EditModal = () => {
  const isOpen = useSelector((state) => state.app.editModal);
  const editData = useSelector((state) => state.app.editData);
  const [editState, setEditState] = useState(editData || []);
  const dispatch = useDispatch();

  useEffect(() => {
    setEditState(editData);
  }, [editData]);

  const onClose = () => {
    dispatch(setEditModal({ open: false, id: null }));
  };

  const handleChange = (e, index) => {
    const dataSlice = [...editState];
    if (!isNaN(e.target.value) || e.target.value === '') {
      dataSlice[index] = e.target.value === '' ? 0 : +e.target.value || 0;
    }
    setEditState(dataSlice);
  };

  const handleSave = () => {
    dispatch(manageSave({ editedData: editState }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {editState.map((edit, index) => (
            <Box key={index} d="flex" alignItems="center" my="4px">
              <Text flex={0.3} mx="4px">
                Element {index + 1}
              </Text>
              <Input flex={0.7} placeholder="Enter data" value={edit} onChange={(e) => handleChange(e, index)} />
            </Box>
          ))}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
