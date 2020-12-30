import React, { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import PieChart from '../charts/PieChart/PieChart'
import useTrans from '../../hooks/useTrans'
import Loader from '../Loader/Loader'
import VisualizationServices from '../../services/visualizationServices'

// Add Pie Chart data
const pie_chart_data = [
    {
        value: 'Value',
        number: 30
    },
    {
        value: 'Number',
        number: 70
    }
]

const colors = ['#ABBABF', '#DCEAEE']

function EquityIndicators() {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [loading, setLoading] = useState(true)
    const [equity, setEquity] = useState()
    const { trans } = useTrans()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationServices.Equity().then((response) => {
            setEquity(response)
            setLoading(false)
        })
    }, [])
    return (
        <div className="bg-white rounded p-4 mb-2 simple-tab">
            {loading ? (
                <Loader sm />
            ) : (
                <Tabs>
                    <div className="flex items-center justify-between">
                        <h3 className="uppercase font-bold  text-primary-dark">
                            {trans('Equity indicators')}
                        </h3>
                        <div className="flex">
                            <TabList>
                                <Tab>{trans('By value')}</Tab>
                                <Tab>{trans('By number')}</Tab>
                            </TabList>
                        </div>
                    </div>

                    <div className="mt-2">
                        <TabPanel>
                            <div className="flex items-end">
                                <div className=" text-primary-dark">
                                    <span>
                                        <strong className="text-xl inline-block mr-3">
                                            51
                                        </strong>
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <PieChart
                                        data={pie_chart_data}
                                        colors={colors}
                                    />
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="flex items-end">
                                <div className=" text-primary-dark">
                                    <span>
                                        <strong className="text-xl inline-block mr-3">
                                            51
                                        </strong>
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <PieChart
                                        data={pie_chart_data}
                                        colors={colors}
                                    />
                                </div>
                            </div>
                        </TabPanel>
                    </div>
                </Tabs>
            )}
        </div>
    )
}

export default EquityIndicators