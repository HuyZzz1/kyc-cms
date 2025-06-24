import { useState } from "react";
import { useFileManager, useFileManagerUpdate } from "../components/Context";
import Files from '../components/Files';

const AllFiles = () => {
  const { fileManager } = useFileManager();
  const { fileManagerUpdate } = useFileManagerUpdate();
  const [selectedOrgId, setSelectedOrgId] = useState(null);
  const [selectedSubId, setSelectedSubId] = useState(null); // id của folder ảnh/video
  const [selectedSubFolder, setSelectedSubFolder] = useState(null); // hiệu ứng selected layer 2

  // Layer 1: show org folders
  const orgFolders = fileManager.files.filter(item => item.parent === null && !item.deleted);
  // Layer 2: show 2 subfolders (Ảnh, Video) of selected org
  const subFolders = fileManager.files.filter(item => item.parent === selectedOrgId && !item.deleted);
  // Layer 3: show files in selectedSubId (image/video)
  const filesInSub = fileManager.files.filter(item => item.parent === selectedSubId && !item.deleted);

  // Layer 1: double click org folder
  const handleFolderOpen = async (item) => {
    if (item.parent === null) {
      setSelectedOrgId(item.id);
      setSelectedSubId(null);
      setSelectedSubFolder(null);
      await fileManagerUpdate.loadOrgChildren(item.id);
    }
  };

  // Layer 2: double click image/video folder
  const handleSubFolderOpen = async (item) => {
    if (item.parent === selectedOrgId) {
      setSelectedSubFolder(item.id); // hiệu ứng selected
      // Lấy loại folder
      const type = item.id.endsWith('-image') ? 'image' : 'video';
      const orgId = selectedOrgId;
      await fileManagerUpdate.loadSubFolderFiles(orgId, type);
      setSelectedSubId(item.id);
    }
  };

  // Layer 2: single click để chọn folder
  const handleSubFolderSelect = (id) => setSelectedSubFolder(id);

  // Back từ layer 2 về layer 1
  const handleBack = () => {
    if (selectedSubId) {
      setSelectedSubId(null);
      setSelectedSubFolder(null);
    } else {
      setSelectedOrgId(null);
      setSelectedSubFolder(null);
    }
  };

  // Layer 1
  if (selectedOrgId == null) {
    return <Files files={orgFolders} onFolderOpen={handleFolderOpen} />;
  }

  // Layer 2
  if (selectedSubId == null) {
    return (
      <>
        <button onClick={handleBack} style={{marginBottom: 16, padding: '4px 12px', borderRadius: 4, border: '1px solid #ccc', background: '#f5f6fa', cursor: 'pointer'}}>← Back</button>
        <Files files={subFolders} onFolderOpen={handleSubFolderOpen} selectedId={selectedSubFolder} onSelect={handleSubFolderSelect} />
      </>
    );
  }

  // Layer 3
  return (
    <>
      <button onClick={handleBack} style={{marginBottom: 16, padding: '4px 12px', borderRadius: 4, border: '1px solid #ccc', background: '#f5f6fa', cursor: 'pointer'}}>← Back</button>
      <Files files={filesInSub} />
    </>
  );
}

export default AllFiles;