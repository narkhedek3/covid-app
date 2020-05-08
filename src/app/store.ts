import { ITodo } from './todo';
import { ADD_TODO } from './actions';

export interface IAppState {
    todos: ITodo[];
    lastUpdate: Date;
}

export const INITIAL_STATE: IAppState = {
    todos: [],
    lastUpdate: null
};

export function rootReducer(state, action) {
    switch (action.type) {
        case ADD_TODO:
            return {
                todos: state.todos.concat(Object.assign({}, action.todo)),
                lastUpdate: new Date()
            };
        default:
            return state;
    }
}
