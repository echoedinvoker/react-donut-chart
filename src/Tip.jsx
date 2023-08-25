function Tip({ tip }) {
  const { x, y, hidden, name, cost } = tip

  return (
    <g
      transform={`translate(${x}, ${y})`}
      className={`transition-all duration-200 opacity-${hidden ? 0 : 100}`}
      pointerEvents={'none'}
    >
      <rect transform="translate(0, -50)" width='100' height='50' fill="lightblue" stroke="blue" strokeWidth='2'></rect>
      <text transform="translate(10, -30)" className="uppercase border">{name}</text>
      <text transform="translate(10, -10)" className="uppercase">{cost}</text>
    </g>
  )
}

export default Tip
