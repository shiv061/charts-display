export const fetchChartData = () => {
  return fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/chart2986176.json').then((res) => res.json());
};
