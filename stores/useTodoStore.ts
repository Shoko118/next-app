import { create } from "zustand";
import { ChangeEvent } from "react";
import { Todo } from "@/ts/interfaces/interface";

interface TodoState {
  todos: Todo[];
  description: string;
}

interface TodoAction {
  addTodo: () => void;
  handleDescription: (e: ChangeEvent<HTMLInputElement>) => void;
  removeTodo: (id: Todo["id"]) => void;
}

export const useTodoStore = create<TodoState & TodoAction>((set) => ({
  todos: [
    {
      id: 1,
      description: "Basketball",
      isComplete: false,
    },
    {
      id: 2,
      description: "Basketball",
      isComplete: false,
    },
    {
      id: 3,
      description: "Basketball",
      isComplete: false,
    },
  ],
  description: "",

  // LOGICS =========
  handleDescription: (e: ChangeEvent<HTMLInputElement>) => {
    set(() => ({
      description: e.target.value,
    }));
  },
  addTodo: () => {
    set((state) => ({
      todos: [...state.todos, { id: Math.random(), description: state.description, isComplete: false } as Todo],
    }));
  },
  removeTodo: (id: Todo["id"]) => {
    set((state) => ({
      todos: state.todos.filter((item) => item.id !== id),
    }));
  },
}));
