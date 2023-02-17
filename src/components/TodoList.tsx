import React, { useCallback, useEffect, useRef, useState } from "react";
import { getTodoListApi } from "../api/todo";

import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { setSnackBarMsg } from "../stores/slice/SnackbarSlice";
import { setTodoList } from "../stores/slice/TodoSlice";
import { Tresponse, TResponseError, Ttodo } from "../types";
import TodoItem from "./TodoItem";
import "./TodoList.scss";

const TodoList = () => {
  const dispatch = useAppDispatch();
  const { todoList, addingSubTaskMode, selectedTodo } = useAppSelector(
    (state) => state.todoList
  );
  const observer: any = useRef();
  const [maxCountToRender, setMaxCountToRender] = useState<number>(5);
  const [slicedTodoList, setSlicedTodoList] = useState<Ttodo[]>([]);

  // infinite scroll 구현
  // todo list 에서 최하단 element에게 설정 될 ref 선언
  const lastItemElementRef = useCallback((node: HTMLElement) => {
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver((entries) => {
      // 최하단 스크롤 위치 했을 때
      if (entries[0].isIntersecting) {
        // 해당 state를 증가 시킴으로써 다음 데이터를 랜더
        setMaxCountToRender((prev) => prev + 5);
      }
    });
    if (node) {
      observer.current.observe(node);
    }
  }, []);

  // 데이터를 초기화 시키는 함수
  const initData = useCallback(() => {
    if (todoList.length === 0) {
      try {
        getTodoListApi().then((res: Tresponse) => {
          dispatch(setTodoList(res.result));
          const firstRenderList = res.result.slice(0, maxCountToRender);
          // 5개만 랜더하기 위해서, 로컬 state에 sliced된 todolist 저장
          setSlicedTodoList(firstRenderList);
          // setMaxCountToRender(10);
        });
      } catch (err) {
        const typedError = err as TResponseError;
        dispatch(setSnackBarMsg(typedError.statusText));
      }
    } else {
      const slicedRenderList = todoList.slice(0, maxCountToRender);
      setSlicedTodoList(slicedRenderList);
    }
  }, [maxCountToRender, todoList]);

  // 함께 할 Todo List를 랜더 하는 함수
  const renderTodoWithList = (todo: Ttodo, idx: number) => {
    if (
      !todo.done && //1. 완료되지 않은 Todo
      todo.id !== selectedTodo?.id && //2. 현 todo를 제외한 나머지 Todo
      !selectedTodo?.todoWith?.find((todoId) => todoId === todo.id) //3. 현 Todo에 '함께 해야 할 일(todoWith property)'에 추가가 안된 Todo
    ) {
      // 마지막 Element 이면, ref를 전달하기 위한 조건문
      if (slicedTodoList.length === idx + 1) {
        return (
          <TodoItem
            key={todo.id}
            currentTodo={todo}
            lastElementRef={lastItemElementRef}
          />
        );
      } else {
        return (
          <TodoItem key={todo.id} currentTodo={todo} lastElementRef={null} />
        );
      }
    }
  };

  useEffect(() => {
    initData();
  }, [maxCountToRender, todoList]);

  return (
    <div className="todoList_root">
      {/* addingSubTaskMode가 TRUE 이면, 함께 할 Todo를 추가 하는 목록을 Render */}
      {/* addingSubTaskMode가 FALSE 이면, 초기 화면 Todo Render */}
      {addingSubTaskMode
        ? slicedTodoList.map((todo, idx) => renderTodoWithList(todo, idx))
        : slicedTodoList.map((todo, idx) => (
            <TodoItem
              key={todo.id}
              currentTodo={todo}
              lastElementRef={
                slicedTodoList.length === idx + 1 ? lastItemElementRef : null
              }
            />
          ))}
    </div>
  );
};

export default React.memo(TodoList);
