import React, { useEffect, useState, Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'
import CmsPageService from '../../../services/CmsPageService'
import Loader from '../../../components/Loader/Loader'
import { formatDate, formatTime } from '../../../helpers/date'
import ShareButtons from '../../../components/Library/ShareButtons'
import Breadcrumb from '../../../components/website/Library/Breadcrumb'
import useTrans from '../../../hooks/useTrans'

const EventDetail = () => {
    const [eventDetail, setEventDetail] = useState({})
    const [eventList, setEventList] = useState([])
    const [loading, setLoading] = useState(true)
    let { id: eventsId } = useParams()
    const { trans } = useTrans()
    window.scrollTo(0, 0)

    useEffect(() => {
        setLoading(true)
        CmsPageService.EventDetail(eventsId).then((response) => {
            setEventDetail(response)
            setLoading(false)
        })
        CmsPageService.EventList().then((response) => {
            setEventList(response.items)
        })

        return () => {
            setEventDetail({})
            setEventList([])
        }
    }, [eventsId])

    return (
        <section className="pt-8">
            <div className="container mx-auto px-4 news-detail">
                <Breadcrumb item={'events'} />
                {loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                        <h2 className="md:w-3/4 text-lg md:text-xl leading-tight mb-6 md:mb-10 text-primary-dark">
                            {eventDetail.title}
                        </h2>
                        <div className="flex flex-wrap lg:flex-no-wrap justify-between mb-10">
                            <div className="mb-4 events-detail__metadata">
                                <div className="time mb-8">
                                    <div className="card__day text-4xl mb-2 leading-normal">
                                        {formatDate(
                                            eventDetail.event_date,
                                            'DD'
                                        )}
                                    </div>
                                    <div className="card__month text-base uppercase">
                                        {formatDate(
                                            eventDetail.event_date,
                                            'MMMM'
                                        )}
                                    </div>
                                    <p className="from mr-1 inline-block">
                                        {formatTime(eventDetail.time_from)}
                                    </p>
                                    {eventDetail.time_to && (
                                        <p className="to ml-1 inline-block">
                                            - {formatTime(eventDetail.time_to)}
                                        </p>
                                    )}
                                </div>
                                <div className="organization mb-8">
                                    <p className="block font-bold opacity-40 mb-2">
                                        {trans('Organization')}
                                    </p>
                                    <p className="block ml-3 lg:ml-0">
                                        {eventDetail.organization || '-'}
                                    </p>
                                </div>
                                <div className="location mb-8">
                                    <p className="block font-bold opacity-40 mb-2">
                                        {trans('Location')}
                                    </p>
                                    <p className="block ml-3 lg:ml-0">
                                        {eventDetail.location || '-'}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div
                                    className="mb-10 news-detail__content"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                        eventDetail.rendered_description
                                    }} />
                                <div className="block lg:hidden">
                                    <ShareButtons />
                                </div>
                            </div>
                            <div className="hidden lg:block">
                                <ShareButtons />
                            </div>
                        </div>
                        {eventList.length !== 1 ? (
                            <>
                                <hr className="mb-10 text-primary-gray" />
                                <div className="mb-20">
                                    <h2 className="text-xl mb-6">
                                        {trans('Other Events')}
                                    </h2>
                                    <div className="grid grid-cols-12 gap-x-0 gap-y-4 sm:gap-4 mb-10">
                                        {eventList &&
                                        eventList
                                            .filter(
                                                (events) =>
                                                    events.id !== eventsId
                                            )
                                            .slice(0, 3)
                                            .map((events, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        <Link
                                                            className="events-thumbnail bg-blue-0 "
                                                            to={`/events/${events.id}`}
                                                            key={events.id}>
                                                            <div className="card__item h-full px-8 py-8">
                                                                <div className="card__day text-4xl leading-none">
                                                                    {formatDate(
                                                                        events.event_date,
                                                                        'DD'
                                                                    )}
                                                                </div>
                                                                <div className="card__month text-base uppercase">
                                                                    {formatDate(
                                                                        events.event_date,
                                                                        'MMMM'
                                                                    )}
                                                                </div>
                                                                <div className="card__caption">
                                                                    <h3 className="card__title mt-8 mb-4 text-lg">
                                                                        {
                                                                            events.title
                                                                        }
                                                                    </h3>
                                                                    <div className="card__time opacity-50 text-base mb-4 uppercase flex">
                                                                        <p className="from mr-1">
                                                                            {formatTime(
                                                                                events.time_from
                                                                            )}
                                                                        </p>
                                                                        {events.time_to && (
                                                                            <p className="to ml-1">
                                                                                -{' '}
                                                                                {formatTime(
                                                                                    events.time_to
                                                                                )}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                    <p className="card__venue text-base">
                                                                        {
                                                                            events.location
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </Fragment>
                                                )
                                            })}
                                    </div>
                                    <div className="flex justify-center items-center mt-12">
                                        <hr className="text-primary-gray flex-1" />
                                        <Link
                                            to="/events"
                                            className="text-blue-20 px-4">
                                            {trans('View all events')} --&gt;{' '}
                                        </Link>
                                        <hr className="text-primary-gray flex-1" />
                                    </div>
                                </div>
                            </>
                        ) : (
                            ''
                        )}
                    </Fragment>
                )}
            </div>
        </section>
    )
}

export default EventDetail
