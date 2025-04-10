import { StyledButton } from "./Button.styled";

interface TPButton {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
  active?: boolean;
}

export const Button: React.FC<TPButton> = ({
  onClick,
  disabled = false,
  children,
  active = false,
}) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled} active={active}>
      {children}
    </StyledButton>
  );
};
