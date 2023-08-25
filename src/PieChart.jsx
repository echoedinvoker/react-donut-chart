import { useState } from "react"
import Legend from "./Legend"
import Tip from "./Tip"
import Pie from "./Pie"

const dims = { height: 300, width: 300, radius: 150 }

function PieChart({ donus }) {
  const [legend, setLegend] = useState([])
  const [selected, setSelected] = useState('')
  const [tip, setTip] = useState({
    x: 50,
    y: 100,
    hidden: true,
    name: '',
    cost: 0
  })

  return (
    <svg 
      width={`${dims.width + 150}px`} height={`${dims.height + 150}px` }
      className="bg-indigo-200"
    >
      <Pie setLegend={setLegend} setTip={setTip} dims={dims} donus={donus} setSelected={setSelected} />
      <Tip tip={tip} />
      <Legend data={legend} transform={`translate(${dims.width + 40}, 20)`} selected={selected} /> 
    </svg>
  )
}

export default PieChart
