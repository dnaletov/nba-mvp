interface TPButton {
  onClick: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const Button: React.FC<TPButton> = ({
  onClick,
  disabled = false,
  children,
}) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
