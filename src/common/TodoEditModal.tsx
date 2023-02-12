import React, { useState } from "react";
import { getCurrentDate } from "../utils";
import "./TodoEditModal.scss";
import { IoIosAddCircle } from "react-icons/io";
const TodoEditModal = () => {
  const [openAddingTasksModal, setOpenAddingTasksModal] = useState(false);

  return (
    <>
      <div className="overlay">
        <div className="modal_wrapper">
          <div className="modal_container">
            <div className="bottom_info">
              <div className="title">{getCurrentDate()}</div>
              <div>
                <ul>
                  <li>생성 날짜: 2013/02/27</li>
                  <li>최근 업데이트: 2013/02/27</li>
                  <li>
                    함께 해야 할 일: 리액트 공부, 애 보기{" "}
                    <IoIosAddCircle
                      onClick={() => setOpenAddingTasksModal(true)}
                    />
                  </li>
                </ul>
              </div>
              <textarea className="description">샌드위치 사먹기</textarea>
              <div className="button_Container">
                <button>Edit</button>
                <button>Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoEditModal;
