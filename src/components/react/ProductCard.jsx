import { Image } from '@nextui-org/react'

const Arrow = (props) => (
  <svg
    width={21}
    height={20}
    viewBox='0 0 32 31'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M6.183 25.188 25.558 5.813m0 0H11.026m14.532 0v14.53'
      stroke='#fff'
      strokeWidth={3}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

export const ProductCard = ({ id, shortName, imageUrl }) => {
  return (
    <article className=' size-full relative overflow-hidden rounded-[34px]'>
      <Image
        src={imageUrl}
        className='  object-cover size-[11.5rem]'
      />
      <div
        className=' z-10 size-full absolute top-0 bottom-0 left-0 right-0  from-black/80  bg-[linear-gradient(to_top,_var(--tw-gradient-stops)60%)]'
      />
      <a
        className='bg-customOrange-500 z-20 hover:bg-customOrange-400 absolute -top-[1.2rem] -right-[1.2rem] transition-all hover:scale-110 rounded-tl-[30px] rounded-bl-[35px] p-4 flex items-end rounded-br-[30px] size-[70px]'
        href={`/productos/${id}`}
      >
        <Arrow />
      </a>

      <a
        href={`/productos/${id}`}
        className='absolute z-20 justify-center text-md text-white flex items-center gap-1 bottom-4 py-1 px-2 left-1/2 -translate-x-1/2 transition-all bg-customBlue-500 hover:bg-customBlue-400 hover:scale-105 w-[80%] rounded-xl text-center'
      >
        <span>¿</span>
        <h3 className='truncate'>
          {shortName}
        </h3>
        <span>?</span>
      </a>
    </article>

  )
}
