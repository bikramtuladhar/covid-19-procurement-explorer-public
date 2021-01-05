import React, { useEffect, useState } from 'react'
import { useHistory, Link, useParams } from 'react-router-dom'
import InsightServices from '../../../services/insightServices'
import Loader from '../../../components/Loader/Loader'
import { formatDate } from "../../../helpers/date";

function Events() {
    const [eventsData, setEventsData] = useState([])
    const [loading, setLoading] = useState(true)
    let history = useHistory()
    let { id: eventsId } = useParams()
    window.scrollTo(0, 0)

    const previousPage = () => {
        history.goBack()
    }

    useEffect(() => {
        InsightServices.EventsData().then((response) => {
            setEventsData(response.items)
            setLoading(false)
        })
    }, [])
    return (
        <>
            {loading ? (
                <Loader />
            ) : (

                <div className="">
                    <section className="px-4 events events__upcoming pt-24 pb-16 -mt-8">
                        <div className="container mx-auto">
                            <div className="text-sm mb-4 text-blue-5">
                            <span
                                className="cursor-pointer text-primary-blue"
                                onClick={previousPage}>
                                Library
                            </span>{' '}
                                /
                            </div>
                            <h2 className="text-2xl mb-10">
                                Events
                            </h2>
                            <div className="text-left">
                                <p className="text-xl blue-50 pb-10">
                                    Upcoming Events
                                </p>
                            </div>
                            <div className="grid grid-cols-12 grid-rows-1 gap-x-0 gap-y-4 sm:gap-4  card">
                                {eventsData &&
                                eventsData.slice(0, 3).map((events) => {
                                    return (
                                        <Link
                                            className="events-thumbnail"
                                            to={`/events/${events.id}`}
                                            key={events.id}>
                                            <div className="card__item h-full px-8 py-8">
                                                <div className="card__day text-4xl leading-none">
                                                    {formatDate(events.event_date, 'DD')}
                                                </div>
                                                <div className="card__month text-base uppercase">
                                                    {formatDate(events.event_date, 'MMMM')}
                                                </div>
                                                <div className="card__caption">
                                                    <h3 className="card__title mt-8 mb-4 text-lg">
                                                        {events.title}
                                                    </h3>
                                                    <div className="card__time opacity-50 text-base mb-4 uppercase flex">
                                                        <p className="from mr-1">
                                                            {events.time_from}
                                                        </p>

                                                        {events.time_to &&
                                                        <>
                                                            -
                                                            <p className="to ml-1">
                                                                {events.time_to}
                                                            </p>
                                                        </>
                                                        }
                                                    </div>

                                                    <p className="card__venue text-base">
                                                        {events.location}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </section>

                    <section className="px-4 events events__past  pb-24">
                        <div className="container mx-auto">
                            <div className="text-left">
                                <p className="text-xl blue-50 pb-6">
                                    Past Events
                                </p>
                            </div>
                            <div className="grid grid-cols-12 grid-rows-1 gap-x-0 gap-y-4 sm:gap-4  card">
                                {eventsData &&
                                eventsData.slice(3, 9).map((events) => {
                                    return (
                                        <Link
                                            className="events-thumbnail"
                                            to={`/events/${events.id}`}
                                            key={events.id}>
                                            <div className="card__item h-full px-8 py-8">
                                                <div className="card__day text-4xl">
                                                    {formatDate(events.event_date, 'DD')}
                                                </div>
                                                <div className="card__month text-base uppercase">
                                                    {formatDate(events.event_date, 'MMMM')}
                                                </div>
                                                <div className="card__caption">
                                                    <h3 className="card__title mt-8 mb-4 text-lg">
                                                        {events.title}
                                                    </h3>
                                                    <div className="card__time opacity-50 text-base mb-4 uppercase flex">
                                                        <p className="from mr-1">
                                                            {events.time_from}
                                                        </p>
                                                        -
                                                        <p className="to ml-1">
                                                            {events.time_to}
                                                        </p>
                                                    </div>

                                                    <p className="card__venue text-base">
                                                        {events.location}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                            {eventsData.length !== 0 ?
                                <div className="flex justify-center pt-10">
                                    <Link to="/events" className="text-white bg-primary-blue px-32 py-4 rounded">
                                        Load more
                                    </Link>
                                </div>
                                : <p> There are no Past Events Records</p>
                            }

                        </div>
                    </section>
                </div>
            )}
        </>
    )
}

export default Events