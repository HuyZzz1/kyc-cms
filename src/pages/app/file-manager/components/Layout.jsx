import Content from "@/layout/content/Content";
import Head from "@/layout/head/Head";
import FileManagerAside from "./Aside";
import { useFileManager } from "./Context";

const FileManagerLayout = ({ ...props }) => {
  const { fileManager } = useFileManager();

  return (
    <>
      <Head title="Quản lí File"></Head>
      <Content>
        <div className="nk-fmg">
          <FileManagerAside />
          <div
            className="nk-fmg-body"
            style={{ minHeight: `${fileManager.contentHeight}px` }}
          >
            {props.children}
          </div>
        </div>
      </Content>
    </>
  );
};

export default FileManagerLayout;
