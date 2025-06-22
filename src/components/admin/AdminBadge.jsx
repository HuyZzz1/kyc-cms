import { useEffect, useState } from "react";
import { Badge } from "reactstrap";

const AdminBadge = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in as admin
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);
  }, []);
  
  if (!isAdmin) return null;
  
  return (
    <Badge color="danger" className="ml-2" style={{ marginLeft: '10px' }}>
      Admin Access
    </Badge>
  );
};

export default AdminBadge;
