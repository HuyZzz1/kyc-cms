import { useState, useEffect, createContext, useContext } from "react";
import adminService from "@/services/adminService";

const FileManager = createContext();
const FileManagerUpdate = createContext();

export function useFileManager() {
  return useContext(FileManager);
}

export function useFileManagerUpdate() {
  return useContext(FileManagerUpdate);
}

const FileManagerProvider = ({ ...props }) => {
  const [fileManager, setFileManager] = useState({
    search: "",
    files: [],
    filesView: "grid",
    asideVisibility: false,
    recoveryFilter: false,
    currentPlan: "planid01",
    contentHeight: 0,
    loading: true,
    error: null,
    loadedOrgs: {}, // track which orgs have loaded children
    loadedSubFolders: {}, // track loaded image/video subfolders
  });

  // Fetch only organizations at first
  const fetchOrganizations = async () => {
    try {
      const orgRes = await adminService.getOrganizationsWithMedia();
      const orgs = orgRes.organizations || [];
      let files = [];
      for (const org of orgs) {
        // Organization folder (show stats here)
        files.push({
          id: org._id,
          name: org.name,
          type: "folder",
          icon: "folder",
          parent: null,
          totalFiles: org.totalFiles,
          totalSize: org.totalSize,
          totalSizeFormatted: org.totalSizeFormatted,
          totalImages: org.imageStats?.count || 0,
          totalVideos: org.videoStats?.count || 0,
          imageStats: org.imageStats,
          videoStats: org.videoStats,
        });
      }
      setFileManager((prev) => ({ ...prev, files, loading: false, error: null }));
    } catch (error) {
      setFileManager((prev) => ({ ...prev, loading: false, error: error.message || "Lỗi tải dữ liệu" }));
    }
  };

  // Lazy load children (Ảnh/Video folder) for an org (layer 2)
  const loadOrgChildren = async (orgId) => {
    if (fileManager.loadedOrgs[orgId]) return;
    setFileManager((prev) => ({ ...prev, loading: true }));
    try {
      const statsRes = await adminService.getOrganizationMediaStats(orgId);
      const imageFolder = {
        id: `${orgId}-image`,
        name: "Ảnh",
        type: "folder",
        icon: "folder",
        parent: orgId,
        totalFiles: statsRes.imageStats?.count || 0,
        totalSize: statsRes.imageStats?.totalSize || 0,
        totalSizeFormatted: statsRes.imageStats?.totalSizeFormatted || '',
      };
      const videoFolder = {
        id: `${orgId}-video`,
        name: "Video",
        type: "folder",
        icon: "folder",
        parent: orgId,
        totalFiles: statsRes.videoStats?.count || 0,
        totalSize: statsRes.videoStats?.totalSize || 0,
        totalSizeFormatted: statsRes.videoStats?.totalSizeFormatted || '',
      };
      setFileManager((prev) => ({
        ...prev,
        files: [
          ...prev.files,
          imageFolder,
          videoFolder,
        ],
        loadedOrgs: { ...prev.loadedOrgs, [orgId]: true },
        loading: false,
      }));
    } catch (error) {
      setFileManager((prev) => ({ ...prev, loading: false, error: error.message || "Lỗi tải dữ liệu" }));
    }
  };

  // Lazy load files for image/video folder (layer 3)
  const loadSubFolderFiles = async (orgId, type) => {
    const subKey = `${orgId}-${type}`;
    if (fileManager.loadedSubFolders[subKey]) return;
    setFileManager((prev) => ({ ...prev, loading: true }));
    try {
      let filesToAdd = [];
      if (type === 'image') {
        const imagesRes = await adminService.getOrganizationImages(orgId, { limit: 100 });
        const images = imagesRes.images || imagesRes.data || [];
        filesToAdd = images.map(img => ({
          id: img.imageId,
          name: img.userName + " - " + img.type,
          path: img.path,
          ext: "img",
          url: img.url,
          type: "file",
          fileType: "image",
          parent: `${orgId}-image`,
          createdAt: img.createdAt,
          imageType: img.type,
        }));
      } else if (type === 'video') {
        const videosRes = await adminService.getOrganizationVideos(orgId, { limit: 100 });
        const videos = videosRes.videos || videosRes.data || [];
        filesToAdd = videos.map(vid => ({
          id: vid.videoId,
          name: vid.userName,
          path: vid.path,
          ext: "mp4",
          url: vid.url,
          type: "file",
          fileType: "video",
          parent: `${orgId}-video`,
          createdAt: vid.uploadedAt || vid.createdAt,
          videoType: vid.type,
        }));
      }
      setFileManager((prev) => ({
        ...prev,
        files: [
          ...prev.files,
          ...filesToAdd,
        ],
        loadedSubFolders: { ...prev.loadedSubFolders, [subKey]: true },
        loading: false,
      }));
    } catch (error) {
      setFileManager((prev) => ({ ...prev, loading: false, error: error.message || "Lỗi tải dữ liệu" }));
    }
  };

  useEffect(() => {
    fetchOrganizations();
    // eslint-disable-next-line
  }, []);

  const fileManagerUpdate = {
    filesView: function (value) {
      setFileManager({ ...fileManager, filesView: value });
    },
    asideVisibility: function () {
      setFileManager({
        ...fileManager,
        asideVisibility: !fileManager.asideVisibility,
      });
    },
    asideHide: function () {
      setFileManager({ ...fileManager, asideVisibility: false });
    },
    recoveryFilter: function () {
      setFileManager({
        ...fileManager,
        recoveryFilter: !fileManager.recoveryFilter,
      });
    },
    currentPlan: function (value) {
      setFileManager({ ...fileManager, currentPlan: value });
    },
    search: function (value) {
      setFileManager({ ...fileManager, search: value });
    },
    contentHeight: function (value) {
      setFileManager({ ...fileManager, contentHeight: value });
    },
    reload: fetchOrganizations, // reload orgs only
    loadOrgChildren, // expose for UI to call when click org folder
    loadSubFolderFiles, // expose for UI to call when click image/video folder
  };

  return (
    <FileManager.Provider value={{ fileManager }}>
      <FileManagerUpdate.Provider value={{ fileManagerUpdate }}>
        {props.children}
      </FileManagerUpdate.Provider>
    </FileManager.Provider>
  );
};

export default FileManagerProvider;
