import { Helmet } from "react-helmet-async";

/** Keeps utility/auth/error routes out of search indexes. */
const NoIndex = ({ title }: { title: string }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="robots" content="noindex, nofollow" />
  </Helmet>
);

export default NoIndex;
