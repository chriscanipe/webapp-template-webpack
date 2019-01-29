// const d3 = Object.assign({},
//     require("d3-selection"),
//     require("d3-scale"),
//     require("d3-array"),
//     require("d3-axis")
// );

const d3 = require("d3");

export default class makeChart {

    constructor(opts) {
        Object.assign(this, opts);

        //this.aspectHeight is decimal value used in the `_setDimension()` method to
        //set the height of the container as a percent of the width.
        this.aspectHeight = opts.aspectHeight ? opts.aspectHeight : 0.68;

        //We append the elements only once.
        this.appendElements();

        //then we call update(), which includes 3 functions (or "methods")
        //that determine how the page looks
        this.update();
    }

    update() {
        this._setDimensions();
        this._setScales();
        this.render();
    }

    _setDimensions() {
        // this.margins will determine the space between the `this.plot` group
        // and the edge of the svg container
        // think of this as the space where your axes go
        this.margin = {
            top: 30,
            right: 30,
            bottom: 50,
            left: 40,
        };

        // Since this is a responsive chart, we "ask" for the width of the target element
        // Then subtract our margins to get the proper width and height for `this.plot`  
        this.width = this.element.offsetWidth - this.margin.left - this.margin.right;
        this.height = (this.element.offsetWidth * this.aspectHeight) - this.margin.top - this.margin.bottom;

        // Excellent margins/width/height explainer here: https://bl.ocks.org/mbostock/3019563
    }

    _setScales() {

        //Scales are how we convert data values to pixel values.
        //If we have a chart that's 800px wide and a data set that goes from 0 to 100...
        //Then a value of 50 belongs at 400px on the chart.
        //Scales are the functions that figure that out for us.

        this.xScale = d3.scaleLinear() //This is a linear scale
            .rangeRound([0, this.width]) //Its "range" is the width of `this.plot`
            .domain([0, 100]); //Its "domain" defaults to 0 to 100.

        this.yScale = d3.scaleLinear()
            .rangeRound([this.height, 0])
            .domain([0, 100]);
    }

    appendElements() { //ONLY GETS FIRED ON LOAD

        //SVG is the container.
        this.svg = d3.select(this.element).append("svg");

        //The plot is where the charting action happens.
        this.plot = this.svg.append("g").attr("class", "chart-g");

        //The xAxis and yAxis group tags will hold our xAxis elements (ticks, etc.)
        this.xAxis = this.plot.append("g").classed("axis x-axis", true);
        this.yAxis = this.plot.append("g").classed("axis y-axis", true);
    }

    render() { //FIRED EVERYTIME THE CHART UPDATES

        //The this.svg will be the FULL width and height of the parent container (this.element)
        this.svg.attr("width", this.width + this.margin.left + this.margin.right);
        this.svg.attr("height", this.height + this.margin.top + this.margin.bottom);

        //this.plot is offset from the top and left of the this.svg
        this.plot.attr("transform", `translate(${this.margin.left},${this.margin.top})`);

        //This is where the axis elements get drawn. The "transform" property positions them
        //And the the .call() method draws the axis within that tag.
        //Most of the logic is behind the scenes
        this.xAxis
            .attr("transform", "translate(0," + (this.height + 20) + ")")
            .call(
                d3.axisBottom(this.xScale)
                .tickSize(-this.height - 20)
            );

        this.yAxis
            .attr("transform", `translate(-20,0)`)
            .call(
                d3.axisLeft(this.yScale)
                .tickSize(-this.width - 20)
            );
    }

}
