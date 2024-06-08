import type { APIContext } from "astro"
import { Resend } from "resend"

const API_KEY = import.meta.env.RESEND_API_KEY

const resend = new Resend(API_KEY)
export const POST = async (context: APIContext) => {
	console.log("POST")
	try {
		const { request } = context
		const body = await request.json()
		const { name, email, phone, message } = body

		if (!name || !email || !phone || !message) {
			return new Response(JSON.stringify({ error: "Hubo un error al recibir los datos." }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			})
		}

		resend.emails.send({
			from: "onboarding@resend.dev",
			to: "ventas@solutionestructuras.com.py",
			subject: "Nuevo pedido de Presupuesto!",
			html: `
		<p>Nombre: ${name}</p>
		<p>Email: ${email}</p>
		<p>Teléfono: ${phone}</p>
		<p>Mensaje: ${message}</p>
	`,
		})
		return new Response(JSON.stringify({ message: "Mensaje enviado" }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		})
	} catch (e) {
		return new Response(JSON.stringify({ error: e.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		})
	}
}
