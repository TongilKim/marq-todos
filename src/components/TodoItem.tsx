import React, { useCallback } from "react";
import { MdDone, MdDelete, MdAdd } from "react-icons/md";
import { deleteTodoApi, updateTodoApi } from "../api/todo";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { setSnackBarMsg } from "../stores/slice/SnackbarSlice";
import {
  setOpenEditModal,
  setSelectedTodo,
  setTodoList,
} from "../stores/slice/TodoSlice";
import { Tresponse, TResponseError, Ttodo } from "../types";
import "./TodoItem.scss";

type Tprops = {
  currentTodo: Ttodo;
};
const TodoItem = ({ currentTodo }: Tprops) => {
  const dispatch = useAppDispatch();
  const { id, text, done } = currentTodo;
  const { addingSubTaskMode, todoList, selectedTodo } = useAppSelector(
    (state) => state.todoList
  );

  const addNewTodoWith = useCallback(async () => {
    // selectedTodo -> 초기 목록에서 선택된 (Modal 창으로 띄어진) todo object
    // currentTodo -> 추가되는 todo object
    const newTodoObj = {
      ...(selectedTodo as Ttodo),
      todoWith: [...(selectedTodo?.todoWith as Ttodo[]), currentTodo],
    };
    dispatch(setSelectedTodo(newTodoObj));
    console.log("newTodoObj: ", newTodoObj);
    try {
      await updateTodoApi(newTodoObj).then((res) => {
        const { result, resultMessage } = res;

        dispatch(setTodoList(result));
        dispatch(setSnackBarMsg(resultMessage));
      });
    } catch (err) {
      const typedError = err as TResponseError;
      dispatch(setSnackBarMsg(typedError.statusText));
    }
  }, [selectedTodo, currentTodo]);

  const onClickCompleteTask = useCallback(async () => {
    if (addingSubTaskMode) {
      // Should add todoWith list
      addNewTodoWith();
    } else {
      // Should update 'done' property status
      const newTodoObj = todoList.find((todo) => todo.id === id);
      try {
        if (newTodoObj) {
          await updateTodoApi({
            ...newTodoObj,
            done: !newTodoObj?.done,
          }).then((res) => {
            const { result, resultMessage } = res;

            dispatch(setTodoList(result));
            dispatch(setSnackBarMsg(resultMessage));
          });
        } else {
          dispatch(setSnackBarMsg("상태를 변경 할 수 없습니다."));
        }
      } catch (err) {
        const typedError = err as TResponseError;
        dispatch(setSnackBarMsg(typedError.statusText));
      }
    }
  }, [addingSubTaskMode, todoList, selectedTodo]);

  const onClickRemove = async () => {
    try {
      await deleteTodoApi(id).then((res: Tresponse) => {
        if (res.resultCode === 200) {
          const deletedList = todoList.filter((todo) => todo.id !== id);
          dispatch(setTodoList(deletedList));
          dispatch(setSnackBarMsg(res.resultMessage));
        }
      });
    } catch (err) {
      const typedError = err as TResponseError;
      dispatch(setSnackBarMsg(typedError.statusText));
    }
  };

  const onClickTodoText = useCallback(() => {
    if (addingSubTaskMode) {
      addNewTodoWith();
    } else {
      dispatch(setSelectedTodo(currentTodo));
      dispatch(setOpenEditModal(true));
    }
  }, [addingSubTaskMode, selectedTodo]);

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
