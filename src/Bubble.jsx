import { hierarchy, pack, scaleOrdinal, schemeSet3, select } from "d3";
import { useDeleteExpense } from "./useDeleteExpense";
import { useEffect } from "react";

const dims = { height: 420, width: 420, radius: 150 };

const p = pack().size([dims.width, dims.height]).padding(10);
const colour = scaleOrdinal(schemeSet3);

function Bubble({ donus }) {
  const { deleteExpense } = useDeleteExpense();

  useEffect(() => {
    colour.domain(donus.map((d) => d.name));
    const data = p(hierarchy({ children: donus }).sum((d) => d.cost))
      .descendants()
      .filter((d) => d.parent);

    const circles = select(".bubbleChart").selectAll("circle").data(data);

    circles.exit().transition().duration(750).attr("r", 0).remove();

    circles
      .transition()
      .duration(750)
      .attr("r", (d) => (d.r ? d.r : 0))
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    circles
      .enter()
      .append("circle")
      .each(function(d) {
        this._current = d;
      })
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .attr("stroke", "#fff")
      .attr("stroke-width", 3)
      .attr("fill", (d) => colour(d.data.name))
      .attr(
        "class",
        "hover:brightness-150 hover:stroke-stone-600 hover:stroke-[5px]",
      )
      .on("click", handleClick)
      .attr("r", 0)
      .transition()
      .duration(750)
      .attr("r", (d) => (d.r ? d.r : 0));

    const texts = select(".bubbleChart").selectAll("text").data(data);

    texts.exit().transition().duration(1000).attr("opacity", 0).remove();

    texts
      .each(function(d) {
        const el = select(this);
        el.selectAll("tspan").remove();
        const lines = [d.data.name, d.data.cost];
        let dy = 0;

        lines.forEach((line) => {
          el.append("tspan")
            .attr("font-size", (d) => 10 + d.value * 0.02)
            .attr("x", 0)
            .attr("dy", `${dy}em`)
            .text(line);
          dy += 1;
        });
      })
      .transition()
      .duration(750)
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    texts
      .enter()
      .append("text")
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .attr("text-anchor", "middle")
      .attr("class", "uppercase fill-stone-700 font-semibold")
      .attr("pointer-events", "none")
      .each(function(d) {
        const el = select(this);
        const lines = [d.data.name, d.data.cost];
        let dy = 0;

        lines.forEach((line) => {
          el.append("tspan")
            .attr("font-size", (d) => 10 + d.value * 0.02)
            .attr("x", 0)
            .attr("dy", `${dy}em`)
            .text(line);
          dy += 1;
        });
      })
      .attr("opacity", 0)
      .transition()
      .duration(1000)
      .attr("opacity", 1);
  }, [donus]);

  function handleClick(_, d) {
    deleteExpense(d.data.id);
  }

  // function handleMouseOver(e, d) {
  //   setTip((tip) => {
  //     return {
  //       ...tip,
  //       x: e.offsetX,
  //       y: e.offsetY > 75 ? e.offsetY : 75,
  //       hidden: false,
  //       name: d.data.name,
  //       cost: d.data.cost
  //     }
  //   })
  //   select(this)
  //     .transition('changeSliceFill').duration(750)
  //       .attr('fill', '#fff')

  //   setSelected(d.data.name)
  // }
  // function handleMouseLeave(_, d) {
  //   setTip((tip) => {
  //     return {
  //       ...tip,
  //       hidden: true,
  //     }
  //   })
  //   select(this)
  //     .transition('changeSliceFill').duration(750)
  //       .attr('fill', () => colour(d.data.name))

  //   setSelected('')
  // }

  // function radiusTweenUpdate(d) {
  //   const i = interpolate(this._current.r, d.r)

  //   this._current = d

  //   return function(t) {
  //     return i(t)
  //   }
  // }

  // function arcTweenEnter(d) {
  //   const i = interpolate(d.endAngle, d.startAngle)
  //
  //   return function(t) {
  //     d.startAngle = i(t)
  //     return arcPath(d)
  //   }
  // }

  // function arcTweenExit(d) {
  //   const i = interpolate(d.startAngle, d.endAngle)
  //
  //   return function(t) {
  //     d.startAngle = i(t)
  //     return arcPath(d)
  //   }
  // }

  return (
    // <g className="bubbleChart" transform={`translate(${center.x}, ${center.y})`}>
    <g className="bubbleChart"></g>
  );
}

export default Bubble;
