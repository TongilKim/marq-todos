import React from "react";
import TodoEditModal from "../common/TodoEditModal";
import { useAppSelector } from "../stores/hooks";
import "./TodoContainer.scss";

type Props = {
  children?: React.ReactNode;
};
function TodoTemplate({ children }: Props) {
  const { openEditModal, addingSubTaskMode } = useAppSelector(
    (state) => state.todoList
  );
  return (
    <>
      <div className={addingSubTaskMode ? "overlay" : ""}>
        <div className="todoContainer_root">{children}</div>
        {openEditModal && <TodoEditModal />}
      </div>
    </>
  );
}

export default TodoTemplate;
