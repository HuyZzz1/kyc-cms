import { Helmet } from "react-helmet";

const Head = ({ ...props }) => {
  return (
    <Helmet>
      <title>{props.title ? props.title + " | " : null} KYC Chain</title>
    </Helmet>
  );
};
export default Head;
