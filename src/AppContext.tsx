import { createContext, useEffect, useState } from "react";
import { IBook, ICart } from "./interfaces";
import axios from "axios";
import { useReducer } from "react";

interface IState {
	userName: string;
	books: IBook[];
}

const initialState: IState = {
	userName: '',
	books: []
}

interface IUserNameAction {
	type: "changeUserName"
	payload: string;
}

interface IBooksAction {
	type: "setBooks"
	payload: IBook[];
}

const reducer = (state: IState, action: IUserNameAction | IBooksAction) => {
	const _state = structuredClone(state);
	switch (action.type) {
		case "changeUserName":
			_state.userName = action.payload;
			break;
		case "setBooks":
			_state.books = action.payload;
			break;
	}
	return _state;
};

interface IAppContext {
	state: IState,
	dispatch: React.Dispatch<IUserNameAction>,
	cart: ICart;
	handleAddBookToCart: (book: IBook) => void;
}

interface IAppProvider {
	children: React.ReactNode;
}

const booksUrl = "https://edwardtanguay.vercel.app/share/techBooks.json";

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [cart, setCart] = useState<ICart>({ items: [] } as ICart);

	useEffect(() => {
		setTimeout(async () => {
			const response = await axios.get(booksUrl);
			const _books = response.data;
			dispatch({type: 'setBooks', payload: _books})
		}, 2000);
	}, []);

	const handleAddBookToCart = (book: IBook) => {
		const _cart = structuredClone(cart);
		_cart.items.push(book);
		setCart(_cart);
	};

	return (
		<AppContext.Provider
			value={{
				state,
				dispatch,
				cart,
				handleAddBookToCart,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
