import Layout from '../components/Layout'
import Tabela from '../components/Tabela'
import Cliente from '../core/Cliente'

export default function Home() {
  const clientes = [
    new Cliente('1', 'Ana', 23),
    new Cliente('2', 'Pedro', 26),
    new Cliente('3', 'Bruna', 27),
    new Cliente('4', 'Roberto', 59)
  ]

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <Layout titulo="Cadastro simples">
        <Tabela clientes={clientes} />
      </Layout>
    </div>
  )
}
