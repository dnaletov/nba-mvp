import TextInput from "../atoms/SearchInput";
import { Wrapper } from "./SearchBar.styled";

interface TPSearchBar {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<TPSearchBar> = ({ value, onChange }) => {
  return (
    <Wrapper>
      <TextInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search players..."
      />
    </Wrapper>
  );
};

export default SearchBar;
