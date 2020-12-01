/* Imports */
import React, { useLayoutEffect, useRef, useState } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

const PieChart = ({ data, colors }) => {
    const piechartDiv = useRef(null)

    useLayoutEffect(() => {
        /* Chart code */
        // Themes begin
        am4core.useTheme(am4themes_animated)
        // Themes end

        // Create chart instance
        let chart = am4core.create(piechartDiv.current, am4charts.PieChart)
        chart.exporting.menu = new am4core.ExportMenu()

        // Add and configure Series
        let pieSeries = chart.series.push(new am4charts.PieSeries())
        pieSeries.dataFields.value = 'number'
        pieSeries.dataFields.category = 'value'

        // Let's cut a hole in our Pie chart the size of 30% the radius
        chart.innerRadius = am4core.percent(30)

        // Put a thick white border around each Slice
        pieSeries.slices.template.stroke = am4core.color('#fff')
        pieSeries.slices.template.strokeWidth = 2
        pieSeries.slices.template.strokeOpacity = 1
        // change the cursor on hover to make it apparent the object can be interacted with
        pieSeries.slices.template.cursorOverStyle = [
            {
                property: 'cursor',
                value: 'pointer'
            }
        ]

        pieSeries.alignLabels = false
        pieSeries.labels.template.bent = true
        pieSeries.labels.template.radius = 3
        pieSeries.labels.template.padding(0, 0, 0, 0)

        pieSeries.ticks.template.disabled = true

        // Create a base filter effect (as if it's not there) for the hover to return to
        let shadow = pieSeries.slices.template.filters.push(
            new am4core.DropShadowFilter()
        )
        shadow.opacity = 0

        // Create hover state
        let hoverState = pieSeries.slices.template.states.getKey('hover') // normally we have to create the hover state, in this case it already exists

        // Slightly shift the shadow and make it more prominent on hover
        let hoverShadow = hoverState.filters.push(
            new am4core.DropShadowFilter()
        )
        hoverShadow.opacity = 0.7
        hoverShadow.blur = 5

        // Add a legend
        chart.legend = new am4charts.Legend()
        chart.legend.position = 'top'
        
        pieSeries.colors.list = colors.map((color) => {
            return am4core.color(color)
        })

        chart.data = data

        return () => {
            chart.dispose()

            chart = null
        }
    }, [data])

    return <div ref={piechartDiv} style={{ width: '100%', height: '250px' }} />
}

export default PieChart