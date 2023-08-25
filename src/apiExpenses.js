import db from "./firestore";
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';


export async function addExpense(item) {
  const expensesCol = collection(db, 'expenses')
  const docRef = await addDoc(expensesCol, item)

  return docRef
}

export async function getExpenses() {
  const expensesCol = collection(db, 'expenses')
  const querySnapshot = await getDocs(expensesCol)
  const expenses = []
  querySnapshot.forEach(doc => {
    expenses.push(doc.data())
  })

  return expenses
}

export async function deleteExpense(id) {
  await deleteDoc(doc(db, 'expenses', id))
}
