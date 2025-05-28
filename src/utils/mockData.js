import dayjs from "dayjs";

const generateLast15Days = () => {
  const result = [];
  for (let i = 14; i >= 0; i--) {
    result.push(dayjs().subtract(i, "day").format("DD/MM"));
  }
  return result;
};

const labels = generateLast15Days();

const randomRange = (min, max) =>
  Array.from(
    { length: 15 },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

export const orderOverviewSet1 = {
  labels,
  datasets: [
    {
      label: "KYC thành công",
      data: randomRange(100, 400),
      backgroundColor: "#00c9a7",
      borderRadius: 4,
      barPercentage: 0.5,
      categoryPercentage: 0.6,
    },
    {
      label: "KYC thất bại",
      data: randomRange(50, 200),
      backgroundColor: "#7b61ff",
      borderRadius: 4,
      barPercentage: 0.5,
      categoryPercentage: 0.6,
    },
  ],
};
