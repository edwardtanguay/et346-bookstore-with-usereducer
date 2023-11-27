import { useReducer } from "react";

interface IState {
	count: number;
}

interface IAction {
	type: "increment" | "decrement";
	payload: number;
}

const initialState: IState = {
	count: 0,
};

const reducer = (state: IState, action: IAction) => {
	const _state = structuredClone(state);
	switch (action.type) {
		case "increment":
			_state.count += action.payload;
			break;
		case "decrement":
			_state.count -= action.payload;
			break;
	}
	return _state;
};

export const PageDemo = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<>
			<h2 className="text-2xl mb-5 font-bold">Demo of useReducer</h2>
			<div className="flex gap-3">
				<button onClick={() => dispatch({type: 'decrement', payload: 1})} className="text-4xl pt-0 w-10 h-10 flex items-center justify-center">
					-
				</button>
				<button onClick={() => dispatch({type: 'increment', payload: 1})} className="text-4xl pt-0 w-10 h-10 flex items-center justify-center">
					+
				</button>
				<p className="text-2xl mb-3">Count: {state.count}</p>
			</div>
		</>
	);
};
