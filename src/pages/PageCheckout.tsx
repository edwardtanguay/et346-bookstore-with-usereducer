import { useContext } from "react";
import { AppContext } from "../AppContext";

export const PageCheckout = () => {
	const { state } = useContext(AppContext);
	return (
		<>
			{state.userName && <p>{state.userName}, double check your order!</p>}
			<div className="mt-4">
				{state.cart.items.map(book => {
					return (
						<div className="flex gap-3 items-center mb-3">
							<img
								className="w-12 h-fit cursor-pointer"
								src={`https://edwardtanguay.vercel.app/share/images/techBooks/${book.idCode}.jpg`}
							/>
							<p className="text-3xl">{book.title}</p>
						</div>
					)
				})}
			</div>
		</>
	)
};
