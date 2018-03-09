import initialState from './initialState';
import _ from 'lodash';

export default function (state = initialState.generalStates, action) {
    let newState = _.clone(state);
    switch (action.type) {
        case 'START':
            newState.history = action.payload.history;
            newState.stepNumber = action.payload.stepNumber;
            newState.xIsNext = action.payload.xIsNext;
            break;
        case 'JUMP_TO_STEP':
            newState.stepNumber = action.payload.stepNumber;
            newState.xIsNext = action.payload.xIsNext;
            break;
        case 'BOARD_CLICKED':
            newState.history = action.payload.history;
            newState.stepNumber = action.payload.stepNumber;
            newState.xIsNext = action.payload.xIsNext;
            break;
        default:
            break;
    }

    return newState;
}
