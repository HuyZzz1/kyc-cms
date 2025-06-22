import { useState, useRef, useEffect } from "react";
import { Icon } from "@/components/Component";
import "./DownloadDropdown.css";

const DownloadDropdown = ({ item, downloadDocumentImage }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Đóng dropdown khi click ngoài vùng
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDownloadItems = () => {
    const files = [];

    if (item.frontImagePath) {
      files.push({
        label: "Ảnh mặt trước",
        filePath: item.frontImagePath,
        filename: `${item.name}-front.jpg`,
      });
    }

    if (item.backImagePath) {
      files.push({
        label: "Ảnh mặt sau",
        filePath: item.backImagePath,
        filename: `${item.id}-back.jpg`,
      });
    }

    if (item.userImage) {
      files.push({
        label: "Ảnh chân dung",
        filePath: item.userImage,
        filename: `${item.id}-user-face.jpg`,
      });
    }

    if (item.recordVideo) {
      files.push({
        label: "Video",
        filePath: item.recordVideo,
        filename: `${item.id}-face-record.webm`,
        isVideo: true,
      });
    }

    return files;
  };

  const downloadItems = getDownloadItems();

  if (downloadItems.length === 0) return null;

  return (
    <div className="download-dropdown" ref={dropdownRef}>
      <button
        className="dropdown-toggle"
        onClick={() => setOpen((prev) => !prev)}
        title="Tải xuống giấy tờ"
      >
        Tải xuống
        <Icon name="download" className="me-1" />
      </button>

      {open && (
        <ul className="dropdown-menu show">
          {downloadItems.map((file) => (
            <li key={file.label}>
              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  downloadDocumentImage(file.filePath, file.filename);
                  setOpen(false);
                }}
              >
                {file.label}
                <Icon name="download" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DownloadDropdown;