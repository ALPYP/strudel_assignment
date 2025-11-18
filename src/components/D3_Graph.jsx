import { useEffect, useRef } from 'react';
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

function D3_Graph({ dataSet }) {
    // get svg reference for svg later
    const svgReference = useRef();
    // use effect for dataSet
    useEffect(() => {
        // if svg reference is not exists then quit
        if (!svgReference.current) {
            return;
        }
        // get svg from reference
        const svg = d3.select(svgReference.current);
        // get svg size
        const w = svg.node().getBoundingClientRect().width;
        const h = svg.node().getBoundingClientRect().height
        // get margins information
        const chartMargins = {
            left: 40,
            right: 25,
            top: 25,
            bottom: 80
        }
        const chartW = w - (chartMargins.left - chartMargins.right);
        const chartH = w - (chartMargins.top - chartMargins.bottom);
        // title
        svg.append("text")
            .attr("x", (w / 2))
            .attr("y", chartMargins.top)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .style("font-weight", "bold")
            .text("Volume reverb for each instrument in the accordion:");
        // scales x, for each instrument
        const xScaleInstruments = d3.scaleBand()
            .domain(dataSet.map(d => d.name))
            .range([chartMargins.left, chartMargins.left + chartW])
            .padding(0.3)
        // x scale but for volume and reverb
        const xScaleInfo = d3.scaleBand()
            .domain(['volume', 'reverb'])
            .range([0, xScaleInstruments.bandwidth()])
            .padding(0.1)
        // y scale! only one,
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(dataSet, d => Math.max(d.volume, d.reverb)) || 5]) // do five if blank
            .range([chartMargins.top + chartH, chartMargins.top]);
        // make their colours!!! :3
        const col = { volume: "red", reverb: "blue" }
        // group and do it horizontal
        const groupedVR = svg.selectAll("g.instrument")
            .data(dataSet)
            .join('g')
            .attr('class', 'instrument')
            .attr("transform", d => `translate(${xScaleInstruments(d.name)}, 0)`);
        // now actually make the bars
        const bars = groupedVR.selectAll('rect')
            .data(d => [
                { key: "reverb", value: d.reverb },
                { key: "volume", value: d.volume }
            ])
            .join('rect')
            .attr("x", d => xScaleInfo(d.key))
            .attr("width", xScaleInfo.bandwidth())
            .attr("fill", d => col[d.key]);
        // make animation transitions
        bars.transition()
            .duration(500)
            .attr("y", d => yScale(d.value))
            .attr("height", d => yScale(0) - yScale(d.value));

        // x axis
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0, ${chartMargins.top + chartMargins})`)
            .call(d3.axisBottom(xScaleInstruments))
            .selectAll("text")
            .attr("transform", "rotate(-30)")
            .style("text-anchor", "end");
        // y axis
        svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", `translate(${chartMargins.left},0)`)
            .call(d3.axisLeft(yScale));
    }, [dataSet]);

    return <svg ref={svgReference}></svg>
}

export default D3_Graph;