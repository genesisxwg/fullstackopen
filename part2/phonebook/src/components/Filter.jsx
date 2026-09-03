const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filtrar con: <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

export default Filter
