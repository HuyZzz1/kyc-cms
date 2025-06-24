import {useState} from 'react'
import classNames from 'classnames';
import { useFileManager, useFileManagerUpdate } from "../components/Context";
import icons from './Icons';
import { Modal, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { Icon } from "@/components/Component";
import { urlImage, urlVideo } from "@/utils/mediaUtils";

import CreateFolder from "../modals/CreateFolder";
import Details from "../modals/Details";
import Share from "../modals/Share";
import Copy from "../modals/Copy";
import Move from "../modals/Move";

const File = ({item, fileView, page, selectedId, onSelect, onDoubleClick}) => {
    const {fileManagerUpdate} = useFileManagerUpdate();
    
    const [detailModal, setDetailModal] = useState(false);  
    const [shareModal, setShareModal] = useState(false);
    const [copyModal, setCopyModal] = useState(false);
    const [moveModal, setMoveModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);

    const toggleDetailModal = () => {
        setDetailModal(!detailModal);
    };
    const toggleShareModal = () => {
        setShareModal(!shareModal);
    };
    const toggleCopyModal = () => {
      setCopyModal(!copyModal);
    };
    const toggleMoveModal = () => {
      setMoveModal(!moveModal);
    };
    const toggleCreateModal = () => {
        setCreateModal(!createModal);
    };

    const downloadFile = (file) => {
        const downloadLink = document.createElement("a");
        downloadLink.href = "data:" + file.ext + ";charset=utf-8," + encodeURIComponent(file.name);
        downloadLink.download = file.name;
        downloadLink.click();
    };

    const isSelected = selectedId === item.id;
    // Hiển thị preview ảnh/video nếu là file
    let preview = null;
    if (item.fileType === 'image') {
        preview = (
            <img
                src={urlImage(item.path)}
                alt={item.name}
                style={{width: 72, height: 48, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee', background: '#fff'}}
            />
        );
    } else if (item.fileType === 'video') {
        preview = (
            <video
                src={urlVideo(item.path)}
                style={{width: 96, height: 48, borderRadius: 8, border: '1px solid #eee', background: '#fff'}}
                controls={false}
            />
        );
    } else {
        preview = <span className="nk-file-icon-type">{icons[item.icon]}</span>;
    }

    return (
        <>
            <div
                className={classNames("nk-file-item nk-file", {selected: isSelected})}
                onClick={() => onSelect && onSelect(item.id)}
                onDoubleClick={() => onDoubleClick && onDoubleClick(item)}
                style={isSelected ? {background: '#e6f0ff'} : {}}
            >
                <div className="nk-file-info">
                    <div className="nk-file-title">
                        <div className="nk-file-icon">
                            {preview}
                        </div>
                        <div className="nk-file-name">
                            <div className="nk-file-name-text">
                                <span className="title">{item.name}</span>
                                <div className="asterisk">
                                    <a
                                        href="#folder"
                                        onClick={(ev) => {
                                            ev.preventDefault();
                                            fileManagerUpdate.toggleStarred(item.id);
                                        }}
                                        className={item.starred ? "active" : ""}
                                    >
                                        <Icon className="asterisk-off icon ni ni-star"></Icon>
                                        <Icon className="asterisk-on icon ni ni-star-fill"></Icon>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {(fileView === 'group' || fileView === 'grid') && <ul className="nk-file-desc">
                        <li className="date">{item.totalFiles} files</li>
                        <li className="size">{item.totalSizeFormatted}</li>
                        {(item.access && fileView === 'group') && <li className="members">{item.access.length} Members</li>}
                    </ul>}
                </div>
                {fileView === 'list' &&  <>
                    {(page === undefined) && <div className="nk-file-meta">
                        <div className="tb-lead">{item.date}</div>
                    </div>}
                    {(page === 'recovery') && <div className="nk-file-date">
                        <div className="tb-lead">{item.deleted}</div>
                    </div>}
                    <div className="nk-file-members">
                        <div className="tb-lead">{item.access && item.access.length} Members</div>
                    </div>
                </>}
                <div className="nk-file-actions">
                    <UncontrolledDropdown>
                        <DropdownToggle tag="a" href="#folder" className="dropdown-toggle btn btn-sm btn-icon btn-trigger"
                            onClick={(ev) => ev.preventDefault()}>
                            <Icon name="more-h"></Icon>
                        </DropdownToggle>
                        <DropdownMenu end>
                            <ul className="link-list-opt no-bdr">
                                <li>
                                    <DropdownItem tag="a" href="#item" onClick={(ev) => {ev.preventDefault(); setDetailModal(true);}}>
                                        <Icon name="eye"></Icon>
                                        <span>Details</span>
                                    </DropdownItem>
                                </li>
                                <li>
                                    <DropdownItem tag="a" href="#item" onClick={(ev) => {ev.preventDefault(); setShareModal(true);}}>
                                        <Icon name="share"></Icon>
                                        <span>Share</span>
                                    </DropdownItem>
                                </li>
                                <li>
                                    <DropdownItem tag="a" href="#item" onClick={(ev) => {ev.preventDefault(); setCopyModal(true)}}>
                                        <Icon name="copy"></Icon>
                                        <span>Copy</span>
                                    </DropdownItem>
                                </li>
                                <li>
                                    <DropdownItem tag="a" href="#item" onClick={(ev) => {ev.preventDefault(); setMoveModal(true)}}>
                                        <Icon name="forward-arrow"></Icon>
                                        <span>Move</span>
                                    </DropdownItem>
                                </li>
                                <li>
                                    <DropdownItem tag="a" href="#item" onClick={(ev) => {ev.preventDefault(); downloadFile(item)}}>
                                        <Icon name="download"></Icon>
                                        <span>Download</span>
                                    </DropdownItem>
                                </li>
                                <li>
                                    <DropdownItem tag="a" href="#item" onClick={(ev) => {ev.preventDefault(); fileManagerUpdate.toTrash(item.id, !item.deleted)}}>
                                        {item.deleted ? 
                                            <><Icon name="back-arrow"></Icon> <span>Restore</span></> 
                                            : 
                                            <><Icon name="trash"></Icon><span>Delete</span></>
                                        }
                                    </DropdownItem>
                                </li>
                            </ul>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>

                <Modal isOpen={detailModal} size="md" toggle={toggleDetailModal}>
                    <Details file={item} toggle={toggleDetailModal} toggleShare={toggleShareModal} triggerDownload={downloadFile}/>
                </Modal>

                <Modal isOpen={shareModal} size="md" toggle={toggleShareModal}>
                    <Share file={item} toggle={toggleShareModal} />
                </Modal>

                <Modal isOpen={copyModal} size="md" toggle={toggleCopyModal}>
                    <Copy file={item} toggle={toggleCopyModal} toggleCreate={toggleCreateModal} />
                </Modal>

                <Modal isOpen={moveModal} size="md" toggle={toggleMoveModal}>
                    <Move file={item} toggle={toggleMoveModal} toggleCreate={toggleCreateModal} />
                </Modal>

                <Modal isOpen={createModal} size="md" toggle={toggleCreateModal}>
                    <CreateFolder toggle={toggleCreateModal} />
                </Modal>
            </div>
        </>
    )
}


const Files = ({files, fixedView, page, onFolderOpen, selectedId: controlledSelectedId, onSelect: controlledOnSelect}) => {
    const {fileManager} = useFileManager();
    const fileView = fixedView ? fixedView : fileManager.filesView;
    const mainClass = classNames({
        "nk-files": true,
        [`nk-files-view-${fileView}`]: fileView
    });
    const filesList = files;
    const [uncontrolledSelectedId, setUncontrolledSelectedId] = useState(null);
    const selectedId = controlledSelectedId !== undefined ? controlledSelectedId : uncontrolledSelectedId;
    const onSelect = controlledOnSelect !== undefined ? controlledOnSelect : setUncontrolledSelectedId;
    const handleDoubleClick = (item) => {
        if (onFolderOpen && item.type === 'folder') {
            onFolderOpen(item);
        }
    };

    // Detect if this is a list of only images or only videos (layer 3)
    const isImageList = filesList.length > 0 && filesList.every(f => f.fileType === 'image');
    const isVideoList = filesList.length > 0 && filesList.every(f => f.fileType === 'video');

    if (isImageList || isVideoList) {
        // Gallery layout chỉ cho ảnh/video
        return (
            <div className="row g-3">
                {filesList.map((item) => (
                    <div key={item.id} className="col-6 col-sm-4 col-md-4 col-lg-4 text-center">
                        {isImageList && (
                            <img
                                src={urlImage(item.path)}
                                alt={item.name}
                                style={{width: '100%', height: 180, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee', background: '#fff', cursor: 'pointer'}}
                            />
                        )}
                        {isVideoList && (
                            <video
                                src={urlVideo(item.path)}
                                controls
                                style={{width: '100%', height: 180, borderRadius: 8, border: '1px solid #eee', background: '#fff', cursor: 'pointer'}}
                            />
                        )}
                        <div style={{marginTop: 8, fontSize: 13, wordBreak: 'break-all'}}>{item.name}</div>
                    </div>
                ))}
                {filesList.length === 0 && <div className="mt-2">Không có thư mục hoặc file nào</div>}
            </div>
        );
    }

    // Layout cũ cho folder/file (grid/list/group)
    return (
        <div className={mainClass}>
            {(fileView === 'list' || fileView === 'grid') && 
                <div className="nk-files-list">
                    {filesList.map((item) => (
                        <File
                            key={item.id}
                            item={item}
                            fileView={fileView}
                            page={page}
                            selectedId={selectedId}
                            onSelect={onSelect}
                            onDoubleClick={handleDoubleClick}
                        />
                    ))}
                </div>
            }
            {fileView === 'group' && <>
                <div className="nk-files-group">
                    <h6 className="title border-top-0">Folders</h6>
                    <div className="nk-files-list">
                        {filesList.filter(item => item.type === 'folder').map((item) => (
                            <File
                                key={item.id}
                                item={item}
                                fileView={fileView}
                                page={page}
                                selectedId={selectedId}
                                onSelect={onSelect}
                                onDoubleClick={handleDoubleClick}
                            />
                        ))}
                    </div>
                </div>
                <div className="nk-files-group">
                    <h6 className="title">Files</h6>
                    <div className="nk-files-list">
                        {filesList.filter(item => item.type === 'file').map((item) => (
                            <File
                                key={item.id}
                                item={item}
                                fileView={fileView}
                                page={page}
                                selectedId={selectedId}
                                onSelect={onSelect}
                                onDoubleClick={handleDoubleClick}
                            />
                        ))}
                    </div>
                </div>
            </>}
            {filesList.length === 0 && <div className="mt-2">Không có thư mục hoặc file nào</div>}
        </div>
    );
}

export default Files