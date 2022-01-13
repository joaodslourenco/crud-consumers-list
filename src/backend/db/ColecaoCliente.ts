import firebase from '../config'
import Cliente from '../../core/Cliente'
import ClienteRepositorio from '../../core/ClienteRepositorio'

export default class ColecaoCliente implements ClienteRepositorio {
  #conversor = {
    toFirestore(cliente: Cliente) {
      return {
        nome: cliente.nome,
        idade: cliente.idade
      }
    },
    fromFirestore(
      snapshot: firebase.firestore.QueryDocumentSnapshot,
      options: firebase.firestore.SnapshotOptions
    ): Cliente {
      const dados = snapshot.data(options)
      return new Cliente(snapshot.id, dados.nome, dados.idade)
    }
  }

  /*dentro do método "salvar", o if verifica se já existe cliente com o id passado. Caso positivo, ele altera os dados através do método set. Caso negativo, ele cria um novo cliente com os dados recebidos. */

  async salvar(cliente: Cliente): Promise<Cliente> {
    if (cliente?.id) {
      await this.#colecao().doc(cliente.id).set(cliente)
      return cliente
    } else {
      const docRef = await this.#colecao().add(cliente)
      const doc = await docRef.get()
      return doc.data()
    }
  }

  async excluir(cliente: Cliente): Promise<void> {
    return this.#colecao().doc(cliente.id).delete()
  }

  async obterTodos(): Promise<Cliente[]> {
    const query = await this.#colecao().get()
    return query.docs.map(doc => doc.data())
  }

  /* o método "colecao" aqui é responsável por interagir com o firebase, informando a coleção a ser consumida e o conversor, que é responsável por enviar e receber dados do firebase*/
  #colecao() {
    return firebase
      .firestore()
      .collection('clientes')
      .withConverter(this.#conversor)
  }
}
