import { useState } from 'react'
import Cliente from '../core/Cliente'
import Botao from './Botao'
import Entrada from './Entrada'

interface FormularioProps {
  cliente: Cliente
  cancelado?: () => void
  clienteMudou?: (cliente: Cliente) => void
}

export default function Formulario(props: FormularioProps) {
  const id = props.cliente?.id
  const [nome, setNome] = useState(props.cliente?.nome ?? '')
  const [idade, setIdade] = useState(props.cliente?.idade ?? 0)

  return (
    <div>
      {id ? (
        <Entrada texto="Código" valor={id} className="mb-4" somenteLeitura />
      ) : (
        false
      )}
      <Entrada
        texto="Nome"
        valor={nome}
        valorMudou={setNome}
        className="mb-4"
      />
      <Entrada
        tipo="number"
        texto="Idade"
        valor={idade}
        valorMudou={setIdade}
      />
      <div className="mt-7 flex justify-end">
        <Botao
          className="bg-green-500 mr-2"
          onClick={() => props.clienteMudou?.(new Cliente(id, nome, +idade))}
        >
          {id ? 'Alterar' : 'Salvar'}
        </Botao>
        <Botao className="bg-red-500" onClick={props.cancelado}>
          Cancelar
        </Botao>
      </div>
    </div>
  )
}
