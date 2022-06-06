import axios from 'axios'
import React, { useEffect } from 'react'
import './App.css'

const App = () => {
  const [payload, setPayload] = React.useState({})
  const [array, setArray] = React.useState([])
  const getData = async () => {
    try {
      const { data } = await axios.get(
        'https://projeto-post.azurewebsites.net/api/cards/2022-05-30'
      )
      console.log(data)
      if (data) setArray(data)
      // const res = await fetch(
      //   'https://projeto-post.azurewebsites.net/api/cards/2022-05-30',
      //   { method: 'GET', mode: 'no-cors' }
      // );
      // console.log(res);
      // const nome = await res.json();
      // console.log(nome);
      // debugger;
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const onSubmit = async e => {
    e.preventDefault()
    payload.userId = 1
    const res = await axios.post(
      'https://projeto-post.azurewebsites.net/api/cards/new',
      payload
    )
    // const res = await fetch(
    //   'https://projeto-post.azurewebsites.net/api/cards/2022-05-30',
    //   {
    //     method: 'POST',
    //     body: JSON.stringify(payload),
    //   }
    // );
    // setPayload(await res.json());
  }

  const handleChange = e => {
    setPayload({ ...payload, [e.target.name]: e.target.value })
  }

  return (
    <>
      <form onSubmit={onSubmit} className="header">
        {array && <pre>{JSON.stringify(array, null, 2)}</pre>}
        {/* <input type="text" name="title" onChange={handleChange} />
        <input type="text" name="body" onChange={handleChange} />
        <button
          type="submit"
          onClick={e => {
            onSubmit(e)
          }}
        >
          Submit
        </button>
        {array.map(({ title, body }) => {
          return (
            <>
              <h1>{title}</h1>
              <p>{body}</p>
            </>
          )
        })} */}
      </form>
    </>
  )
}

export default App
