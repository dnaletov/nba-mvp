import { Input } from "./SearchInput.styled";

interface TPTextInput {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const TextInput: React.FC<TPTextInput> = ({ value, onChange, placeholder }) => {
  return (
    <Input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder || "Type text..."}
    />
  );
};

export default TextInput;
