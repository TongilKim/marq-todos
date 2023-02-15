import { rest } from "msw";
import { Ttodo } from "../types";
import { getCurrentDate } from "../utils";

const saveToDatabase = (newTodoList: Ttodo[]) => {
  console.log("updated: ", newTodoList);
  localStorage.setItem("todoList", JSON.stringify(newTodoList));
};

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
    const currentTodoList = JSON.parse(data);

    req.json().then((newTodo) => {
      const newTodoList = [...currentTodoList, newTodo];

      // Save new data to temp database
      saveToDatabase(newTodoList);
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
  rest.put("/test/updateTodo/:newTodo", (req, res, ctx) => {
    const newTodo = JSON.parse(req.params.newTodo?.toString());

    const data = localStorage.getItem("todoList") || "[]";
    const currentTodoList: Ttodo[] = JSON.parse(data);

    const todoObjToUpdate = currentTodoList.find(
      (currentTodo) => currentTodo.id === newTodo.id
    );
    if (!todoObjToUpdate) {
      return res(
        ctx.status(404),
        ctx.json({
          resultCode: 404,
          resultMessage: "존재하지 않는 Todo ID 입니다.",
          result: null,
        })
      );
    } else {
      const newTodoList = currentTodoList.map((todo) =>
        todo.id === newTodo.id
          ? { ...todo, text: newTodo.text, updated: getCurrentDate() }
          : todo
      );
      // Save new data to temp database
      saveToDatabase(newTodoList);

      return res(
        ctx.status(200),
        ctx.json({
          resultCode: 200,
          resultMessage: "성공적으로 업데이트 되었습니다.",
          result: newTodoList,
        })
      );
    }
  }),

  // delete
  rest.delete("/test/deleteTodo/:todoId", (req, res, ctx) => {
    const { todoId } = req.params;
    const data = localStorage.getItem("todoList") || "[]";
    const currentTodoList: Ttodo[] = JSON.parse(data);

    //Validate
    const todoObjToDelete = currentTodoList.find(
      (currentTodo) => currentTodo.id === todoId
    );
    if (!todoObjToDelete) {
      return res(
        ctx.status(404),
        ctx.json({
          resultCode: 404,
          resultMessage: "존재하지 않는 Todo ID 입니다.",
          result: null,
        })
      );
    } else {
      // All Good
      const deletedList = currentTodoList.filter(
        (todo) => todo.id !== todoObjToDelete.id
      );
      // Save new data to temp database
      saveToDatabase(deletedList);

      return res(
        ctx.status(200),
        ctx.json({
          resultCode: 200,
          resultMessage: "성공적으로 삭제 되었습니다.",
          result: null,
        })
      );
    }
  }),
];
