import { Box } from '@chakra-ui/layout';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { selectData, thunkChartData } from './app/appSlice';
import { EditModal } from './components/EditModal';
import { Header } from './components/Header';
import { Layout } from './components/Layout';

function App() {
  const dispatch = useDispatch();
  const data = useSelector(selectData);

  useEffect(() => {
    if (data && data?.length === 0) dispatch(thunkChartData());
  }, [dispatch, data]);

  return (
    <Box minH="100vh">
      <Header />
      <Layout />
      <EditModal />
    </Box>
  );
}

export default App;
