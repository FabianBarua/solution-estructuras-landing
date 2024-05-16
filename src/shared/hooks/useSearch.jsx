import { useState, useEffect, useRef } from "react"

export const useSearch = ({ search }) => {
	const [error, setError] = useState(null)

	const firstRender = useRef(true)

	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = search === ""
			return
		}

		if (search === "") {
			setError("Esta vacio")
			return
		}
		if (search.trim().length < 3) {
			setError("No puede ser menor que 3")
			return
		}
		setError(null)
	}, [search])

	return { error }
}
