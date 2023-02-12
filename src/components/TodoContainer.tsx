import React from "react";
import TodoEditModal from "../common/TodoEditModal";
import { useAppSelector } from "../stores/hooks";
import "./TodoContainer.scss";

type Props = {
  children?: React.ReactNode;
};
function TodoTemplate({ children }: Props) {
  const { openEditModal } = useAppSelector((state) => state.todoList);
  return (
    <>
      <div className="todoContainer_root">{children}</div>
      {openEditModal && <TodoEditModal />}
    </>
  );
}

export default TodoTemplate;
