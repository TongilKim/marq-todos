import React, { useEffect, useState } from "react";

import "./TodoEditModal.scss";
import { IoIosAddCircle } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import {
  setAddingSubTaskMode,
  setOpenEditModal,
  setTodoList,
} from "../stores/slice/TodoSlice";
import Constant from "../constant";
import { updateTodoApi } from "../api/todo";
import { setSnackBarMsg } from "../stores/slice/SnackbarSlice";
import { TResponseError, Ttodo } from "../types";
const TodoEditModal = () => {
  const [newTodo, setNewTodo] = useState("");

  const dispatch = useAppDispatch();
  const { selectedTodo } = useAppSelector((state) => state.todoList);

  const onClickAddingSubTask = () => {
    dispatch(setOpenEditModal(false));
    dispatch(setAddingSubTaskMode(true));
  };

  const onClickEditBtn = async () => {
    try {
      if (newTodo.length === 0) {
        dispatch(
          setSnackBarMsg("업데이트 내용은 최소 1글자 이상 이어야 합니다.")
        );
        return;
      }

      const newTodoObj = {
        id: (selectedTodo as Ttodo).id,
        text: newTodo,
      };
      await updateTodoApi(newTodoObj).then((res) => {
        const { result, resultMessage } = res;

        dispatch(setTodoList(result));
        dispatch(setSnackBarMsg(resultMessage));
      });
    } catch (err) {
      const typedError = err as TResponseError;
      dispatch(setSnackBarMsg(typedError.statusText));
    }

    dispatch(setOpenEditModal(false));
    setNewTodo("");
  };

  const onClickCloseBtn = () => {
    dispatch(setOpenEditModal(false));
  };

  const onChangeModifyTodoTitle = (e) => setNewTodo(e.target.value);

  useEffect(() => {
    if (selectedTodo) setNewTodo(selectedTodo.text);
  }, []);

  return (
    <>
      {selectedTodo && (
        <div className="overlay">
          <div className="modal_wrapper">
            <div className="modal_container">
              <div className="bottom_info">
                <div className="title">{selectedTodo.text}</div>
                <div>
                  <ul>
                    <li>생성 날짜: {selectedTodo.created}</li>
                    <li>최근 업데이트: {selectedTodo.updated}</li>
                    <li>
                      함께 해야 할 일: 리액트 공부, 애 보기{" "}
                      <IoIosAddCircle onClick={onClickAddingSubTask} />
                    </li>
                  </ul>
                </div>
                <textarea
                  className="description"
                  value={newTodo}
                  onChange={onChangeModifyTodoTitle}
                  readOnly={selectedTodo.done}
                  maxLength={Constant.TEXTAREA_MAX_LENGTH}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onClickEditBtn();
                    }
                  }}
                />
                <div className="button_Container">
                  <button onClick={onClickEditBtn}>Edit</button>
                  <button onClick={onClickCloseBtn}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoEditModal;
