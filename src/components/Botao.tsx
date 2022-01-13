interface BotaoProps {
  cor?: 'green' | 'red' | 'orange'
  className?: string
  onClick?: () => void
  children: any
}

export default function Botao(props: BotaoProps) {
  return (
    <button
      onClick={props.onClick}
      className={` text-white px-4 py-2 rounded-md ${props.className}`}
    >
      {props.children}
    </button>
  )
}
