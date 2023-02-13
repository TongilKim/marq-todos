import { rest } from "msw";
import { Ttodo } from "../types";

export const handlers = [
  // get
  rest.get("/test/todoList", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        resultCode: 200,
        resultMessage: "",
        result: JSON.parse(localStorage.getItem("todoList") || "[]"),
      })
    );
  }),
  // post
  rest.post("/test/newTodo", (req, res, ctx) => {
    const data = localStorage.getItem("todoList") || "[]";
    const prevTodoList = JSON.parse(data);

    req.json().then((newTodo) => {
      const newTodoList = [...prevTodoList, newTodo];

      // Save new data to temp database
      localStorage.setItem("todoList: ", JSON.stringify(newTodoList));
    });

    return res(
      ctx.status(200),
      ctx.json({
        resultCode: 200,
        resultMessage: "성공적으로 추가 되었습니다.",
        result: null,
      })
    );
  }),
  // put
  rest.put("/test", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        messages: "put!!!",
      })
    );
  }),
  // delete
  rest.delete("/test/deleteTodo/:todoId", (req, res, ctx) => {
    const { todoId } = req.params;
    console.log("todoId: ", todoId);
    const data = localStorage.getItem("todoList") || "[]";
    const prevTodoList: Ttodo[] = JSON.parse(data);

    const deletedList = prevTodoList.filter((todo) => todo.id !== todoId);

    // Save new data to temp database
    localStorage.setItem("todoList: ", JSON.stringify(deletedList));

    return res(
      ctx.status(200),
      ctx.json({
        resultCode: 200,
        resultMessage: "성공적으로 삭제 되었습니다.",
        result: null,
      })
    );
  }),
];
