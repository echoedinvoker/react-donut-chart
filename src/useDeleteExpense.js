import { useMutation } from "@tanstack/react-query";
import { deleteExpense as deleteExpenseApi } from "./apiExpenses";

export function useDeleteExpense() {
  const { mutate: deleteExpense, isLoading: isDeleting } = useMutation({
    mutationFn: deleteExpenseApi,
    onSuccess: () => console.log('deleted'),
    onError: () => console.log('error')
  })

  return { deleteExpense, isDeleting }
}
