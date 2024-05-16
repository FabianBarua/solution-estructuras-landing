import { Button } from "@components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@components/ui/card"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { navigate } from "astro:transitions/client"
import { toast } from "sonner"

import { Toaster } from "sonner"

export function LoginForm() {

	

	const handleSubmit = async (e) => {
		e.preventDefault()
		const form = new FormData(e.target)
		const username = form.get("username")
		const password = form.get("password")

		// post in /api/singin  how form data
		const newForm = new FormData()
		newForm.append("username", username)
		newForm.append("password", password)

		const API_URL = "/api/signin"
		const options = {
			method: "POST",
			body: newForm,
		}

		const promise = fetch(API_URL, options).then((res) =>
			res.json().then((data) => {
				if (res.ok) {
					setTimeout(() => {
						navigate("/admin", {
							history: "replace",
						})
					}, 1000)
					return data
				} else {
					return Promise.reject(data)
				}
			})
		)

		toast.promise(promise, {
			loading: "Cargando...",
			success: "Inicio de sesion exitoso",
			error: (error) => `Error: ${error.message}`,
			duration: 10000,
		})
	}

	return (
		<>
			<Toaster />

			<form className=" flex w-full items-center justify-center" onSubmit={handleSubmit}>
				<Card className="w-full max-w-sm">
					<CardHeader>
						<CardTitle className="text-2xl">Login</CardTitle>
						<CardDescription>Ingresa tu nombre de usuario.</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="username">Usuario</Label>
							<Input
								id="username"
								autoComplete="off"
								name="username"
								type="username"
								placeholder="Ingrese un usuario"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Contraseña</Label>
							<Input
								id="password"
								name="password"
								placeholder="Ingrese la contraseña"
								type="password"
								required
							/>
						</div>
					</CardContent>
					<CardFooter>
						<Button type="submit" className="w-full">
							Iniciar sesion
						</Button>
					</CardFooter>
				</Card>
			</form>
		</>
	)
}
