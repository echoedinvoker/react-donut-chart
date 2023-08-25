
  function arcTweenEnter(d) {
    const i = interpolate(d.endAngle, d.startAngle)
    
    return function(t) {
      d.startAngle = i(t)
      arcPath(d)
    }
  }
