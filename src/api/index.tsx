import Constant from "../constant";
import { ApiRequest, Ttodo } from "../types";

export async function addNewTodoApi({ newTodo }: { newTodo: Ttodo }) {
  const res = await fetch(`${Constant.REQUEST_BASE_URL}/newTodo`, {
    method: ApiRequest.POST,
    body: JSON.stringify(newTodo),
  });

  const json = await res?.json();
  console.log("adding response: ", json);
  if (!res.ok) {
    throw {
      statusText: res.statusText,
      statusCode: res.status,
    };
  }

  return json;
}

export async function getTodoListApi() {
  const res = await fetch(`${Constant.REQUEST_BASE_URL}/todoList`, {
    method: ApiRequest.GET,
  });

  const json = await res?.json();

  if (!res.ok) {
    throw {
      statusText: res.statusText,
      statusCode: res.status,
    };
  }

  return json;
}

export async function deleteTodoApi(todoId: Ttodo["id"]) {
  const res = await fetch(`${Constant.REQUEST_BASE_URL}/deleteTodo/${todoId}`, {
    method: ApiRequest.DELETE,
  });
  console.log(res);
  const json = await res?.json();

  if (!res.ok) {
    throw {
      statusText: res.statusText,
      statusCode: res.status,
    };
  }

  return json;
}

export async function updateTodoApi(todo: Ttodo) {
  const res = await fetch(`${Constant.REQUEST_BASE_URL}/updateTodo/${todo}`, {
    method: ApiRequest.PUT,
  });
  console.log(res);
  const json = await res?.json();

  if (!res.ok) {
    throw {
      statusText: res.statusText,
      statusCode: res.status,
    };
  }

  return json;
}
