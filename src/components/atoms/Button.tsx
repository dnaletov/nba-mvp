import { StyledButton } from "./Button.styled";

interface TPButton {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<TPButton> = ({
  onClick,
  disabled = false,
  children,
}) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};
