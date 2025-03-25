import { useState, useRef } from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;
`;

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const lastDeleteTimeRef = useRef<number>(0);
  const timeoutRef = useRef<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const now = Date.now();

    if (newValue.length < inputValue.length) {
      const timeSinceLastDelete = now - lastDeleteTimeRef.current;

      if (timeSinceLastDelete < 500) {
        return;
      }
      lastDeleteTimeRef.current = now;
    }

    setInputValue(newValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      onChange(newValue);
    }, 300);
  };

  return (
    <Input
      type="text"
      value={inputValue}
      onChange={handleChange}
      placeholder={placeholder || "Search..."}
    />
  );
};

export default SearchInput;
