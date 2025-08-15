import { useState, useRef, useEffect } from "react";
import { Icon } from "@/components/Component";
import "./DownloadDropdown.css";

const DownloadDropdown = ({ item }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getDownloadItems = () => {
    const files = [];
    const id = item.id || "unknown";

    if (item.frontImagePath) {
      files.push({
        label: "Ảnh mặt trước",
        filePath: item.frontImagePath,
        filename: `${id}-front.jpg`,
      });
    }

    if (item.backImagePath) {
      files.push({
        label: "Ảnh mặt sau",
        filePath: item.backImagePath,
        filename: `${id}-back.jpg`,
      });
    }

    if (item.userImage) {
      files.push({
        label: "Ảnh chân dung",
        filePath: item.userImage,
        filename: `${id}-user.jpg`,
      });
    }

    if (item.recordVideo) {
      files.push({
        label: "Video xác thực",
        filePath: item.recordVideo,
        filename: `${id}-record.webm`,
      });
    }

    return files;
  };

  const downloadItems = getDownloadItems();

  console.log("downloadItems", downloadItems);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (downloadItems.length === 0) return null;

  return (
    <div className="download-dropdown" ref={dropdownRef}>
      <button
        className="dropdown-toggle"
        onClick={() => setOpen((prev) => !prev)}
        title="Tải xuống giấy tờ"
        aria-haspopup="true"
        aria-expanded={open}
      >
        Tải xuống
        <Icon name="download" className="me-1" />
      </button>

      {open && (
        <ul className="dropdown-menu show" role="menu">
          {downloadItems.map((file) => (
            <li key={file.label}>
              <a
                href={file.filePath}
                target="_blank"
                className="text-primary"
                rel="noopener noreferrer"
              >
                {file.label}
                <div
                  style={{
                    paddingLeft: 2,
                  }}
                >
                  <Icon name="download" />
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DownloadDropdown;
