import React, { useState } from "react";
import { MdAdd, MdDone } from "react-icons/md";
import { addNewTodoApi } from "../api/todo";
import Constant from "../constant";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { setSnackBarMsg } from "../stores/slice/SnackbarSlice";
import { setAddingSubTaskMode, setTodoList } from "../stores/slice/TodoSlice";
import { Tresponse, TResponseError } from "../types";
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
  const onChangeNewTodoInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewTodo(e.target.value);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
    if (newTodo.length === 0) {
      dispatch(setSnackBarMsg("신규 목록은 최소 1글자 이상 이어야 합니다."));
    } else {
      try {
        const newTodoData = {
          id: populateNewId(),
          text: newTodo,
          done: false,
          created: getCurrentDate(),
          updated: getCurrentDate(),
        };
        await addNewTodoApi({
          newTodo: newTodoData,
        }).then((res: Tresponse) => {
          if (res.resultCode === 200) {
            dispatch(setTodoList([...todoList, newTodoData]));
            dispatch(setSnackBarMsg(res.resultMessage));
            setNewTodo("");
          }
        });
      } catch (err) {
        const typedError = err as TResponseError;
        dispatch(setSnackBarMsg(typedError.statusText));
      }
    }
  };

  return (
    <>
      {open && (
        <form className="createNewTaskForm" onSubmit={onSubmit}>
          <div className="insertForm">
            <input
              autoFocus
              onChange={onChangeNewTodoInput}
              value={newTodo}
              maxLength={Constant.TEXTAREA_MAX_LENGTH}
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
