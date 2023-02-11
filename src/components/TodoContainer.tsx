import React from "react";
import "./TodoContainer.scss";

type Props = {
  children?: React.ReactNode;
};
function TodoTemplate({ children }: Props) {
  return <div className="todoContainer_root">{children}</div>;
}

export default TodoTemplate;
