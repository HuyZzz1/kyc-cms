import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="nk-footer nk-footer-fluid bg-lighter">
      <div className="container-xl">
        <div className="nk-footer-wrap">
          <div className="nk-footer-copyright">
            {" "}
            &copy; 2025 KYC CHAIN. Bản quyền thuộc về KYC CHAIN
          </div>
          <div className="nk-footer-links">
            <ul className="nav nav-sm">
              <li className="nav-item">
                <Link to={`/pages/terms-policy`} className="nav-link">
                  Chính sách
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`/pages/faq`} className="nav-link">
                  Hỏi đáp
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="https://dashboard.kycchain.net/api/redoc"
                  target="_blank"
                  className="nav-link"
                >
                  Hướng dẫn
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
