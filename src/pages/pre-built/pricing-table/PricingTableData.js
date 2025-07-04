import PlanS1 from "@/images/icons/plan-s1.svg";
import PlanS2 from "@/images/icons/plan-s2.svg";
import PlanS3 from "@/images/icons/plan-s3.svg";

export const pricingTableDataV1 = [
  {
    id: 1,
    title: "Starter",
    caption: "Enjoy entry level of invest & earn.",
    interest: 1.67,
    term: 30,
    minDeposit: 250,
    maxDeposit: 1999,
    return: "Yes",
    totalReturn: 125,
    tags: false,
  },
  {
    id: 2,
    title: "Silver",
    caption: "Best plan for user to investers.",
    interest: 4.76,
    term: 21,
    minDeposit: 2000,
    maxDeposit: 4999,
    return: "Yes",
    totalReturn: 200,
    tags: false,
  },
  {
    id: 3,
    title: "Diamond",
    caption: "Advance level of invest & earn.",
    interest: 14.29,
    term: 14,
    minDeposit: 5000,
    maxDeposit: 20000,
    return: "Yes",
    totalReturn: 300,
    tags: true,
  },
  {
    id: 4,
    title: "Platinum",
    caption: "Just invest money & earn.",
    interest: 21.07,
    term: 7,
    minDeposit: 10500,
    maxDeposit: 50999,
    return: "Yes",
    totalReturn: 500,
    tags: false,
  },
];

export const pricingTableDataV2 = [
  {
    id: 1,
    title: "Starter",
    logo: PlanS1,
    desc: "If you are a small business amn please select this plan",
    amount: 99,
    userNumber: 1,
    tags: false,
  },
  {
    id: 2,
    title: "Pro",
    logo: PlanS2,
    desc: "If you are a small business amn please select this plan",
    amount: 299,
    userNumber: 5,
    tags: true,
  },
  {
    id: 3,
    title: "Enterprise",
    logo: PlanS3,
    desc: "If you are a small business amn please select this plan",
    amount: 599,
    userNumber: 20,
    tags: false,
  },
  {
    id: 4,
    title: "Starter",
    logo: PlanS1,
    desc: "If you are a small business amn please select this plan",
    amount: 99,
    userNumber: 1,
    tags: false,
  },
];
