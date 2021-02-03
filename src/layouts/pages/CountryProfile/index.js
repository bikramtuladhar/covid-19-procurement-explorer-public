import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { Helmet } from 'react-helmet';
import { setCountryCurrency } from '../../../store/reducers/general/action'
import CountrySelector from "../../../components/CountrySelector/CountrySelector"
import CountryMapElement from "./sections/CountryMapElement"
import CountryInfo from "./sections/CountryInfo"
import CountryData from "./tabs/CountryData"
import CountryInsights from "./tabs/CountryInsights"
import CountryContracts from "./tabs/CountryContracts"
import TabNavigator from "./sections/TabNavigator"
import CountryEquity from "./tabs/CountryEquity"
import CountryBuyers from "./tabs/CountryBuyers"
import CountrySuppliers from "./tabs/CountrySuppliers"
import CountryProducts from "./tabs/CountryProducts"
import { DATA, INSIGHTS, CONTRACTS, EQUITY, BUYERS, SUPPLIERS, PRODUCTS, METHODOLOGY } from "../../../constants/Tab"
import CountryImage from '../../../assets/img/hero-image.jpg'

const CountryProfile = () => {
    const countries = useSelector((state) => state.general.countries)
    const [countryData, setCountryData] = useState({})
    const { countrySlug } = useParams()
    const { tabSlug } = useParams()
    const dispatch = useDispatch()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        let country = countries.find((country) => country.slug === countrySlug)

        if (country) {
            setCountryData(country)
            dispatch(setCountryCurrency(country.currency))
        }
    }, [countries, countrySlug])

    const renderTab = () => {
        switch (tabSlug) {
            case DATA:
                return (<CountryData countryCode={countryData.country_code_alpha_2} />)
            case INSIGHTS:
                return (<CountryInsights countryId={countryData.id} />)
            case CONTRACTS:
                return (<CountryContracts countryCode={countryData.country_code_alpha_2} />)
            case EQUITY:
                return (<CountryEquity countryCode={countryData.country_code_alpha_2} />)
            case BUYERS:
                return (<CountryBuyers countryCode={countryData.country_code_alpha_2} />)
            case SUPPLIERS:
                return (<CountrySuppliers countryCode={countryData.country_code_alpha_2} />)
            case PRODUCTS:
                return (<CountryProducts countryCode={countryData.country_code_alpha_2} />)
            case METHODOLOGY: //to create component
                return (<div>Methodology page</div>)
            default:
                return (<CountryData countryCode={countryData.country_code_alpha_2} />)
        }
    }

    return (
        <section className="pt-20 -mt-8 bg-blue-0">
            <Helmet>
                <title>{`Country Profile of ${countrySlug} `}</title>
                <meta name="description" content="Covid 19 procurement country description profile page" />
                <meta
                    property="og:description"
                    content={'This is country profile page.'}
                />
                <meta
                    property="og:title"
                    content={
                        'Country profile page'
                    }
                />
                {/* <meta property="og:image" content={CountryImage} />
                <meta name="twitter:card" content="Covid 19 procurement twitter" /> */}
            </Helmet>
            {!isEmpty(countryData) && (
                <section className="px-4">
                    <div className="container mx-auto">
                        <CountrySelector />
                        <div className="flex flex-wrap -mb-4">
                            <CountryMapElement countryCode={countryData.country_code_alpha_2} />
                            <CountryInfo country={countryData} />
                        </div>
                    </div>
                </section>
            )}

            <TabNavigator endpoint={"country"} countrySlug={countrySlug} />

            <div
                style={{
                    borderTop: '5px solid #1fbbec'
                }}
                className="py-16 bg-primary-gray px-4">
                <div className="container mx-auto">
                    {renderTab()}
                </div>
            </div>
        </section>
    )
}
export default CountryProfile
