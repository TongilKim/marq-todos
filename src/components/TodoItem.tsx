import React from "react";
import { MdDone, MdDelete, MdAdd } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { setOpenEditModal, setTodoList } from "../stores/slice/TodoSlice";
import "./TodoItem.scss";

type TProps = {
  id: number;
  text: string;
  done: boolean;
};
const TodoItem = ({ id, done, text }: TProps) => {
  const dispatch = useAppDispatch();
  const { addingSubTaskMode, todoList } = useAppSelector(
    (state) => state.todoList
  );

  const onClickCompleteTask = (clickedId) => {
    if (addingSubTaskMode) {
    } else {
      const newTodoList = [...todoList].map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      );
      dispatch(setTodoList(newTodoList));
    }
  };

  const onClickRemove = () => {};

  const onClickTodoText = () => {
    if (addingSubTaskMode) {
    } else {
      dispatch(setOpenEditModal(true));
    }
  };

  return (
    <div className="todoItem_root">
      <div
        className={`checkCircle_${done ? "completed" : "uncompleted"}`}
        onClick={() => onClickCompleteTask(id)}
      >
        {done ? <MdDone /> : addingSubTaskMode ? <MdAdd /> : null}
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
