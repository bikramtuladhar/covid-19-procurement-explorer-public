import React from 'react'
import ProductCategoryMap from "../../../../components/Visualizations/Common/ProductCategoryMap"
import { ProductTable } from "../../../../components/Tables"

const GlobalProducts = () => {
    function renderMainVisualization() {
        return (<ProductCategoryMap />)
    }

    function renderTable() {
        return (<ProductTable />)
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

export default GlobalProducts
