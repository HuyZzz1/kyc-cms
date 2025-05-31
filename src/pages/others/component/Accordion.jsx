import { useState } from "react";
import { Collapse } from "reactstrap";

const data = [
  {
    key: "1",
    id: "kyc-intro",
    question: "Hệ thống KYC là gì?",
    answer: [
      "Hệ thống KYC (Know Your Customer) hỗ trợ doanh nghiệp xác minh danh tính khách hàng tự động với công nghệ AI, đảm bảo tuân thủ pháp lý và giảm thiểu rủi ro gian lận.",
      "Tích hợp đa phương thức xác thực: OCR, face matching, kiểm tra dữ liệu từ cơ sở dữ liệu quốc gia.",
    ],
  },
  {
    key: "2",
    id: "benefits",
    question: "Lợi ích khi sử dụng hệ thống KYC?",
    answer: [
      "• Tiết kiệm 80% thời gian xử lý thủ công",
      "• Tuân thủ GDPR/PCI DSS",
      "• Tích hợp với ERP/ngân hàng",
      "• Báo cáo đối soát thời gian thực",
    ],
  },
  {
    key: "3",
    id: "payment-relation",
    question: "Mối liên hệ giữa KYC và thanh toán?",
    answer: [
      "Xác minh khách hàng trước khi phê duyệt giao dịch, ngăn chặn gian lận và tự động hóa quy trình thanh toán.",
    ],
  },
  {
    key: "4",
    id: "support",
    question: "Cách báo cáo sự cố?",
    answer: [
      "Tạo ticket hỗ trợ trực tiếp từ trang quản trị, đội ngũ kỹ thuật sẽ phản hồi trong 24h làm việc.",
    ],
  },
];

const Accordion = ({ className = "", variation = "" }) => {
  const [isOpen, setIsOpen] = useState(data[0].key);

  const toggleCollapse = (key) => {
    setIsOpen((prevKey) => (prevKey === key ? "" : key));
  };

  return (
    <div
      className={`accordion${variation ? " accordion-s" + variation : ""} ${
        className || ""
      }`}
    >
      {data.map((item) => (
        <div className="accordion-item" key={item.key}>
          <div
            className={`accordion-head${
              isOpen !== item.key ? " collapsed" : ""
            }`}
            onClick={() => toggleCollapse(item.key)}
          >
            <h6 className="title">{item.question}</h6>
            <span className="accordion-icon"></span>
          </div>
          <Collapse className="accordion-body" isOpen={isOpen === item.key}>
            <div className="accordion-inner">
              {item.answer.map((text, index) => (
                <p key={`${item.key}-${index}`}>{text}</p>
              ))}
            </div>
          </Collapse>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
