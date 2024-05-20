import { lucia } from "@/auth"
import type { APIContext } from "astro"
import { db, eq, User } from "astro:db"
import { Argon2id } from "oslo/password"
export async function POST(context: APIContext): Promise<Response> {
	//read the form data
	const formData = await context.request.formData()
	const username = formData.get("username")
	const password = formData.get("password")

	//validate the data
	if (typeof username !== "string" || typeof password !== "string") {
		return new Response(JSON.stringify({ message: "Usuario o contraseña invalidas.1" }), {
			status: 401,
		})
	}

	//search the user
	const foundUser = (await db.select().from(User).where(eq(User.username, username))).at(0)

	const validPassword = foundUser
		? await new Argon2id().verify(foundUser.password, password)
		: false

	//If password is not valid
	if (!validPassword) {
		return new Response(
			JSON.stringify({
				message: "Usuario o contraseña invalidas.",
			}),
			{ status: 401 }
		)
	}

	const session = await lucia.createSession(foundUser?.id, {})
	const sessionCookie = lucia.createSessionCookie(session?.id)
	context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

	return new Response(JSON.stringify({ message: "Sesión iniciada." }))
}
