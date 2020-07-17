import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";


const rootReduser = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
});

// type AppRootState = {
//     todolists: Array<TodoListType>;
//     tasks: TasksStateType
// }

export type AppRootState = ReturnType<typeof rootReduser>


export const store = createStore(rootReduser);








// @ts-ignore
window.store = store;


