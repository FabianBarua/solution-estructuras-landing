import { cn } from "@/shared/lib/utils";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";

export function Dashboard() {

	const [socialMedia, setSocialMedia] = useState([])

	useEffect(() => {
		const getSocialMedia = async () => {
			const response = await fetch("/api/redes")
			const data = await response.json()
			setSocialMedia(data.redes)

		}
		getSocialMedia()

	}, [])

	const handleChangedSocialMedia = async ({
		changedSocialMedia,
		newState
	}) => {
		const promise = fetch("/api/redes/update", {
			method: "POST",
			body: JSON.stringify({
				id: changedSocialMedia?.id,
				actived: newState
			})
		}).then(async (res) => {
			if (res.ok) {
				setSocialMedia((prevState) => {
					return prevState.map((item) => {
						if (item?.id === changedSocialMedia?.id) {
							return {
								...item,
								actived: newState
							}
						}
						return item
					})
				})
				const data = await res.json().then((data) => {
					setSocialMedia((prevState) => {
						const index = prevState.findIndex((item) => item?.id === data.product?.id);
						prevState[index] = data.product;
						const inputElement = document.getElementById(data.product.name) as HTMLInputElement;
						inputElement.value = data.product.url;

						return [...prevState];
					});
					return data;
				});
				return data;
			}
			throw new Error("Error al guardar")
		}
		)


		toast.promise(
			promise,
			{
				loading: "Guardando...",
				success: "Guardado con éxito",
				error: "Error al guardar"
			}

		)


	}

	const handleSave = (
		{
			changedSocialMedia,
			newUrl
		}) => {
		const promise = fetch("/api/redes/update", {
			method: "POST",
			body: JSON.stringify({
				id: changedSocialMedia?.id,
				url: newUrl
			})
		}).then(async (res) => {
			if (res.ok) {
				const data = await res.json().then((data) => {
					setSocialMedia((prevState) => {
						const index = prevState.findIndex((item) => item?.id === data.product?.id);
						prevState[index] = data.product;
						return [...prevState];
					});
					return data;
				});
				return data;
			}
			throw new Error("Error al guardar")
		}
		)

		toast.promise(
			promise,
			{
				loading: "Guardando...",
				success: "Guardado con éxito",
				error: "Error al guardar"
			}


		)
	}

	return (
		<>
			<Toaster />
			<div className="space-y-6 p-6">
				<div>
					<h3 className="text-lg font-medium">Redes sociales.</h3>
					<p className="text-sm text-muted-foreground">
						En esta sección puedes configurar las redes sociales que se mostrarán en tu tienda.
					</p>
				</div>
				<Separator />
				<div className="  w-full grid grid-cols-[repeat(auto-fit,_minmax(16rem,_1fr))] gap-3 ">
					{
						socialMedia.map((item, index) => {
							return (
								<Card
									key={item?.id}
									className={cn(
										"w-full",
										"space-y-2",
										item.actived ? "bg-muted/20" : " text-muted",
										"transition-colors duration-400 "
									)}
								>

									<CardHeader className="flex flex-row justify-between pb-1">
										<div>
											<CardTitle className="text-lg">{item.name}</CardTitle>
											<CardDescription
												className={
													cn(
														"text-sm",
														item.actived ? "text-muted-foreground" : "text-muted"
													)
												}
											>URL de tu {item.name}.</CardDescription>
										</div>
										<Switch
											checked={item.actived}
											onCheckedChange={(checked) => {
												handleChangedSocialMedia(
													{
														changedSocialMedia: item,
														newState: checked
													}
												)
											}}
										/>
									</CardHeader>
									<CardContent >
										<form onSubmit={
											(e) => {
												e.preventDefault();
												const inputElement = document.getElementById(item.name) as HTMLInputElement;
												handleSave(
													{
														changedSocialMedia: item,
														newUrl: inputElement.value
													}
												)
											}

										} className="space-y-2">
											<Input
												disabled={
													!item.actived
												}
												id={item.name}
												defaultValue={item.url}></Input>
											<Button
												disabled={
													!item.actived
												}
												type="submit"
												className="w-full duration-0" variant="outline">
												Guardar
											</Button>
										</form>
									</CardContent>
								</Card>
							);
						})
					}
				</div>

			</div>
		</>
	)
}
