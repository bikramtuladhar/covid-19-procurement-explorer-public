import React from 'react'
import { ContractEquityIndicators } from "../../../../components/Visualizations"
import { TenderTable } from "../../../../components/Tables"

const CountryEquity = (props) => {
    function renderMainVisualization() {
        if (props.countryCode) {
            return (<ContractEquityIndicators params={{ country: props.countryCode }} />)
        }
    }

    function renderTable() {
        if (props.countryCode) {
            return (<TenderTable params={{ country: props.countryCode }} />)
        }
    }

    return (
        <div>
            <div className="w-full mb-12 global-profile">
                {renderMainVisualization()}
            </div>

            {renderTable()}
        </div>
    )
}

export default CountryEquity
