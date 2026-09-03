import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'Si duele, hazlo más a menudo.',
    '¡Añadir mano de obra a un proyecto de software retrasado lo retrasa aún más!',
    'El primer 90% del código representa el primer 10% del tiempo de desarrollo... El 10% restante representa el otro 90% del tiempo de desarrollo.',
    'Cualquier tonto puede escribir código que una computadora entienda. Los buenos programadores escriben código que los humanos pueden entender.',
    'La optimización prematura es la raíz de todos los males.',
    'Depurar es el doble de difícil que escribir el código en primer lugar. Por lo tanto, si escribes el código lo más astutamente posible, por definición, no eres lo suficientemente inteligente para depurarlo.',
    'Programar sin un uso extremadamente intensivo de console.log es lo mismo que si un médico se negara a usar rayos X o análisis de sangre al diagnosticar a los pacientes.',
    'La única manera de ir rápido es ir bien.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleNextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const maxVotes = Math.max(...votes)
  const mostVotedIndex = votes.indexOf(maxVotes)

  return (
    <div>
      <h1>Anécdota del día</h1>
      <div>{anecdotes[selected]}</div>
      <div>tiene {votes[selected]} votos</div>
      <button onClick={handleVote}>votar</button>
      <button onClick={handleNextAnecdote}>siguiente anécdota</button>

      <h1>Anécdota más votada</h1>
      {maxVotes > 0 ? (
        <div>
          <div>{anecdotes[mostVotedIndex]}</div>
          <div>tiene {maxVotes} votos</div>
        </div>
      ) : (
        <div>Aún no se han registrado votos</div>
      )}
    </div>
  )
}

export default App
