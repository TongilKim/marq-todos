import React, { LegacyRef, useCallback } from "react";
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
  lastElementRef: ((node: HTMLElement) => void) | null;
};
const TodoItem = ({ currentTodo, lastElementRef }: Tprops) => {
  const dispatch = useAppDispatch();
  const { id, text, done, todoWith } = currentTodo;
  const { addingSubTaskMode, todoList, selectedTodo } = useAppSelector(
    (state) => state.todoList
  );

  const validateIfCompleted = useCallback(() => {
    if (todoWith && todoList) {
      for (let i = 0; i < todoWith.length; i++) {
        if (todoList.find((todo) => todo.id === todoWith[i])?.done === false) {
          return false;
        }
      }
      return true;
    }
    return false;
  }, [todoList, todoWith]);

  const addNewTodoWith = useCallback(async () => {
    // selectedTodo -> 초기 목록에서 선택된 (Modal 창으로 띄어진) todo object
    // currentTodo -> 추가되는 todo object
    const newTodoObj = {
      ...(selectedTodo as Ttodo),
      todoWith: [...(selectedTodo?.todoWith as Ttodo["id"][]), currentTodo.id],
    };
    dispatch(setSelectedTodo(newTodoObj));

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
        const completAble = validateIfCompleted();
        if (!completAble) {
          dispatch(setSnackBarMsg("함께 해야 할 일이 아직 끝나지 않았습니다"));
          return;
        }
        if (newTodoObj) {
          await updateTodoApi({
            ...newTodoObj,
            done: !newTodoObj?.done,
          }).then((res) => {
            const { result, resultMessage } = res;
            dispatch(
              setSelectedTodo({
                ...newTodoObj,
                done: !newTodoObj?.done,
              })
            );

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
      // const deleteAble = validateIfCompleted();
      // if (!deleteAble) {
      //   dispatch(setSnackBarMsg("함께 해야 할 일이 아직 끝나지 않았습니다"));
      //   return;
      // }
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

  const openTodoDetailModal = useCallback(() => {
    if (addingSubTaskMode) {
      addNewTodoWith();
    } else {
      dispatch(setSelectedTodo(currentTodo));
      dispatch(setOpenEditModal(true));
    }
  }, [addNewTodoWith, addingSubTaskMode, currentTodo]);

  return (
    <div
      className="todoItem_root"
      ref={lastElementRef as LegacyRef<HTMLDivElement>}
    >
      <div
        className={`checkCircle_${done ? "completed" : "uncompleted"}`}
        onClick={onClickCompleteTask}
      >
        {done ? <MdDone /> : addingSubTaskMode ? <MdAdd /> : null}
      </div>
      <div
        className={`todoText_${done ? "completed" : "uncompleted"}`}
        onClick={openTodoDetailModal}
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
