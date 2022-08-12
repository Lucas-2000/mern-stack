import React, { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {
  const {dispatch} = useWorkoutsContext()
  const [title, setTitle] = useState('')
  const [reps, setReps] = useState('')
  const [load, setLoad] = useState('')
  const [error, setError] = useState('')
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const workout = {title, reps, load}

    const response = await fetch('http://localhost:4000/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    const json = await response.json()

    if(!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }

    if(response.ok) {
      setTitle('')
      setReps('')
      setLoad('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>

      <label>Exercise title:</label>
      <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} className={emptyFields.includes('title') ? 'error' : ''}/>
      <label>Reps:</label>
      <input type="number" onChange={(e) => setReps(e.target.value)} value={reps} className={emptyFields.includes('reps') ? 'error' : ''}/>
      <label>Loads (in kg):</label>
      <input type="number" onChange={(e) => setLoad(e.target.value)} value={load} className={emptyFields.includes('load') ? 'error' : ''}/>

      <button>Add workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm