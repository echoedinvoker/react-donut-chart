export function generateBubbleCoordinates(data, width, height, scale_factor=1, max_attempts=3000) {
    // Initialize variables to keep track of occupied space
    let occupied = [];
    
    // Prepare the output data
    let outputData = [];
    
    // Function to check if a circle overlaps with existing ones
    const checkOverlap = (x, y, radius) => {
        for (let [ox, oy, oradius] of occupied) {
            if (Math.sqrt(Math.pow(ox - x, 2) + Math.pow(oy - y, 2)) < radius + oradius) {
                return true;
            }
        }
        return false;
    };

  // Function to adjust existing circles with minimal movement
    const adjustExistingCircles = (newX, newY, newRadius) => {
        for (let i = 0; i < occupied.length; i++) {
            let [x, y, radius] = occupied[i];
            if (Math.sqrt(Math.pow(x - newX, 2) + Math.pow(y - newY, 2)) < newRadius + radius) {
                // Calculate minimal distance to move the circle away from the new circle
                let minMoveDistance = newRadius + radius - Math.sqrt(Math.pow(x - newX, 2) + Math.pow(y - newY, 2));
                let angle = Math.atan2(newY - y, newX - x);
                let newPosX = x - minMoveDistance * Math.cos(angle);
                let newPosY = y - minMoveDistance * Math.sin(angle);

                // Only update if the new position doesn't overlap with other circles
                if (!checkOverlap(newPosX, newPosY, radius)) {
                    occupied[i] = [newPosX, newPosY, radius];
                }
            }
        }
    };

    // Loop through each data point to place it on the graph
    for (let item of data) {
        let cost = item.cost;
        let radius = Math.sqrt(cost / Math.PI) * scale_factor;

        // Try to find a suitable position for the circle
        for (let i = 0; i < max_attempts; i++) {
            let x = Math.random() * (width - 2 * radius) + radius;
            let y = Math.random() * (height - 2 * radius) + radius;

            // Check if the new circle overlaps with existing ones
            if (!checkOverlap(x, y, radius)) {
                // Adjust existing circles if necessary
                adjustExistingCircles(x, y, radius);
                // Place the new circle
                occupied.push([x, y, radius]);
                outputData.push({
                    id: item.id,
                    name: item.name,
                    cost: item.cost,
                    x: x,
                    y: y,
                    radius: radius
                });
                break;
            }
        }
    }
    
    return outputData;
}

// export function generateBubbleCoordinates(data, width, height, scale_factor = 1, max_attempts = 3000, prevOccupied = null) {
//   // Initialize variables to keep track of occupied space
//   let occupied = prevOccupied ? [...prevOccupied] : [];


//   // Prepare the output data
//   let outputData = [];

//   // Function to check if a circle overlaps with existing ones
//   const checkOverlap = (x, y, radius) => {
//     for (let [ox, oy, oradius] of occupied) {
//       if (Math.sqrt(Math.pow(ox - x, 2) + Math.pow(oy - y, 2)) < radius + oradius) {
//         return true;
//       }
//     }
//     return false;
//   };

//   // Function to adjust existing circles with minimal movement
//   const adjustExistingCircles = (newX, newY, newRadius) => {
//     for (let i = 0; i < occupied.length; i++) {
//       let [x, y, radius] = occupied[i];
//       if (Math.sqrt(Math.pow(x - newX, 2) + Math.pow(y - newY, 2)) < newRadius + radius) {
//         // Calculate minimal distance to move the circle away from the new circle
//         let minMoveDistance = newRadius + radius - Math.sqrt(Math.pow(x - newX, 2) + Math.pow(y - newY, 2));
//         let angle = Math.atan2(newY - y, newX - x);
//         let newPosX = x - minMoveDistance * Math.cos(angle);
//         let newPosY = y - minMoveDistance * Math.sin(angle);

//         // Only update if the new position doesn't overlap with other circles
//         if (!checkOverlap(newPosX, newPosY, radius)) {
//           occupied[i] = [newPosX, newPosY, radius];
//         }
//       }
//     }
//   };

//   // Loop through each data point to place it on the graph
//   for (let item of data) {
//     let cost = item.cost;
//     let radius = Math.sqrt(cost / Math.PI) * scale_factor;

//     // Try to find a suitable position for the circle
//     for (let i = 0; i < max_attempts; i++) {
//       let x = Math.random() * (width - 2 * radius) + radius;
//       let y = Math.random() * (height - 2 * radius) + radius;

//       // Check if the new circle overlaps with existing ones
//       if (!checkOverlap(x, y, radius)) {
//         // Adjust existing circles if necessary
//         adjustExistingCircles(x, y, radius);
//         // Place the new circle
//         occupied.push([x, y, radius]);
//         outputData.push({
//           id: item.id,
//           name: item.name,
//           cost: item.cost,
//           x: x,
//           y: y,
//           radius: radius
//         });
//         break;
//       }
//     }
//   }

//   return outputData;
// }

// export function generateBubbleCoordinates(data, width, height, scale_factor = 1, max_attempts = 3000, prevOccupied = null) {
//   console.log('test')
//   // Initialize variables to keep track of occupied space
//   let occupied = prevOccupied ? [...prevOccupied] : [];

//   // Prepare the output data
//   let outputData = [];

//   // Function to check if a circle overlaps with existing ones
//   const checkOverlap = (x, y, radius) => {
//     for (let [ox, oy, oradius] of occupied) {
//       if (Math.sqrt(Math.pow(ox - x, 2) + Math.pow(oy - y, 2)) < radius + oradius) {
//         return true;
//       }
//     }
//     return false;
//   };

//   // Function to adjust existing circles with minimal movement
//   const adjustExistingCircles = (newX, newY, newRadius) => {
//     for (let i = 0; i < occupied.length; i++) {
//       let [x, y, radius, id] = occupied[i];
//       if (Math.sqrt(Math.pow(x - newX, 2) + Math.pow(y - newY, 2)) < newRadius + radius) {
//         // Calculate minimal distance to move the circle away from the new circle
//         let minMoveDistance = newRadius + radius - Math.sqrt(Math.pow(x - newX, 2) + Math.pow(y - newY, 2));
//         let angle = Math.atan2(newY - y, newX - x);
//         let newPosX = x - minMoveDistance * Math.cos(angle);
//         let newPosY = y - minMoveDistance * Math.sin(angle);

//         // Update the position with minimal movement if prevOccupied exists
//         if (prevOccupied) {
//           let prevData = prevOccupied.find(d => d[3] === id);
//           if (prevData) {
//             let [oldX, oldY, oldRadius] = prevData;
//             let distanceToOldPos = Math.sqrt(Math.pow(oldX - x, 2) + Math.pow(oldY - y, 2));
//             let distanceToNewPos = Math.sqrt(Math.pow(oldX - newPosX, 2) + Math.pow(oldY - newPosY, 2));
//             
//             // Update only if the new position is closer to the old position
//             if (distanceToNewPos < distanceToOldPos) {
//               occupied[i] = [newPosX, newPosY, radius, id];
//             }
//           }
//         } else {
//           // Only update if the new position doesn't overlap with other circles
//           if (!checkOverlap(newPosX, newPosY, radius)) {
//             occupied[i] = [newPosX, newPosY, radius, id];
//           }
//         }
//       }
//     }
//   };

//   // Loop through each data point to place it on the graph
//   for (let item of data) {
//     let cost = item.cost;
//     let radius = Math.sqrt(cost / Math.PI) * scale_factor;

//     // Try to find a suitable position for the circle
//     for (let i = 0; i < max_attempts; i++) {
//       let x = Math.random() * (width - 2 * radius) + radius;
//       let y = Math.random() * (height - 2 * radius) + radius;

//       // Check if the new circle overlaps with existing ones
//       if (!checkOverlap(x, y, radius)) {
//         // Adjust existing circles if necessary
//         adjustExistingCircles(x, y, radius);
//         // Place the new circle
//         occupied.push([x, y, radius, item.id]);
//         outputData.push({
//           id: item.id,
//           name: item.name,
//           cost: item.cost,
//           x: x,
//           y: y,
//           radius: radius
//         });
//         break;
//       }
//     }
//   }

//   return { outputData, occupied }
// }

