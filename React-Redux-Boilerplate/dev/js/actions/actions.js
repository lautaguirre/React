export const JUMP_TO_STEP = (steps) => {
    return {
        type: 'JUMP_TO_STEP',
        payload: steps
    }
};

export const BOARD_CLICKED = (boardClick) => {
    return {
        type: 'BOARD_CLICKED',
        payload: boardClick
    }
};

export const START = (start) => {
    return {
        type: 'START',
        payload: start
    }
};
