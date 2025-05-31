import Body from "./components/Body";
import AllFiles from "./views/AllFiles";
import { BlockTitle } from "@/components/Component";
import Layout from "./components/Layout";

const FileManager = () => {
  return (
    <Layout>
      <Body
        searchBar
        viewFilter
        title={<BlockTitle page>Hồ sơ KYC</BlockTitle>}
      >
        <AllFiles />
      </Body>
    </Layout>
  );
};

export default FileManager;
