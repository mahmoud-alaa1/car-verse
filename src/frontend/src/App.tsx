import { useEffect, useState } from 'react'
import { backend } from '../../declarations/backend/index.js';

function App() {
  const [balance, setBalance] = useState('');
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [newBalance, setNewBalance] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    backend.get_balance().then((balance: bigint) => {
      const balanceStr = balance.toString();
      setBalance(balanceStr);
      setGreeting(`Hello, ${name}! Your balance is ${balanceStr}.`);
    });
  }

  function handleSetBalance() {
    const balanceBigInt = BigInt(newBalance);
    backend.set_balance(balanceBigInt).then((res: number) => {
      console.log("Set balance result:", res);
      // Optionally refresh the balance
      backend.get_balance().then((updated: bigint) => {
        setBalance(updated.toString());
      });
    });
  }

  useEffect(() => {

    console.log(backend, "backend is ready");
    return () => {
    }
  }, [])


  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br /><br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input value={name} onChange={(e) => setName(e.target.value)} id="name" type="text" />
        <button type="submit">Check Balance</button>
      </form>

      <br />
      <label htmlFor="balance">Set new balance: &nbsp;</label>
      <input value={newBalance} onChange={(e) => setNewBalance(e.target.value)} id="balance" type="number" />
      <button type="button" onClick={handleSetBalance}>Set Balance</button>

      <section id="greeting">{greeting}</section>
      <section id="currentBalance">Current balance: {balance}</section>
    </main>
  );
}

export default App;
