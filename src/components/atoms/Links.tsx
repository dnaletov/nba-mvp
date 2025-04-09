import { Link } from "react-router-dom";

interface TPLinks {
  to: string;
  children: React.ReactNode;
}

const Links: React.FC<TPLinks> = ({ to, children }) => (
  <Link to={to}>{children}</Link>
);

export default Links;
