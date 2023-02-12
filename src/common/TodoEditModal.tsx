import React, { useState } from "react";
import { getCurrentDate } from "../utils";
import "./TodoEditModal.scss";
import { IoIosAddCircle } from "react-icons/io";
import { useAppDispatch } from "../stores/hooks";
import {
  setAddingSubTaskMode,
  setOpenEditModal,
} from "../stores/slice/TodoSlice";
const TodoEditModal = () => {
  const dispatch = useAppDispatch();

  const onClickAddingSubTask = () => {
    dispatch(setOpenEditModal(false));
    dispatch(setAddingSubTaskMode(true));
  };
  const onClickEditBtn = () => {
    dispatch(setOpenEditModal(false));
  };
  const onClickCloseBtn = () => {
    dispatch(setOpenEditModal(false));
  };
  return (
    <>
      <div className="overlay">
        <div className="modal_wrapper">
          <div className="modal_container">
            <div className="bottom_info">
              <div className="title">샌드위치 사먹기</div>
              <div>
                <ul>
                  <li>생성 날짜: 2013/02/27</li>
                  <li>최근 업데이트: 2013/02/27</li>
                  <li>
                    함께 해야 할 일: 리액트 공부, 애 보기{" "}
                    <IoIosAddCircle onClick={onClickAddingSubTask} />
                  </li>
                </ul>
              </div>
              <textarea className="description">샌드위치 사먹기</textarea>
              <div className="button_Container">
                <button onClick={onClickEditBtn}>Edit</button>
                <button onClick={onClickCloseBtn}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoEditModal;
