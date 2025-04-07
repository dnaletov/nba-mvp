import styled from "styled-components";
import TextInput from "../atoms/SearchInput";

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
      <TextInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search players..."
      />
    </Wrapper>
  );
};

export default SearchBar;
