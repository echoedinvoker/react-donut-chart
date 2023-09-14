import { arc, interpolate, pie, scaleOrdinal, schemeSet3, select } from "d3"
import { useDeleteExpense } from "./useDeleteExpense"
import { useEffect } from "react"

const pi = pie().sort(null).value(d => d.cost)
const colour = scaleOrdinal(schemeSet3)

function Pie({ setLegend, setTip, dims, donus, setSelected }) {
  const center = { x: dims.width / 2 + 5, y: dims.height / 2 + 5 }
  const arcPath = arc().outerRadius(dims.radius).innerRadius(dims.radius / 2)
  const { deleteExpense } = useDeleteExpense()

  useEffect(() => {
    colour.domain(donus.map(d => d.name))

    const legendData = colour.domain().map((d, i) => {
      return {
        name: d,
        color: colour.range().at(i)
      }
    })

    setLegend(legendData)


    const paths = select('.pieChart').selectAll('path').data(pi(donus))

    paths.exit()
      .transition().duration(750)
        .attrTween('d', arcTweenExit)
      .remove()
    paths
      .attr('d', arcPath)
      .transition().duration(750)
        .attrTween('d', arcTweenUpdate)

    paths.enter().append('path')
      .each(function(d) { this._current = d })
      .attr('stroke', '#fff') 
      .attr('stroke-width', 3)
      .attr('fill', d => colour(d.data.name))
      .on('mouseover', handleMouseOver)
      .on('mouseleave', handleMouseLeave)
      .on('click', handleClick)
      .transition().duration(750)
        .attrTween('d', arcTweenEnter)

  }, [donus])

  function handleClick(_, d) {
    deleteExpense(d.data.id)
  }

  function handleMouseOver(e, d) {
    setTip((tip) => {
      return {
        ...tip,
        x: e.offsetX,
        y: e.offsetY > 75 ? e.offsetY : 75,
        hidden: false,
        name: d.data.name,
        cost: d.data.cost
      }
    })
    select(this)
      .transition('changeSliceFill').duration(750)
        .attr('fill', '#fff')

    setSelected(d.data.name)
  }
  function handleMouseLeave(_, d) {
    setTip((tip) => {
      return {
        ...tip,
        hidden: true,
      }
    })
    select(this)
      .transition('changeSliceFill').duration(750)
        .attr('fill', () => colour(d.data.name))

    setSelected('')
  }

  function arcTweenUpdate(d) {
    const i = interpolate(this._current, d)

    this._current = d

    return function(t) {
      return arcPath(i(t))
    }
  }

  function arcTweenEnter(d) {
    const i = interpolate(d.endAngle, d.startAngle)
    
    return function(t) {
      d.startAngle = i(t)
      return arcPath(d)
    }
  }

  function arcTweenExit(d) {
    const i = interpolate(d.startAngle, d.endAngle)
    
    return function(t) {
      d.startAngle = i(t)
      return arcPath(d)
    }
  }

  return (
    <g className="pieChart" transform={`translate(${center.x}, ${center.y})`}>
    </g>
  )
}

export default Pie
