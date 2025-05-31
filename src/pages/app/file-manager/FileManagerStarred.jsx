import Body from "./components/Body";
import Layout from "./components/Layout";
import Starred from "./views/Starred";

import { BlockTitle } from "@/components/Component";
const FileManager = () => {
  return (
    <Layout>
      <Body searchBar title={<BlockTitle page>Đánh dấu ưu tiên</BlockTitle>}>
        <Starred />
      </Body>
    </Layout>
  );
};

export default FileManager;
