import { useEffect, useState } from 'react'
import { car_verse_backend } from '../../declarations/car-verse-backend/index.js';

function App() {
  const [greeting, setGreeting] = useState('');
  const [name, setName] = useState('');


  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    car_verse_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }
  useEffect(() => {
    console.log("car_verse_backend:", car_verse_backend);
  }, []);

  return (
    <>
      <main>
        <img src="/logo2.svg" alt="DFINITY logo" />
        <br />
        <br />
        <form action="#" onSubmit={handleSubmit}>
          <label htmlFor="name">Enter your name: &nbsp;</label>
          <input onChange={(e) => setName(e.target.value)} value={name} id="name" alt="Name" type="text" />
          <button type="submit">Click Me!</button>
        </form>
        <section id="greeting">{greeting}</section>
      </main>
    </>
  )
}

export default App
