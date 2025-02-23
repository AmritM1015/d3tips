import React, { Component } from "react";
import * as d3 from "d3";

class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props.data2);

    const margin = { top: 40, right: 50, bottom: 50, left: 50 };
    const width = 600;
    const height = 400;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Select SVG container
    const svg = d3.select(".child2_svg")
      .attr("width", width)
      .attr("height", height)
      .attr("style", "outline: thin solid black;");   //This will do the job
      

    svg.selectAll("*").remove(); // ✅ Clear old chart before redrawing

    const innerChart = svg.append("g")
      .attr("class", "inner_chart")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // ✅ Compute average tip per day
    const groupedData = d3.rollup(
      this.props.data2, 
      v => d3.mean(v, d => d.tip), // ✅ Computes average `tip` for each day
      d => d.day // ✅ Groups data by `day`
    );

    // ✅ Convert Map to Array for D3 binding
    const formattedData = Array.from(groupedData, ([day, avgTip]) => ({ day, avgTip }));

    console.log("Grouped Data with Average Tip:", formattedData); // Debugging

    // ✅ Create `xScale` for categorical days
    const xScale = d3.scaleBand()
      .domain(formattedData.map(d => d.day))  // ✅ Use unique days
      .range([0, innerWidth])
      .padding(0.2);  // ✅ Space between bars

    // ✅ Create `yScale` for numerical values
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(formattedData, d => d.avgTip)])  // ✅ Use avgTip
      .range([innerHeight, 0]);  // ✅ Inverted for correct bar orientation

    // ✅ Define Axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // ✅ Append Axes
    innerChart.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis);

    innerChart.append("g")
      .attr("class", "y-axis")
      .call(yAxis);

    // ✅ Create Bars
    innerChart.selectAll("rect")
      .data(formattedData)  // ✅ Use grouped data
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.day))  // ✅ Position bars by day
      .attr("y", d => yScale(d.avgTip))  // ✅ Use avgTip for height
      .attr("height", d => innerHeight - yScale(d.avgTip))  // ✅ Scaled height
      .attr("width", xScale.bandwidth())  // ✅ Auto width from scaleBand
      .attr("fill", "#69b3a2")
   svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", 310)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Average Tip by Day");
      // X-axis label
      svg.append("text")
      .attr("x", 300)
      .attr("y", 380)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Day");

      // Y-axis label
      svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -200)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Average Tip");
    
   
  }

  componentDidUpdate() {
      this.componentDidMount() 
  }
    
  

  render() {
    return (
      <div>
        <svg className="child2_svg"></svg>
      </div>
    );
  }
}

export default Child2;
