import { Link } from "react-router-dom";

const Links: React.FC<{ to: string; children: React.ReactNode }> = ({
  to,
  children,
}) => <Link to={to}>{children}</Link>;

export default Links;
