import { PhotoProvider, PhotoView } from "react-photo-view"
import "react-photo-view/dist/react-photo-view.css"
import "./ImageCarrousel.css"

export const ImageCarrousel = ({ productImages: images }) => {
	return (
		<PhotoProvider
			maskOpacity={0.95}
			toolbarRender={({ rotate, onRotate, onScale, scale }) => {
				return (
					<>
						<svg
							className="PhotoView-Slider__toolbarIcon"
							onClick={() => onScale(scale + 1)}
							width="44"
							height="44"
							viewBox="0 0 768 768"
							fill="white"
						>
							<path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM415.5 223.5v129h129v63h-129v129h-63v-129h-129v-63h129v-129h63z" />
						</svg>
						<svg
							className="PhotoView-Slider__toolbarIcon"
							onClick={() => onScale(scale - 1)}
							width="44"
							height="44"
							viewBox="0 0 768 768"
							fill="white"
						>
							<path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM223.5 352.5h321v63h-321v-63z" />
						</svg>
						<svg
							className="PhotoView-Slider__toolbarIcon"
							onClick={() => onRotate(rotate + 90)}
							width="44"
							height="44"
							fill="white"
							viewBox="0 0 768 768"
						>
							<path d="M565.5 202.5l75-75v225h-225l103.5-103.5c-34.5-34.5-82.5-57-135-57-106.5 0-192 85.5-192 192s85.5 192 192 192c84 0 156-52.5 181.5-127.5h66c-28.5 111-127.5 192-247.5 192-141 0-255-115.5-255-256.5s114-256.5 255-256.5c70.5 0 135 28.5 181.5 75z" />
						</svg>
						<svg
							className="PhotoView-Slider__toolbarIcon"
							onClick={() => {
								document.documentElement.requestFullscreen()
							}}
							fill="white"
							width="44"
							height="44"
							viewBox="0 0 768 768"
						>
							<path d="M448.5 160.5h159v159h-63v-96h-96v-63zM544.5 544.5v-96h63v159h-159v-63h96zM160.5 319.5v-159h159v63h-96v96h-63zM223.5 448.5v96h96v63h-159v-159h63z" />
						</svg>
					</>
				)
			}}
		>
			{images.map((item, index) => (
				<PhotoView key={index} src={item}>
					{index < 1 ? (
						<img
							className="h-full w-full cursor-pointer rounded-[3rem] object-cover transition-all"
							src={item}
						/>
					) : undefined}
				</PhotoView>
			))}
		</PhotoProvider>
	)
}
