import { useContext } from "react";
import { AppContext } from "../AppContext";

export const PageBooks = () => {
	const { state, dispatch} = useContext(AppContext);
	return (
		<>
			{state.userName && <p>Hallo, {state.userName}, please select your books!</p>}

			<p className="mb-4">There are {state.books.length} books.</p>

			<div className="flex gap-3 flex-wrap">
				{state.books.map((book) => {
					return (
						<div className="flex flex-col" key={book.id}>
							<img
								className="w-40 h-fit cursor-pointer"
								onClick={() => dispatch({ type: 'addBookToCart', payload: book })}
								src={`https://edwardtanguay.vercel.app/share/images/techBooks/${book.idCode}.jpg`}
							/>
							<p className="text-center bg-slate-800 text-yellow-300 pb-1">Ordered: {state.cart.items.filter(m => m.idCode === book.idCode).length}</p>
						</div>
					);
				})}
			</div>
		</>
	);
};
