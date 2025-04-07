// components/molecules/SearchBar.tsx
import styled from "styled-components";
import SearchInput from "../atoms/SearchInput";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 24px;
`;

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <Wrapper>
      <SearchInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search players..."
      />
    </Wrapper>
  );
};

export default SearchBar;
