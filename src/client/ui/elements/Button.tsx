import React from "react";

export interface ButtonProps extends React.PropsWithChildren {
  onClick: (event: React.MouseEvent) => void;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 text-white p-2 rounded ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
