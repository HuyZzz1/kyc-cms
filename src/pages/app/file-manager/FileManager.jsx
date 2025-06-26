import Body from "./components/Body";
// import Home from "./views/Home";
import Layout from "./components/Layout";

import { BlockTitle } from "@/components/Component";
import AllFiles from "./views/AllFiles";

const FileManager = () => {
  return (
    <Layout>
      <Body searchBar title={<BlockTitle page>Trang chính</BlockTitle>}>
        {/* <Home /> */}
        <AllFiles />
      </Body>
    </Layout>
  );
};

export default FileManager;
