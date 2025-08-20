import api from '@/services/backend';
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
export default function MainPageForTest({ children }: { children?: React.ReactNode }) {

    const [balance, setBalance] = useState('');
    const [name, setName] = useState('');
    const [greeting, setGreeting] = useState('');
    const [newBalance, setNewBalance] = useState('');

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        api.get_balance().then((balance: bigint) => {
            const balanceStr = balance.toString();
            setBalance(balanceStr);
            setGreeting(`Hello, ${name}! Your balance is ${balanceStr}.`);
        });
    }

    function handleSetBalance() {
        const balanceBigInt = BigInt(newBalance);
        api.set_balance(balanceBigInt).then((res: number) => {
            console.log("Set balance result:", res);
            // Optionally refresh the balance
            api.get_balance().then((updated: bigint) => {
                setBalance(updated.toString());
            });
        });
    }

    useEffect(() => {

        console.log(api, "backend is ready");
        return () => {
        }
    }, [])


    return (
        <main>
            <p>this asd;aolskd;lk test</p>
            {children}
            <br />
            <p>this is outlet</p>
            <Outlet />
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
    )
}
