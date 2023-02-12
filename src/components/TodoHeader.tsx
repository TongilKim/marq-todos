import React from "react";
import "./TodoHeader.scss";
import { getCurrentDate, getCurrentDayName } from "../utils";

export const TodoHeader = () => {
  return (
    <div className="todoHeader_root">
      <h1>{getCurrentDate()}</h1>
      <div className="day">{getCurrentDayName()}</div>
      <div className="task_left">할 일 {4}개 남음</div>
    </div>
  );
};
