import React, { Component } from 'react';
import * as d3 from 'd3'; //https://www.freecodecamp.org/news/how-to-get-started-with-d3-and-react-c7da74a5bd9f/#:~:text=You%20need%20to%20use%20import,has%20no%20default%20exported%20module.

const BarChart = (props) => {
    
    const { committers } = props;

    const cData = Array.from(committers);

    // const testData = [ 2, 1, 5, 3, 4 ];

    const drawBarChart = (data) => {
        const canvasHeight = 400;
        const canvasWidth = 600;
        const scale = 5;

        const svgCanvas = d3.select("#canvas")
            .append("svg")
            .attr("width", canvasWidth)
            .attr("height", canvasHeight)
            .style("border", "1px solid black");
        
        svgCanvas.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("width", 40)
            .attr("height", (datapoint) => datapoint[1] * scale)
            .attr("fill", "orange")
            .attr("x", (datapoint, iteration) => iteration * 45)
            .attr("y", (datapoint) => canvasHeight - datapoint[1] * scale);
        
        svgCanvas.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("x", (dataPoint, i) => i * 45 + 15)
            .attr("y", (dataPoint, i) => canvasHeight - dataPoint[1] * scale - 10)
            .text(dataPoint => dataPoint[1])
    }

    return (
        <>
            <div id="canvas"></div> 
            {
                // drawBarChart(testData)
                drawBarChart(cData)
            }
        </>
    )
}
export default BarChart