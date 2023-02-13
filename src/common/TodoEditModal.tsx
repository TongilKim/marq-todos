import React, { useEffect, useState } from "react";
import { getCurrentDate } from "../utils";
import "./TodoEditModal.scss";
import { IoIosAddCircle } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import {
  setAddingSubTaskMode,
  setOpenEditModal,
  setTodoList,
} from "../stores/slice/TodoSlice";
import Constant from "../constant";
const TodoEditModal = () => {
  const [newTodo, setNewTodo] = useState("");

  const dispatch = useAppDispatch();
  const { selectedTodo, todoList } = useAppSelector((state) => state.todoList);

  const onClickAddingSubTask = () => {
    dispatch(setOpenEditModal(false));
    dispatch(setAddingSubTaskMode(true));
  };

  const onClickEditBtn = () => {
    const newTodoList = todoList.map((todo) =>
      todo.id === selectedTodo?.id
        ? { ...todo, text: newTodo, updated: getCurrentDate() }
        : todo
    );
    dispatch(setTodoList(newTodoList));
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
