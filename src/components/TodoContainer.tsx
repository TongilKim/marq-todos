import React from "react";
import TodoEditModal from "../common/TodoEditModal";

import { useAppSelector } from "../stores/hooks";
import "./TodoContainer.scss";

type Tprops = {
  children?: React.ReactNode;
};
function TodoContainer({ children }: Tprops) {
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

export default TodoContainer;
