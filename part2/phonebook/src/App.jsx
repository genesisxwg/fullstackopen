import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  //Cargar la lista completa de los países 
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => console.error('Error fetching countries:', error))
  }, [])

  // Filtrar los países según lo que el usuario escribe en el input
  const filteredCountries = query
    ? countries.filter(c => c.name.common.toLowerCase().includes(query.toLowerCase()))
    : []

  // Determinar el país activo a mostrar en detalle
  const countryToShow = filteredCountries.length === 1 ? filteredCountries[0] : selectedCountry

  // Consultar API del clima cuando hay un solo país seleccionado 
  useEffect(() => {
    if (countryToShow && countryToShow.capital) {
      const apiKey = import.meta.env.VITE_SOME_KEY
      const capital = countryToShow.capital[0]

      if (apiKey) {
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
          .then(response => setWeather(response.data))
          .catch(error => console.error('Error fetching weather:', error))
      }
    }
  }, [countryToShow])

  const handleSearchChange = (event) => {
    setQuery(event.target.value)
    setSelectedCountry(null) // Limpiar la selección manual previa
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <div>
        find countries <input value={query} onChange={handleSearchChange} />
      </div>

      <div style={{ marginTop: '15px' }}>
        {/* msj si coinciden más de 10 países */}
        {filteredCountries.length > 10 && (
          <p>Too many matches, specify another filter</p>
        )}

        {/* muestra lista con botón 'show' si hay entre 2 y 10 países */}
        {filteredCountries.length > 1 && filteredCountries.length <= 10 && !selectedCountry && (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredCountries.map(country => (
              <li key={country.cca3} style={{ marginBottom: '5px' }}>
                {country.name.common}{' '}
                <button onClick={() => setSelectedCountry(country)}>show</button>
              </li>
            ))}
          </ul>
        )}

        {/* Vista en detalle de un país específico */}
        {countryToShow && (filteredCountries.length === 1 || selectedCountry) && (
          <CountryDetail country={countryToShow} weather={weather} />
        )}
      </div>
    </div>
  )
}

const CountryDetail = ({ country, weather }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital ? country.capital.join(', ') : 'N/A'}</p>
      <p>area {country.area}</p>

      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages || {}).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img 
        src={country.flags.png} 
        alt={`Flag of ${country.name.common}`} 
        width="150" 
      />

      {weather && (
        <div>
          <h3>Weather in {country.capital[0]}</h3>
          <p>temperature {weather.main.temp} Celsius</p>
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt={weather.weather[0].description} 
          />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default App