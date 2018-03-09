const initialState = {
    generalStates: {
        history: [{
            squares: Array(9).fill(null),
        }],
        xIsNext: true,
        stepNumber: 0,
    }
};

export default initialState