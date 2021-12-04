import ReactECharts from 'echarts-for-react';
import { Box } from '@chakra-ui/layout';
import { EditIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { setEditModal } from '../app/appSlice';

export const PieChartComponent = ({ chartData, id }) => {
  const dispatch = useDispatch();
  const options = {
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        data: chartData.map((d, i) => ({ name: `Element ${i + 1}`, value: d })),
        type: 'pie',
        radius: '50%',
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  const handleEdit = () => {
    dispatch(setEditModal({ open: true, id }));
  };

  return (
    <Box w="500px" p="1rem" shadow="0 1.6px 3.6px 0 rgb(0 0 0 / 13%), 0 0.3px 0.9px 0 rgb(0 0 0 / 11%);">
      <EditIcon my="1rem" onClick={handleEdit} cursor="pointer" />
      <ReactECharts option={options} />;
    </Box>
  );
};
