export const coinOverview = {
  labels: [
    "Stripe",
    "Google OAuth",
    "Facebook OAuth",
    "Gửi qua API",
    "Nhập tay bởi quản trị viên",
  ],
  stacked: true,
  datasets: [
    {
      label: "Đăng ký",
      data: [240, 120, 180, 90, 60],
      backgroundColor: ["#4c84ff", "#ff4d4f", "#3b5998", "#38c976", "#6c757d"],
      barPercentage: 0.5,
      categoryPercentage: 0.7,
      borderRadius: 4,
    },
    {
      label: "Nền mờ",
      data: [300, 300, 300, 300, 300],
      backgroundColor: [
        "rgba(76,132,255,0.15)",
        "rgba(255,77,79,0.15)",
        "rgba(59,89,152,0.15)",
        "rgba(56,201,118,0.15)",
        "rgba(108,117,125,0.15)",
      ],
      barPercentage: 0.5,
      categoryPercentage: 0.7,
      borderRadius: 4,
    },
  ],
};
