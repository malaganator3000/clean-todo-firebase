import React from "react";

interface SpinnerProps {
  size?: number;
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 24,
  color = "#000",
}) => {
  return (
    <div
      className="animate-spin"
      style={{
        width: size,
        height: size,
        border: `4px solid ${color}`,
        borderTopColor: "transparent",
        borderRadius: "50%",
      }}
    />
  );
};
