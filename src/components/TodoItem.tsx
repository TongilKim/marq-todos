import React from "react";
import { MdDone, MdDelete, MdAdd } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { setOpenEditModal, setTodoList } from "../stores/slice/TodoSlice";
import { Ttodo } from "../types";
import "./TodoItem.scss";

type TProps = {
  id: Ttodo["id"];
  text: Ttodo["text"];
  done: Ttodo["done"];
};
const TodoItem = ({ id, done, text }: TProps) => {
  const dispatch = useAppDispatch();
  const { addingSubTaskMode, todoList } = useAppSelector(
    (state) => state.todoList
  );

  const onClickCompleteTask = () => {
    if (addingSubTaskMode) {
    } else {
      const newTodoList = todoList.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      );
      dispatch(setTodoList(newTodoList));
    }
  };

  const onClickRemove = () => {
    const deletedList = todoList.filter((todo) => todo.id !== id);
    dispatch(setTodoList(deletedList));
  };

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
        onClick={onClickCompleteTask}
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
