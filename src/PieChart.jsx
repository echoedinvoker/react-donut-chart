import { useEffect, useState } from "react"
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

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

    return (
      <svg
        width={`${dims.width + (isSmallScreen ? 35 : 150)}px`} height={`${dims.height + (isSmallScreen ? 35 : 150)}px`}
        className="bg-indigo-200 p-3 rounded-3xl"
      >
        <Pie setLegend={setLegend} setTip={setTip} dims={dims} donus={donus} setSelected={setSelected} />
        <Tip tip={tip} />
        {!isSmallScreen && <Legend data={legend} transform={`translate(${dims.width + 40}, 20)`} selected={selected} className="hidden md:block" /> }      </svg>
    )
  }

export default PieChart
