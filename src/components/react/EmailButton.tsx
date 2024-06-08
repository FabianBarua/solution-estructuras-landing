import { motion } from "framer-motion";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { EmailIcon } from "../icons/EmailIcon";
import { CloseIcon } from "./CloseIcon";

export const EmailButton = () => {
	// modal
	const [showModal, setShowModal] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();



		const myPromise = fetch('/api/redes/contact', {
			method: 'POST',
			body: JSON.stringify({
				name: event.target[0].value,
				email: event.target[1].value,
				phone: event.target[2].value,
				message: event.target[3].value
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => {
			if (response.status === 200) {
				setShowModal(false);
			}
		})

		toast.promise(myPromise, {
			loading: 'Cargando...',
			success: 'Email enviado correctamente.',
			error: 'Error al enviar el email.',
		});


	}

	return (
		<>
			<Toaster
				position="bottom-center"
				reverseOrder={false}
			/>
			{
				showModal && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						className=" w-screen p-6 h-screen fixed bg-black/65 top-0  left-0 z-40 flex  justify-center items-center">

						<div
							className="bg-white relative h-full w-full  flex flex-col max-w-5xl rounded-xl shadow-customBlue-400   gap-4 p-6"
						>

							<form className="flex  gap-4 w-full flex-1  "
								onSubmit={handleSubmit}
							>

								<div className=" flex flex-col  gap-3 flex-1 text-black">
									<h2 className="text-3xl  mt-6 text-center w-full  font-bold text-default-900">Solicitar Presupuesto</h2>

									<input
										required
										type="text"
										placeholder="Nombre"
										className="border mt-6 border-default-300 rounded-lg p-2"
									/>
									<input
										required
										type="email"
										placeholder="Correo Electrónico"
										className="border border-default-300 rounded-lg p-2"
									/>
									<input
										required
										type="text"
										placeholder="Teléfono"
										className="border border-default-300 rounded-lg p-2"
									/>
									<textarea
										required
										placeholder="Mensaje"
										className="border h-full max-h-44 border-default-300 rounded-lg p-2"
									/>

									<div className=" w-full  gap-3 mt-auto flex justify-end">
										<button type="button" onClick={
											() => setShowModal(false)

										} className=" bg-customOrange-300 hover:bg-customOrange-600 transition-colors text-white rounded-lg p-2 ml-2">
											Cancelar
										</button>

										<button
											type="submit"
											className="bg-customBlue-500 w-full hover:bg-customBlue-400 transition-colors text-white rounded-lg p-2"
										>
											Enviar Mensaje
										</button>

									</div>
								</div>



								<div className=" w-96 sm:block hidden h-full rounded-xl bg-white overflow-hidden relative">
									<div
										onClick={() => setShowModal(false)}
										className=" size-8  shadow-xl rounded-full text-default-500 absolute top-4 right-4 hover:text-default-900 transition-colors cursor-pointer ">
										<CloseIcon />
									</div>
									<img loading="lazy" src="/images/email.jpg" className=" h-full object-cover" alt="Señores mirando un plano" />
								</div>

							</form>

						</div>

					</motion.div>
				)
			}
			<button type="button"
				className="pointer-events-auto  shadow-customBlue-400 hover:bg-customBlue-400 bg-customBlue-500 text-white hover:-translate-y-1 transition-all flex justify-center items-center w-min text-nowrap gap-2  px-4 py-1 rounded-xl mt-4"
				onClick={() =>
					setShowModal(true)
				}>
				Solicitar Presupuesto
				<EmailIcon />
			</button>
		</>
	);
}