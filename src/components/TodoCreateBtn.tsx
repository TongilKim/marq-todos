import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import "./TodoCreateBtn.scss";

const TodoCreateBtn = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  //   const dispatch = useTodoDispatch();
  //   const nextId = useTodoNextId();

  const onCilckCreateBtn = () => setOpen(!open);
  const onChange = (e) => setValue(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    setValue("");
  };

  return (
    <>
      {open && (
        <form className="createNewTaskForm">
          <div className="insertForm" onSubmit={onSubmit}>
            <input
              autoFocus
              onChange={onChange}
              value={value}
              placeholder="할 일을 입력 후, Enter 를 누르세요"
            />
          </div>
        </form>
      )}

      <button
        className={open ? "cancelBtn" : "createBtn"}
        onClick={onCilckCreateBtn}
      >
        <MdAdd />
      </button>
    </>
  );
};

export default TodoCreateBtn;
