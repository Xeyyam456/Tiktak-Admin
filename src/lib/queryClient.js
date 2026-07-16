import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query'
import { toast } from 'sonner'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 15_000 },  // 15 saniye  keslenme
  },
  queryCache: new QueryCache({
    onError: (err) => toast.error(err.message),
  }),
  mutationCache: new MutationCache({
    onError: (err) => toast.error(err.message),
  }),
})
