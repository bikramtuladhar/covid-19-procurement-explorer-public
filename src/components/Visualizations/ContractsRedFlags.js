import React, { useState, useEffect } from 'react'
import { ReactComponent as FlagIcon } from '../../assets/img/icons/ic_flag.svg'
import Loader from '../Loader/Loader'
import useTrans from '../../hooks/useTrans'
import HelpText from '../../components/HelpText/HelpText'

const contracts_red_flag_data = [
    {
        name: 'Direct contract or single bid received',
        value: 0
    },
    {
        name:
            'Contract value is higher or lower than average for this item category',
        value: 0
    },
    {
        name: 'Contract value is higher than tender value',
        value: 0
    },
    {
        name:
            'Contract is awarded to supplier that has won a disproportionate number of contracts of the same type',
        value: 0
    },
    {
        name:
            'Contract is awarded to supplier that has similar information (address, number, legal representative) to other suppliers for the same buyer',
        value: 0
    },
    {
        name: 'Direct contract or single bid received',
        value: 0
    },
    {
        name:
            'Contract is awarded to supplier that has won a disproportionate number of contracts of the same type',
        value: 0
    },
    {
        name:
            'Contract value is higher or lower than average for this item category',
        value: 0
    }
]

function ContractsRedFlag(props) {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label = 'Contracts with red flags' } = props
    const [loading, setLoading] = useState(true)
    const { trans } = useTrans()
    const helpText =
        'The methodology of red flags calculation can be found here.'

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <div className="bg-white rounded p-4 h-full">
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <div className="flex items-center mb-4">
                        <h3 className="uppercase font-bold text-primary-dark inline-block">
                            {trans(label)}
                        </h3>
                        <FlagIcon className="ml-2 inline-block" />
                        <HelpText helpTextInfo={helpText} />
                    </div>
                    <div>
                        <div className="custom-horizontal-bar">
                            <ul className="custom-scrollbar h-80 overflow-y-auto pr-4">
                                {contracts_red_flag_data.map(
                                    (mapped_data, index) => {
                                        return (
                                            <li key={index}>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <h3 className="pr-16">
                                                            {mapped_data.name}
                                                        </h3>
                                                    </div>
                                                    <div>
                                                        <span className="font-bold">
                                                            {mapped_data.value}
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    }
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ContractsRedFlag
