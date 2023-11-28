import { createContext, useEffect, useReducer } from "react";
import { IBook, ICart } from "./interfaces";
import axios from "axios";

interface IState {
	userName: string;
	books: IBook[];
	cart: ICart;
}

const initialState: IState = {
	userName: "",
	books: [],
	cart: { items: [] },
};

interface IUserNameAction {
	type: "changeUserName";
	payload: string;
}

interface IBooksAction {
	type: "setBooks";
	payload: IBook[];
}

interface ICartAction {
	type: "setCart";
	payload: ICart;
}

interface IBookAction {
	type: "addBookToCart";
	payload: IBook;
}

const reducer = (
	state: IState,
	action: IUserNameAction | IBooksAction | ICartAction | IBookAction
) => {
	const _state = structuredClone(state);
	switch (action.type) {
		case "changeUserName":
			_state.userName = action.payload;
			break;
		case "setBooks":
			_state.books = action.payload;
			break;
		case "setCart":
			_state.cart = action.payload;
			break;
		case "addBookToCart":
			_state.cart.items.push(action.payload);
			break;
	}
	return _state;
};

interface IAppContext {
	state: IState;
	dispatch: React.Dispatch<IUserNameAction | IBookAction>;
}

interface IAppProvider {
	children: React.ReactNode;
}

const booksUrl = "https://edwardtanguay.vercel.app/share/techBooks.json";

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		setTimeout(async () => {
			const response = await axios.get(booksUrl);
			const _books = response.data;
			dispatch({ type: "setBooks", payload: _books });
		}, 2000);
	}, []);

	return (
		<AppContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
