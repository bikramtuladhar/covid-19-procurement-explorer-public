import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import useTrans from '../../hooks/useTrans'
import BarChartRace from '../../components/Charts/BarChart/BarChartRace'
import CountryService from '../../services/CountryService'
import Loader from '../../components/Loader/Loader'

const WorldTimelineRaceBarMap = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [loading, setLoading] = useState(true)
    const [raceBarType, setRaceBarType] = useState('value')
    const [originalData, setOriginalData] = useState(null)
    const [selectedContinent, setSelectedContinent] = useState({
        value: 'all',
        label: 'All Continent'
    })
    const { trans } = useTrans()
    const options = [
        { value: 'all', label: 'All Continent' },
        { value: 'asia', label: 'Asia' },
        { value: 'europe', label: 'Europe' },
        { value: 'africa', label: 'Africa' },
        { value: 'oceania', label: 'Oceania' },
        { value: 'south_america', label: 'South America' },
        { value: 'north_america', label: 'North America' },
        { value: 'middle_east', label: 'Middle East' }
    ]

    useEffect(() => {
        CountryService.GetGlobalMapData().then((response) => {
            const chartData = response.result.reduce(
                (formattedData, d) => ({
                    ...formattedData,
                    [d.month]: d.details
                        .filter((detail) => detail.country !== 'Global')
                        .map((detail) => ({
                            country: detail.country,
                            value:
                                raceBarType === 'value'
                                    ? detail.amount_usd
                                    : detail.tender_count
                        }))
                }),
                {}
            )
            setOriginalData(chartData)
            setLoading(false)
        })

        return () => {
            setOriginalData(null)
        }
    }, [raceBarType])

    return (
        <div>
            <div className="flex flex-wrap md:flex-no-wrap md:justify-end world-map-chart mb-4">
                <ul className="contract-switch flex flex-1 md:flex-none text-center md:text-left">
                    <li
                        className={`mr-4 cursor-pointer w-full md:w-auto text-xs md:text-base pb-1 ${
                            raceBarType === 'value' ? 'active' : ''
                        }`}
                        onClick={() => setRaceBarType('value')}>
                        {trans('By contract value')}
                    </li>
                    <li
                        className={`cursor-pointer w-full md:w-auto text-xs md:text-base pb-1 ${
                            raceBarType === 'number' ? 'active' : ''
                        }`}
                        onClick={() => setRaceBarType('number')}>
                        {trans('By number of contracts')}
                    </li>
                </ul>
            </div>
            <div className="hidden w-1/5 absolute top-0 left-0 z-10 -mt-3">
                <Select
                    className="select-filter text-sm"
                    classNamePrefix="select-filter"
                    options={options}
                    value={selectedContinent}
                    defaultValue={options[0]}
                    onChange={(selectedOption) =>
                        handleContinentChange(selectedOption)
                    }
                />
            </div>
            {!originalData ? <Loader /> : <BarChartRace data={originalData} />}
        </div>
    )
}

export default WorldTimelineRaceBarMap
