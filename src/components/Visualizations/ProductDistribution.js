import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loader from '../Loader/Loader'
import { isEmpty, sumBy } from 'lodash'
import VisualizationService from '../../services/VisualizationService'
import useTrans from '../../hooks/useTrans'
import BarListChart from '../BarListSection/BarListChart'
import ContractView from '../../constants/ContractView'
import Default from '../../constants/Default'
import HelpText from '../../components/HelpText/HelpText'

const ProductDistribution = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label = 'Product Distribution', params } = props
    const { countrySlug } = useParams()
    const [loading, setLoading] = useState(true)
    const currency = useSelector((state) => state.general.currency)
    const [originalData, setOriginalData] = useState([])
    const [chartData, setChartData] = useState([])
    const [viewType, setViewType] = useState(ContractView.VALUE)
    const { trans } = useTrans()
    const helpText = 'Contracts distribution by type of goods & services'

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.ProductDistribution(params).then((response) => {
            setOriginalData(response)
            setLoading(false)
        })

        return () => {
            setOriginalData([])
        }
    }, [params?.country, params?.buyer, params?.supplier])

    useEffect(() => {
        if (!isEmpty(originalData)) {
            let total = sumBy(originalData, (item) => {
                return viewType === ContractView.NUMBER
                    ? item.tender_count
                    : currency === Default.CURRENCY_LOCAL
                        ? item.amount_local
                        : item.amount_usd
            })
            let chartDataFormatted = originalData
                .sort((a, b) => {
                    if (viewType === ContractView.NUMBER) {
                        return a.tender_count > b.tender_count ? -1 : 0
                    }

                    return a.amount_usd > b.amount_usd ? -1 : 0
                })
                .map((item) => {
                    let actualValue =
                        viewType === ContractView.NUMBER
                            ? item.tender_count
                            : currency === Default.CURRENCY_LOCAL
                            ? item.amount_local
                            : item.amount_usd
                    return {
                        name: item.product_name,
                        value: Math.ceil((actualValue / total) * 100),
                        amount: actualValue,
                        id: item.product_id
                    }
                })
            setChartData(chartDataFormatted)
        }
    }, [originalData, viewType, currency])

    const isActiveTab = (type) => {
        return viewType === type ? 'active' : ''
    }

    return (
        <div className="bg-white rounded h-full">
            <div className="bg-white rounded p-4 pb-0">
                <div className="flex items-center justify-between flex-wrap mb-4">
                    <div className="flex items-center mb-2 md:mb-0">
                        <h3 className="md:mb-0 w-full md:w-auto uppercase font-bold text-primary-dark">
                            {trans(label)}
                        </h3>
                        <HelpText helpTextInfo={helpText} />
                    </div>
                    <div className="w-full md:w-auto flex">
                        <ul className="contract-switch flex">
                            <li
                                className={`mr-4 cursor-pointer text-xs md:text-base ${isActiveTab(
                                    ContractView.VALUE
                                )}`}
                                onClick={() => setViewType(ContractView.VALUE)}>
                                {trans('By contract value')}
                            </li>
                            <li
                                className={`cursor-pointer text-xs md:text-base ${isActiveTab(
                                    ContractView.NUMBER
                                )}`}
                                onClick={() =>
                                    setViewType(ContractView.NUMBER)
                                }>
                                {trans('By number of contracts')}
                            </li>
                        </ul>
                    </div>
                </div>
                {loading ? (
                    <Loader />
                ) : (
                    <div className="flex">
                        <div className="flex-1">
                            <div className="flex-1 simple-tab -mt-10">
                                <div className="mt-10">
                                    <BarListChart
                                        data={chartData}
                                        text={
                                            countrySlug
                                                ? `country/${countrySlug}/products`
                                                : `global-overview/products`
                                        }
                                        currency={currency}
                                        viewType={viewType}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductDistribution
