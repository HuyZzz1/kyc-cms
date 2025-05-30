const menu = [
  {
    text: "Báo Cáo",
    subMenu: [
      {
        text: "Tổng Quan",
        link: "/overview",
      },
      {
        text: "Phân Tích User",
        link: "/analytics",
      },
      {
        text: "Quản lý File",
        link: "/analytics/0",
      },
    ],
  },
  {
    text: "Quản Lý KYC",
    subMenu: [
      {
        text: "Danh sách KYC",
        link: "/analytics/1",
      },
      {
        text: "Danh sách Thanh Toán",
        link: "/analytics/2",
      },
      {
        text: "Danh sách Hóa Đơn",
        link: "/analytics/3",
      },
    ],
  },
  {
    text: "Thông Tin",
    subMenu: [
      {
        text: "Hỏi Đáp",
        link: "/analytics/4",
      },
      {
        text: "Chính Sách",
        link: "/analytics/5",
      },
      {
        text: "Hướng Dẫn",
        link: "/analytics/6",
      },
    ],
  },
];

const investMenu = [
  {
    text: "Overview",
    link: "/invest/index",
  },
  {
    text: "My Plan",
    link: "/invest/schemes",
  },
  {
    text: "Invest",
    link: "/invest/invest",
  },
  {
    text: "Profile",
    link: "/invest/profile",
  },
  {
    text: "Pages",
    subMenu: [
      {
        text: "Welcome / Intro",
        link: "/invest/welcome",
      },
      {
        text: "Investment Process",
        link: "/invest/invest-form/plan-iv-1",
      },
      {
        text: "Investment Detail",
        link: "/invest/scheme-details/plan-iv-2",
      },
      {
        text: "KYC - Get Started",
        link: "/invest/kyc-application",
      },
      {
        text: "KYC - Application Form",
        link: "/invest/kyc-form",
      },
      {
        text: "Main Dashboard",
        link: "/",
        newTab: true,
        icon: "external",
      },
      {
        text: "All Components",
        link: "/components",
        icon: "external",
        newTab: true,
      },
    ],
  },
];

export { menu, investMenu };
