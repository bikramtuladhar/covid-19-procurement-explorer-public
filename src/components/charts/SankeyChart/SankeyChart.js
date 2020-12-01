/* Imports */
import React, { useLayoutEffect, useRef, useState } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

const SankeyChart = ({ data }) => {
    const sankeyChart = useRef(null)

    useLayoutEffect(() => {
        /* Chart code */
        // Themes begin
        am4core.useTheme(am4themes_animated)
        // Themes end

        function processData(data) {
            let treeData = []

            let smallBrands = { name: 'Other', children: [] }

            for (var brand in data) {
                let brandData = { name: brand, children: [] }
                let brandTotal = 0
                for (var model in data[brand]) {
                    brandTotal += data[brand][model]

                    if (data[brand][model] > 100) {
                        brandData.children.push({
                            name: model,
                            count: data[brand][model]
                        })
                    }
                }

                // only bigger brands
                if (brandTotal > 200000) {
                    treeData.push(brandData)
                }
            }

            return treeData
        }

        // Create chart instance
        let chart = am4core.create(sankeyChart.current, am4charts.SankeyDiagram)
        chart.hiddenState.properties.opacity = 0

        chart.exporting.menu = new am4core.ExportMenu()

        let hoverState = chart.links.template.states.create('hover')
        hoverState.properties.fillOpacity = 0.6

        chart.dataFields.fromName = 'from'
        chart.dataFields.toName = 'to'
        chart.dataFields.value = 'value'

        // for right-most label to fit
        chart.paddingRight = 30

        // make nodes draggable
        let nodeTemplate = chart.nodes.template
        nodeTemplate.inert = true
        nodeTemplate.readerTitle = 'Drag me!'
        nodeTemplate.showSystemTooltip = true
        nodeTemplate.width = 20

        // make nodes draggable
        nodeTemplate.readerTitle = 'Click to show/hide or drag to rearrange'
        nodeTemplate.showSystemTooltip = true
        nodeTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer

        chart.data = data

        return () => {
            chart.dispose()

            chart = null
        }
    }, [data])

    return <div ref={sankeyChart} style={{ width: '100%', height: '400px' }} />
}

export default SankeyChart