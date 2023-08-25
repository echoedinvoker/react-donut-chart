import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "./apiExpenses";

export function useExpenses() {
  const { data: expenses, isLoading } = useQuery({
    queryKey: ['expenses'],
    queryFn: getExpenses
  })

  return { expenses, isLoading }
}
