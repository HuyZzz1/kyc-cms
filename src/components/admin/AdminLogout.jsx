import { useNavigate } from "react-router-dom";

const AdminLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove admin session
    localStorage.removeItem("adminToken");
    localStorage.removeItem("isAdmin");
    
    // Redirect to admin login page
    navigate("/admin-login");
  };

  return (
    <li>
      <a href="#logout" onClick={(ev) => {
        ev.preventDefault();
        handleLogout();
      }}>
        <span>Admin Logout</span>
      </a>
    </li>
  );
};

export default AdminLogout;
