import e from "express";
import React from "react";

export interface CheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return <input type="checkbox" checked={checked} onChange={onChange} />;
};
