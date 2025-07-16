import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactServices from "../services/ContactService.jsx";
import { ContactCard } from "../components/ContactCard.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	useEffect(() => {
		const initAgenda = async () => {
			try {
				const data = await ContactServices.getAgenda("bryam");
				dispatch({ type: "getUserAgenda", payload: data.contacts });
			} catch (error) {
				console.log("Agenda no encontrada. Creando usuario...");
				try {
					await ContactServices.createAgenda("bryam");
					const newData = await ContactServices.getAgenda("bryam");
					dispatch({ type: "getUserAgenda", payload: newData.contacts });
				} catch (err) {
					console.error("No se pudo crear la agenda:", err);
				}
			}
		};

		initAgenda();
	}, []);

	return (
		<div className="card_user">
			<div className="row  d-flex justify-content-center">
				{store.agenda?.map(el => <ContactCard
					key={el.id}
					cid={el.id}
					name={el.name}
					phone={el.phone}
					email={el.email}
					address={el.address}
				/>
				)}
			</div>
		</div>
	)
}
