import {FilterValuesType, TodoListType} from "../AppWithRedux";
import {v1} from "uuid";

export type ActionsType = ReturnType<typeof removeTodolistAC> | ReturnType<typeof addTodolistAC> | ReturnType<typeof changeTodolistTitleAC> | ReturnType<typeof changeTodolistFilterAC>

export let todoLIstID1 = v1();
export let todoLIstID2 = v1();

const initialState: Array<TodoListType> = [
    { id: todoLIstID1, title: 'What to learn', filter: 'all' },
    { id: todoLIstID2, title: 'What to buy', filter: 'all' },
]

export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.filter = action.filter;
            }
            return [...state]
        }
        default:
            return state;
    }
};

export const removeTodolistAC = (todolistId: string) => {
    return { type: 'REMOVE-TODOLIST', id: todolistId} as const
};
export const addTodolistAC = (title: string) => {
    return { type: 'ADD-TODOLIST', title, todolistId: v1()} as const
};
export const changeTodolistTitleAC = (id: string, title: string) => {
    return { type: "CHANGE-TODOLIST-TITLE", id: id, title: title} as const
};
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return { type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter} as const
};
