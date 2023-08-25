import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Donus from "./Donus"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0
    }
  }
})


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Donus />
    </QueryClientProvider>
  )
}

export default App
