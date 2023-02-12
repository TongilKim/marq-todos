import React from "react";
import Modal from "../common/TodoEditModal";
import "./TodoContainer.scss";

type Props = {
  children?: React.ReactNode;
};
function TodoTemplate({ children }: Props) {
  return (
    <>
      <div className="todoContainer_root">{children}</div>
    </>
  );
}

export default TodoTemplate;
