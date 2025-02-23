import React, { Component } from "react";
import * as d3 from "d3";
//Scatter PLot
class App extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    componentDidMount() {
      const margin = {top:40, right:50, bottom:50, left:50 };
      const width = 600;
      const height = 400;
      const innerWidth = width-margin.left-margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      const svg = d3.select(".child1_svg")
        .attr("width",width)
        .attr("height", height)
        .attr("style", "outline: thin solid black;");   //This will do the job
      const innerChart = svg.select(".inner_chart")
        .attr("transform", `translate(${margin.left},${margin.top})`);
        const xScale = d3.scaleLinear().domain([0, d3.max(this.props.data1, d => d.total_bill)]).range([0, innerWidth]);
        const yScale = d3.scaleLinear().domain([0,d3.max(this.props.data1,d=>d.tip)]).range([innerHeight, 0]);
        const xAxis = d3.axisBottom(xScale)
        const yAxis = d3.axisLeft(yScale);
      console.log(this.props.data1)
      innerChart.selectAll(".x-axis").data([null]) // Just a placeholder for the axis, as we're not using dynamic data for it.
      .join("g").attr('class','x-axis') //we have to assign the class we use for selection
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis);
      // Title
      svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", 310)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Total Bill vs Tips");
      // X-axis label
      svg.append("text")
      .attr("x", 300)
      .attr("y", 380)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Total Bill");

      // Y-axis label
      svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -200)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Tips");
      innerChart.selectAll(".y-axis").data([null]) // Similarly, just a placeholder for the axis.
        .join("g").attr('class','y-axis') //we have to assign the class we use for selection
        .call(yAxis);
      innerChart.selectAll("circle").data(this.props.data1).join("circle").attr("r", 5).attr("fill", "#69b3a2")
        .attr("cx", d => xScale(d.total_bill)).attr("cy", d => yScale(d.tip))
      
    }    
    componentDidUpdate(){
      //total bill vs tips
      this.componentDidMount()
      console.log("ComponentDidUpdate",this.props.data1)
    }
    render() {
        return <svg className = "child1_svg">
          <g className="inner_chart"></g>
        </svg>;
    }
}

export default App;