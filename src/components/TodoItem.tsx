import React from "react";
import { MdDone, MdDelete, MdAdd } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { setOpenEditModal } from "../stores/slice/TodoSlice";
import "./TodoItem.scss";

type TProps = {
  id: number;
  text: string;
  done: boolean;
};
const TodoItem = ({ id, done, text }: TProps) => {
  const dispatch = useAppDispatch();
  const { addingSubTaskMode } = useAppSelector((state) => state.todoList);

  const onClickCompleteTask = () => {};

  const onClickRemove = () => {};

  const onClickTodoText = () => {
    if (!addingSubTaskMode) {
      dispatch(setOpenEditModal(true));
    }
  };

  return (
    <div className="todoItem_root">
      <div
        className={`checkCircle_${done ? "completed" : "uncompleted"}`}
        onClick={onClickCompleteTask}
      >
        {done && !addingSubTaskMode ? <MdDone /> : <MdAdd />}
      </div>
      <div
        className={`todoText_${done ? "completed" : "uncompleted"}`}
        onClick={onClickTodoText}
      >
        {text}
      </div>
      <div className="removeBtn" onClick={onClickRemove}>
        {!addingSubTaskMode && <MdDelete />}
      </div>
    </div>
  );
};

export default React.memo(TodoItem);
