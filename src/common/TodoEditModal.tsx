import React, { useCallback, useEffect, useState } from "react";

import "./TodoEditModal.scss";
import { IoIosAddCircle } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import {
  setAddingSubTaskMode,
  setOpenEditModal,
  setSelectedTodo,
  setTodoList,
} from "../stores/slice/TodoSlice";
import Constant from "../constant";
import { updateTodoApi } from "../api/todo";
import { setSnackBarMsg } from "../stores/slice/SnackbarSlice";
import { TResponseError, Ttodo } from "../types";
import Loader from "./Loader";

const TodoEditModal = () => {
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { selectedTodo, todoList } = useAppSelector((state) => state.todoList);

  const onClickAddingSubTask = useCallback(() => {
    dispatch(setAddingSubTaskMode(true));
    dispatch(setOpenEditModal(false));
  }, [dispatch]);

  const onClickEditBtn = async () => {
    try {
      setLoading(true);
      if (newTodo.length === 0) {
        dispatch(
          setSnackBarMsg("업데이트 내용은 최소 1글자 이상 이어야 합니다.")
        );
        return;
      }
      if (!selectedTodo?.done) {
        const newTodoObj = {
          ...(selectedTodo as Ttodo),
          text: newTodo,
        };
        await updateTodoApi(newTodoObj).then((res) => {
          const { result, resultMessage } = res;

          dispatch(setSelectedTodo(newTodoObj));
          dispatch(setTodoList(result));
          dispatch(setSnackBarMsg(resultMessage));
        });
      }
    } catch (err) {
      const typedError = err as TResponseError;
      dispatch(setSnackBarMsg(typedError.statusText));
    }

    // 없어도 되는 timeout 이지만 일반적으로 서버에 요청 하면 pending term이 있기에, 의도적으로 Loading 노출
    setTimeout(() => {
      setLoading(false);
      dispatch(setOpenEditModal(false));
      setNewTodo("");
    }, 350);
  };

  const onClickCloseBtn = useCallback(() => {
    dispatch(setOpenEditModal(false));
  }, []);

  const onChangeModifyTodoTitle = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setNewTodo(e.target.value),
    []
  );

  const getTodoText = useCallback(
    (searchId: Ttodo["id"]) => {
      const renderTodo = todoList.find((todo) => todo.id === searchId);
      if (renderTodo) {
        return (
          <span className={renderTodo.done ? "completed" : ""}>
            - {renderTodo.text} <i>@{renderTodo.id}</i>
          </span>
        );
      }
    },
    [todoList]
  );

  useEffect(() => {
    if (selectedTodo) setNewTodo(selectedTodo.text);
  }, [selectedTodo]);

  if (loading) return <Loader />;
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
                    <>
                      <div>
                        함께 해야 할 일:
                        {!selectedTodo.done && (
                          <IoIosAddCircle onClick={onClickAddingSubTask} />
                        )}
                      </div>
                      {selectedTodo.todoWith?.map((todoId) => (
                        <li key={todoId}>{getTodoText(todoId)}</li>
                      ))}
                    </>
                  </ul>
                </div>
                <textarea
                  className="description"
                  value={newTodo}
                  onChange={onChangeModifyTodoTitle}
                  readOnly={selectedTodo.done}
                  maxLength={Constant.TEXTAREA_MAX_LENGTH}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
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

export default React.memo(TodoEditModal);
