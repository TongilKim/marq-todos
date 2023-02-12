import React, { useState } from "react";
import { MdAdd, MdDone } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { setOpenSnackBar, setSnackBarMsg } from "../stores/slice/SnackbarSlice";
import { setAddingSubTaskMode, setTodoList } from "../stores/slice/TodoSlice";
import { getCurrentDate, populateNewId } from "../utils";
import "./TodoCreateBtn.scss";

const TodoCreateBtn = () => {
  const [open, setOpen] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const { addingSubTaskMode, todoList } = useAppSelector(
    (state) => state.todoList
  );
  const dispatch = useAppDispatch();

  const onCilckCreateBtn = () => {
    if (addingSubTaskMode) {
      dispatch(setAddingSubTaskMode(false));
    } else {
      setOpen(!open);
    }
  };
  const onChange = (e) => setNewTodo(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    if (newTodo.length === 0) {
      dispatch(setSnackBarMsg("신규 목록은 최소 1글자 이상 이어야 합니다."));
      dispatch(setOpenSnackBar(true));
    } else {
      dispatch(
        setTodoList([
          ...todoList,
          {
            id: populateNewId(),
            text: newTodo,
            done: false,
            created: getCurrentDate(),
            updated: getCurrentDate(),
          },
        ])
      );
      setNewTodo("");
    }
  };

  return (
    <>
      {open && (
        <form className="createNewTaskForm" onSubmit={onSubmit}>
          <div className="insertForm">
            <input
              autoFocus
              onChange={onChange}
              value={newTodo}
              placeholder="할 일을 입력 후, Enter 를 누르세요"
            />
          </div>
        </form>
      )}

      <button
        className={open && !addingSubTaskMode ? "cancelBtn" : "createBtn"}
        onClick={onCilckCreateBtn}
      >
        {addingSubTaskMode ? <MdDone /> : <MdAdd />}
      </button>
    </>
  );
};

export default TodoCreateBtn;
