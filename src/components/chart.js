import React, {useEffect, useRef} from 'react'
import { select, axisBottom, axisLeft, scaleLinear, max, scaleBand } from "d3";

function Chart (props) {

    const ref = useRef();
    let data = [84, 14, 234, 37, 64, 42, 197,11]
    let sliderRange = props.sliderRange;

    // set the dimensions and margins of the graph
    let margin = {top: 10, right: 30, bottom: 30, left: 40},
        width = 600 - margin.right - margin.left,
        height = 400 - margin.top - margin.bottom;



    useEffect(() => {
        const svg = select(ref.current)
            .attr("width", width + 30)
            .attr("height", height + 20)
            .style("border", "1px solid black")
    }, []);

    useEffect(() => {
        draw();
    }, [data]);

    const draw = () => {

        const svg = select(ref.current);

        let xScale = scaleBand()
                .domain(data.map(function(d) { return +d; }))
                .range([0, width]).padding(0.4),
            yScale = scaleLinear()
                .domain([0, max(data, function(d) { return +d; }) + 80])
                .range([height, 0]);

        const xAxis = axisBottom(xScale)
            .ticks(data.length)

        svg
            .select(".x-axis")
            .style("transform", "translate(30px, "+height+"px")
            .call(xAxis);

        const yAxis = axisLeft(yScale).ticks(4);
        svg
            .select(".y-axis")
            .style("transform", "translateX(30px)")
            .call(yAxis);



        let rects = svg.selectAll(".rect");
        rects
            .data(data)
            .join('rect')
            .attr("class", "rect")
            .attr("x", function(d) { return xScale(d); })
            .attr("y", function(d) { return yScale(d); })
            .style("transform", "translateX(30px)")
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) { return height - yScale(d); })
            .transition().duration(500)
            .attr("fill", function (d, i) {if(i+1 >= sliderRange[0] && i+1 <= sliderRange[1]) return "#34568B"; else return "grey"})
    };

    return (
        <div>
            <svg ref={ref}>
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
        </div>
    )
}

export default Chart