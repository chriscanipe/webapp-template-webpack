import setup from "./setup";
setup();

import pym from "pym.js";
import makeChart from "./chart-template";

// const d3 = Object.assign({},
//     require("d3-fetch")
// );

// function init() {

//     Promise.all([
//             d3.csv()
//         ])
//         .then(([data]) => {
//             main(data);
//         });
// }

function main() {

  const theChart = new makeChart({
    element: document.querySelector(".chart")
  });

  window.addEventListener("optimizedResize", () => {
    theChart.update();
  });

  new pym.Child({
    polling: 500
  });
}

window.onload = main;
