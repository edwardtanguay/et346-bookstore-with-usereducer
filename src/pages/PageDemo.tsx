import { useReducer } from "react";

interface IState {
	count: number;
	title: string;
	history: string[]
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
	history: []
};

const reducer = (state: IState, action: ICountAction | ITitleAction) => {
	const _state = structuredClone(state);
	switch (action.type) {
		case "increment":
			_state.count += action.payload;
			_state.history.push(`added ${action.payload}`)
			break;
		case "decrement":
			_state.count -= action.payload;
			_state.history.push(`subtracted ${action.payload}`)
			break;
		case "changeTitle":
			_state.title = action.payload;
			_state.history.push(`change title to "${action.payload}"`);
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
			<div className="text-xl mb-3">
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
			<div>
				<h3 className="text-xl mb-3">History:</h3>
				{state.history.map((item, index) => {
					return (
						<p key={index} className="font-mono text-orange-900">{item}</p>
					)
				})}
			</div>
		</>
	);
};
