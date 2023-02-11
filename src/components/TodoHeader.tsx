import React from "react";
import "./TodoHeader.scss";

export const TodoHeader = () => {
  const today = new Date();

  const dateString = today.toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dayName = today.toLocaleString("ko-KR", { weekday: "long" });

  return (
    <div className="todoHeader_root">
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <div className="task_left">할 일 {4}개 남음</div>
    </div>
  );
};
