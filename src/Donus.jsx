import { useEffect, useReducer, useState } from "react";
import { useAddExpense } from "./useAddExpense";
import { useExpenses } from "./useExpenses";
import PieChart from "./PieChart";
import { collection, onSnapshot } from "firebase/firestore";
import db from "./firestore";
import BubbleChart from "./BubbleChart";

const initialState = { name: "", cost: "", donus: [], error: "" };

function reducer(state, action) {
  switch (action.type) {
    case "added":
      return { ...state, donus: [...state.donus, action.payload] };
    case "name":
      return { ...state, name: action.payload, error: "" };
    case "cost":
      return { ...state, cost: action.payload, error: "" };
    case "submit":
      const cost = parseInt(state.cost);
      if (state.name.trim() && cost > 0) {
        action.payload({ name: state.name, cost });
        return { ...state, name: "", cost: "" };
      } else {
        return { ...state, error: "Please enter the correct information." };
      }
    case "modified":
      return {
        ...state,
        donus: state.donus.map((d) =>
          d.id === action.payload.id ? action.payload : d,
        ),
      };
    case "removed":
      return {
        ...state,
        donus: state.donus.filter((d) => d.id !== action.payload),
      };
    default:
      throw new Error("Unknown action");
  }
}

function Donus() {
  const [ chart, setChart ] = useState('bubble')
  const [{ name, cost, donus, error }, dispatch] = useReducer(reducer, initialState);
  const { addExpense } = useAddExpense();

  useEffect(() => {
    onSnapshot(collection(db, "expenses"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        switch (change.type) {
          case "added":
            const newitem = { ...change.doc.data(), id: change.doc.id };
            dispatch({ type: "added", payload: newitem });
            break;
          case "modified":
            const modifieditem = { ...change.doc.data(), id: change.doc.id };
            dispatch({ type: "modified", payload: modifieditem });
            break;
          case "removed":
            dispatch({ type: "removed", payload: change.doc.id });
          default:
            break;
        }
      });
    });
  }, []);

  function handleName(e) {
    dispatch({ type: "name", payload: e.target.value });
  }
  function handleCost(e) {
    dispatch({ type: "cost", payload: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "submit", payload: addExpense });
  }
  function handleClickToBubble(e) {
    e.preventDefault()
    setChart('bubble')
  }
  function handleClickToDonus(e) {
    e.preventDefault()
    setChart('donus')
  }

  return (
    <div className="h-screen grid grid-rows-[auto_1fr_auto]">
      <header className="bg-indigo-700 p-3 border-b border-stone-100">
        <h1 className="text-3xl font-semibold text-indigo-100 uppercase text-center">
          Donut Chart
        </h1>
        <p className="font-light text-indigo-200 text-center">
          Monthly money tracker for ninjas...
        </p>
      </header>
      <main className="md:my-10 mx-auto flex flex-col md:flex-row text-center justify-center gap-0 lg::gap-4">
        <form className="flex flex-col gap-5 p-4 md:p-8 max-w-2xl">
          <span className="text-2xl uppercase font-semibold my-4 text-indigo-700">
            Add item :
          </span>
          <div className="flex text-center justify-between gap-5">
            <input
              className="h-12 w-full rounded-full 
              placeholder:italic placeholder:text-stone-400 
              focus:outline-none focus:ring focus:ring-opacity-50 py-3 px-5"
              placeholder="Input item name"
              type="text"
              id="name"
              value={name}
              onChange={handleName}
            />
          </div>
          <div className="flex text-center justify-between gap-5">
            <input
              className="h-12 w-full rounded-full
              placeholder:italic placeholder:text-stone-400 
              focus:outline-none focus:ring focus:ring-opacity-50 py-3 px-5"
              placeholder="Input item cost"
              type="text"
              id="cost"
              value={cost}
              onChange={handleCost}
            />
          </div>
          <div>
            <button
              className="mt-4 bg-indigo-700 hover:bg-indigo-900
              tracking-wide transition-colors duration-300 text-indigo-200 
              rounded-full px-4 py-3 uppercase font-bold outline-none focus:ring focus:ring-indigo-300"
              onClick={handleSubmit}
            >
              Add Item
            </button>
          </div>
          <div>
            <p className="text-red-800 italic font-thin">{error}</p>
          </div>
          <div className="flex gap-0 justify-center">
            <button 
              className={`py-1 pl-5 pr-2 rounded-l-full ${chart === 'donus' ? 'bg-indigo-600 text-indigo-100' : 'border border-indigo-600 text-indigo-600'}`}
              onClick={handleClickToDonus}
            >
              Donus
            </button>
            <button 
              className={`py-1 pr-5 pl-2 rounded-r-full ${chart === 'bubble' ? 'bg-indigo-600 text-indigo-100' : 'border border-indigo-600 text-indigo-600'}`}
              onClick={handleClickToBubble}
            >
              Bubble
            </button>
          </div>
        </form>
        <div className="p-8 max-w-2xl">
          { chart === 'bubble' && <BubbleChart donus={donus} /> }
          { chart === 'donus' && <PieChart donus={donus} /> }
        </div>
      </main>
    </div>
  );
}

export default Donus;
