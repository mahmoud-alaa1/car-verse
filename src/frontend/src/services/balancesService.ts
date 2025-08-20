import api from "./backend";

export async function getBalance() {

    try {
        const res = await api.get_balance();
        return res;
    } catch (error) {
        console.error("Error fetching balance:", error);
        throw new Error("Failed to fetch balance");
    }
}