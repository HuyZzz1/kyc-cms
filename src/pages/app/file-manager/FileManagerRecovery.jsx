import Body from "./components/Body";
import Recovery from "./views/Recovery";

import { BlockTitle } from "@/components/Component";
import Layout from "./components/Layout";

const FileManager = () => {
  return (
    <Layout>
      <Body
        searchBar
        recoveryFilter
        title={<BlockTitle page>Khôi phục dữ liệu</BlockTitle>}
      >
        <Recovery />
      </Body>
    </Layout>
  );
};

export default FileManager;
