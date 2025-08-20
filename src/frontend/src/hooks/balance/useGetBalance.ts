import { useQuery } from '@tanstack/react-query'
import { getBalance } from '@/services/balancesService'
export default function useGetBalance() {

    return useQuery({
        queryKey: ['getBalance'],
        queryFn: getBalance,
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 1000 * 60 * 5,
    })
}
