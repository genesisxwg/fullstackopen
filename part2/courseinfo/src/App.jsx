import Course from './Course'

const App = () => {
  const courses = [
    {
      name: 'Desarrollo dee aplicaciones Half Stack',
      id: 1,
      parts: [
        {
          name: 'Fundamentos de React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Usando props para pasar datoss',
          exercises: 7,
          id: 2
        },
        {
          name: 'Estado de un componente',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Enrutamiento',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Plan de estudios de desarrollo web</h1>
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  )
}

export default App
