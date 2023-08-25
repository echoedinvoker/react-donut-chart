import { rgb, select } from "d3"
import { useEffect } from "react"

function Legend({ data, transform, selected }) {

  useEffect(() => {
    const legendGroups = select('.legend').selectAll('g').data(data)

    legendGroups.exit().remove()

    legendGroups
      .attr('transform', (_, i) => `translate(0, ${25 * i})`)
      .each(function() {
        const group = select(this)

        group.select('circle')
          .attr('fill', d => d.color)
          .attr('r', 10)

        group.select('text')
          .text(d => d.name)
          .attr('fill', rgb(99, 102, 241))
          .attr('class', 'uppercase text-xs')
          .attr('x', 15)
          .attr('y', 3)
      })

    legendGroups.enter().append('g')
      .attr('transform', (_, i) => `translate(0, ${25 * i})`)
      .each(function() {
        const group = select(this)

        group.append('circle')
          .attr('fill', d => d.color)
          .attr('r', 10)

        group.append('text')
          .text(d => d.name)
          .attr('fill', rgb(99, 102, 241))
          .attr('class', 'uppercase text-xs')
          .attr('x', 15)
          .attr('y', 3)
      })

    select('.legend').selectAll('circle')
      .each(function(d) {
        if (d.name === selected) 
          select(this).transition().duration(750)
            .attr('stroke', '#fff')
        else
          select(this).transition().duration(750)
            .attr('stroke', '')
          
      })
  }, [data, selected])
      

  return <g className="legend" transform={transform}>
  </g>
}

export default Legend
