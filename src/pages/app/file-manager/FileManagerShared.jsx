import Body from "./components/Body";
import Shared from "./views/Shared";
import { BlockTitle } from "@/components/Component";
import Layout from "./components/Layout";

const FileManager = () => {
  return (
    <Layout>
      <Body searchBar title={<BlockTitle page>Chia sẻ nội bộ</BlockTitle>}>
        <Shared />
      </Body>
    </Layout>
  );
};

export default FileManager;
