import React from 'react'
import newsImage from '../assets/img/news.jpg'

const News = () => {
    return (
        <section className="py-24 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-10">
                    <h3 className="uppercase text-3xl font-bold leading-none">
                        <span className="block text-base font-bold">
                            Explore
                        </span>
                        News
                    </h3>
                    <p className="text-base text-opacity-50  text-primary-dark">
                        Updates from all around the world on Covid-19
                    </p>
                </div>
                <div className="grid grid-cols-12 grid-rows-3 gap-x-16 gap-y-10 main-news">
                    <div className="main-news__item">
                        <div className="main-news__caption">
                            <h3 className="news-caption__title">
                                How COVID-19 has advanced the case for
                                procurement reform
                            </h3>
                            <p className="news-caption__date">Nov 19, 2020</p>
                        </div>
                        <div className="img-wrapper">
                            <img src={newsImage} alt="" />
                        </div>
                    </div>
                    <div className="main-news__item">
                        <div className="main-news__caption">
                            <h3 className="news-caption__title">
                                How COVID-19 has advanced the case for
                                procurement reform
                            </h3>
                            <p className="news-caption__date">Nov 19, 2020</p>
                        </div>
                        <div className="img-wrapper">
                            <img src={newsImage} alt="" />
                        </div>
                    </div>
                    <div className="main-news__item">
                        <div className="main-news__caption">
                            <h3 className="news-caption__title">
                                How COVID-19 has advanced the case for
                                procurement reform
                            </h3>
                            <p className="news-caption__date">Nov 19, 2020</p>
                        </div>
                        <div className="img-wrapper">
                            <img src={newsImage} alt="" />
                        </div>
                    </div>
                    <div className="main-news__item">
                        <div className="main-news__caption">
                            <h3 className="news-caption__title">
                                How COVID-19 has advanced the case for
                                procurement reform
                            </h3>
                            <p className="news-caption__date">Nov 19, 2020</p>
                        </div>
                        <div className="img-wrapper">
                            <img src={newsImage} alt="" />
                        </div>
                    </div>
                </div>
                {/* <div className="grid grid-cols-12 grid-rows-2 gap-5 news-wrapper">
                    <div className="news-item">
                        <a href="" className="news-link">
                            <div className="img-wrapper img-gradient">
                                <img src={newsImage} className="news-img" alt="" />
                            </div>
                            <div className="news-caption news-caption--large">
                                <h3 className="news-caption__title">
                                    EU public procurement policy in the context
                                    of COVID-19
                                </h3>
                                <p className="news-caption__date">
                                    Nov 19, 2020
                                </p>
                            </div>
                        </a>
                    </div>
                    <div className="news-item">
                        <a href="" className="news-link">
                            <div className="img-wrapper img-gradient">
                                <img src={newsImage} className="news-img" alt="" />
                            </div>
                            <div className="news-caption">
                                <h3 className="news-caption__title">
                                    How COVID-19 has advanced the case for
                                    procurement reform
                                </h3>
                                <p className="news-caption__date">
                                    Nov 19, 2020
                                </p>
                            </div>
                        </a>
                    </div>
                    <div className="news-item">
                        <a href="" className="news-link">
                            <div className="img-wrapper img-gradient">
                                <img src={newsImage} className="news-img" alt="" />
                            </div>
                            <div className="news-caption">
                                <h3 className="news-caption__title">
                                    How COVID-19 has advanced the case for
                                    procurement reform
                                </h3>
                                <p className="news-caption__date">
                                    Nov 19, 2020
                                </p>
                            </div>
                        </a>
                    </div>
                    <div className="news-item">
                        <a href="" className="news-link">
                            <div className="img-wrapper img-gradient">
                                <img src={newsImage} className="news-img" alt="" />
                            </div>
                            <div className="news-caption">
                                <h3 className="news-caption__title">
                                    How COVID-19 has advanced the case for
                                    procurement reform
                                </h3>
                                <p className="news-caption__date">
                                    Nov 19, 2020
                                </p>
                            </div>
                        </a>
                    </div>
                    <div className="news-item">
                        <a href="" className="news-link">
                            <div className="img-wrapper img-gradient">
                                <img src={newsImage} className="news-img" alt="" />
                            </div>
                            <div className="news-caption">
                                <h3 className="news-caption__title">
                                    How COVID-19 has advanced the case for
                                    procurement reform
                                </h3>
                                <p className="news-caption__date">
                                    Nov 19, 2020
                                </p>
                            </div>
                        </a>
                    </div>
                </div> */}
            </div>
        </section>
    )
}

export default News