import { scaleOrdinal, schemeSet3, select } from "d3";
import { useEffect, useState } from "react";
import { generateBubbleCoordinates } from "./generateBubble";
import { useDeleteExpense } from "./useDeleteExpense";

const dims = { height: 620, width: 420 };

const colour = scaleOrdinal(schemeSet3);


function Bubble({ donus }) {
  const [last, setLast] = useState(null)

  const { deleteExpense } = useDeleteExpense();
  
  useEffect(() => {
    colour.domain(donus.map((d) => d.name));

    // const { outputData: dataoccupied } = generateBubbleCoordinates(donus, dims.width, dims.height, 5, 3000, last);
    // setLast(occupied)
    
    console.log('srouce', donus)
    const data = generateBubbleCoordinates(donus, dims.width, dims.height, 8)
    console.log(data)

    const circles = select(".bubbleChart").selectAll("circle").data(data);
    console.log('circles', circles)

    circles.exit().transition().duration(750).attr("r", 0).remove();

    circles
      .transition()
      .duration(750)
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", (d) => d.radius); 
    
    circles
      .enter()
      .append("circle")
      .each(function(d) {
        this.dataset.id = d.id;
      })
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("fill", (d) => colour(d.name))
      .attr("stroke", "#fff")
      .attr("stroke-width", 3)
      .attr(
        "class",
        "hover:brightness-150 hover:stroke-stone-600 hover:stroke-[5px]",
      )
      .on("click", function() {
        handleClick(this.dataset.id)
      })
      .attr("r", 0)
      .transition()
      .duration(750)
      .attr("r", (d) => d.radius); 


  }, [donus]);

  function handleClick(id) {
    deleteExpense(id);
  }
  return (
    // <g className="bubbleChart" transform={`translate(${center.x}, ${center.y})`}>
    <g className="bubbleChart"></g>
  );
}

export default Bubble;

