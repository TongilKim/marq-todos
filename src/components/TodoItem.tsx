import React from "react";
import { MdDone, MdDelete } from "react-icons/md";
import "./TodoItem.scss";

type TProps = {
  id: number;
  text: string;
  done: boolean;
};
const TodoItem = ({ id, done, text }: TProps) => {
  const onClickCompleteTask = () => {};

  const onClickRemove = () => {};

  const onClickTodoText = () => {};

  return (
    <div className="todoItem_root">
      <div
        className={`checkCircle_${done ? "completed" : "uncompleted"}`}
        onClick={onClickCompleteTask}
      >
        {done && <MdDone />}
      </div>
      <div
        className={`todoText_${done ? "completed" : "uncompleted"}`}
        onClick={onClickTodoText}
      >
        {text}
      </div>
      <div className="removeBtn" onClick={onClickRemove}>
        <MdDelete />
      </div>
    </div>
  );
};

export default React.memo(TodoItem);
