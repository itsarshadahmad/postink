export default function Card({ cardData }) {
    return (
        <div className="bg-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-12">
                    <h1 className="text-4xl font-semibold text-gray-900">
                        Blogs
                    </h1>
                    <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-1">
                        {cardData.length > 0 &&
                            cardData.map((callout) => (
                                <div
                                    key={callout.name}
                                    className="group relative "
                                >
                                    <img
                                        alt={callout.imageAlt}
                                        src={callout.imageSrc}
                                        className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-[2/1] lg:aspect-square"
                                    />
                                    <h3 className="mt-6 text-sm text-gray-500">
                                        <a href={callout.href}>
                                            <span className="absolute inset-0" />
                                            {callout.name}
                                        </a>
                                    </h3>
                                    <p className="text-base font-semibold text-gray-900">
                                        {callout.description}
                                    </p>
                                </div>
                            ))}

                        {cardData.length === 0 && (
                            <h1 className="mt-6 text-xl text-gray-600">
                                No Blogs Found
                            </h1>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
