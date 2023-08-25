import { useMutation } from "@tanstack/react-query";
import { addExpense as addExpenseApi } from "./apiExpenses";

export function useAddExpense() {
  const { mutate: addExpense, isLoading: isAdding } = useMutation({
    mutationFn: addExpenseApi,
    onSuccess: (docRef) => console.log(docRef.id),
    onError: () => console.log('error')
  })

  return { addExpense, isAdding }
}
