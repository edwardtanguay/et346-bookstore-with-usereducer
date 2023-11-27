import { useReducer } from "react";

interface IState {
	count: number;
	title: string;
}

interface ICountAction {
	type: "increment" | "decrement";
	payload: number;
}

interface ITitleAction {
	type: "changeTitle"
	payload: string;
}

const initialState: IState = {
	count: 0,
	title: "The useReducer Demo",
};

const reducer = (state: IState, action: ICountAction | ITitleAction) => {
	const _state = structuredClone(state);
	switch (action.type) {
		case "increment":
			_state.count += action.payload;
			break;
		case "decrement":
			_state.count -= action.payload;
			break;
		case "changeTitle":
			_state.title = action.payload;
	}
	return _state;
};

export const PageDemo = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<>
			<h2 className="text-2xl mb-5 font-bold">{state.title}</h2>
			<div className="flex gap-3 mb-4">
				<button
					onClick={() => dispatch({ type: "decrement", payload: 1 })}
					className="text-4xl pt-0 w-10 h-10 flex items-center justify-center"
				>
					-
				</button>
				<button
					onClick={() => dispatch({ type: "increment", payload: 1 })}
					className="text-4xl pt-0 w-10 h-10 flex items-center justify-center"
				>
					+
				</button>
				<p className="text-2xl mb-3">Count: {state.count}</p>
			</div>
			<div className="text-xl">
				Title:{" "}
				<input
					type="text"
					className="w-80 p-1 rounded"
					value={state.title}
					onChange={(e) =>
						dispatch({
							type: "changeTitle",
							payload: e.target.value,
						})
					}
				/>
			</div>
		</>
	);
};
