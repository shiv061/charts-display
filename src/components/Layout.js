import { Box, Center } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectData, selectLoading } from '../app/appSlice';
import { BarChartComponent } from './BarChart';
import { PieChartComponent } from './PieChart';
import { useMediaQuery } from '@chakra-ui/media-query';

export const Layout = () => {
  const data = useSelector(selectData);
  const loading = useSelector(selectLoading);
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');

  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box bg="#fafafa" pt="1rem" display="grid" gridTemplateColumns={`${isLargerThan1280 ? '1fr 1fr' : '1fr'}`} gridGap="1rem" placeItems="center">
      {data?.map((chartData) => (chartData.type === 'Bar' ? <BarChartComponent key={chartData.id} chartData={chartData.elements} id={chartData.id} /> : chartData.type === 'Pie' ? <PieChartComponent key={chartData.id} id={chartData.id} chartData={chartData.elements} /> : null))}
    </Box>
  );
};
