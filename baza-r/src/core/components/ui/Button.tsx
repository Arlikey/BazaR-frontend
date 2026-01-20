import React, { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

const Button = (props: ButtonProps) => {
  return <button>{props.children}</button>;
};

export default Button;