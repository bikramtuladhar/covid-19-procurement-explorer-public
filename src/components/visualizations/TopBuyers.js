import React, { useEffect, useState } from 'react'
import Loader from '../loader/Loader'
import BarListSection from '../BarListSection/BarListSection'
import VisualizationServices from '../../services/visualizationServices'

const top_buyer_bar_data = [
    {
        name: 'Kit de detección single',
        value: '5%'
    },
    {
        name: 'TaqPath 1-Step RT-qPC',
        value: '68%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    },
    {
        name: 'TECNOLOGIA Y CALIFORNIA',
        value: '45%'
    },
    {
        name: 'REACTIVOS EXPERIMENT',
        value: '12%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    }
]

function TopBuyers() {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [loading, setLoading] = useState(true)
    const [topBuyers, setTopBuyers] = useState()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationServices.TopBuyers().then((response) => {
            setTopBuyers(response)
            setLoading(false)
        })
    }, [])

    // ===========================================================================
    // Handlers and functions
    // ===========================================================================
    // Top buyers
    const calculateBuyersChartPercentage = (data, type) => {
        if (type == 'by_value') {
            let total = data.by_value.reduce((acc, current) => {
                return acc + current.amount_local
            }, 0)

            let topSuppliersChartData = data.by_value.map((data) => {
                return {
                    name: data.buyer_name,
                    value: Math.ceil((data.amount_local / total) * 100),
                    amount: data.amount_local
                }
            })
            return topSuppliersChartData
        }
        if (type == 'by_number') {
            let total = data.by_number.reduce((acc, current) => {
                return acc + current.tender_count
            }, 0)

            let topSuppliersChartData = data.by_number.map((data) => {
                return {
                    name: data.buyer_name,
                    value: Math.ceil((data.tender_count / total) * 100),
                    amount: data.tender_count
                }
            })
            return topSuppliersChartData
        }
    }
    const topBuyersDataByNumber =
        topBuyers && calculateBuyersChartPercentage(topBuyers, 'by_number')
    const topBuyersDataByValue =
        topBuyers && calculateBuyersChartPercentage(topBuyers, 'by_value')

    return (
        <div className="bg-white rounded h-full">
            {loading ? (
                <Loader />
            ) : (
                <BarListSection
                    label="Top Buyers"
                    bar_data={top_buyer_bar_data}
                    byNumber={topBuyersDataByNumber && topBuyersDataByNumber}
                    byValue={topBuyersDataByValue && topBuyersDataByValue}
                />
            )}
        </div>
    )
}

export default TopBuyers