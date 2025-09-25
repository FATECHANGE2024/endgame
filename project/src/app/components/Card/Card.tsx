"use client";

import Image from "next/image";

interface CardProps {
    title: string;
    description: string;
    status: string;
    coordinates: { latitude: number; longitude: number };
    imageUrl?: string;
    locationName?: string;
    timeAgo?: string;
}

export default function Card({
    title,
    description,
    coordinates,
    timeAgo,
    status,
    imageUrl,
}: CardProps) {
    return (
        <div className="border rounded-lg shadow p-4 max-w-sm">
            {imageUrl ? (
                <Image
                    src={imageUrl}
                    alt={title}
                    width={400}
                    height={200}
                    className="rounded-t-lg object-cover"
                />
            ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-t-lg">
                    Image not found
                </div>
            )}
            <div className="mt-2">
                <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${status === "Resolved"
                            ? "bg-green-100 text-green-700"
                            : status === "In Progress"
                                ? "bg-cyan-100 text-cyan-700"
                                : "bg-yellow-100 text-yellow-700"
                        }`}
                >
                    {status}
                </span>
                <h3 className="font-semibold text-lg mt-1">{title}</h3>
                <p className="text-gray-700 mt-1">{description}</p>
                {coordinates && (
                    <p className="text-gray-500 text-sm mt-2">📍 {coordinates.latitude} {coordinates.longitude}</p>
                )}
                {timeAgo && (
                    <p className="text-gray-500 text-sm">⏱ {timeAgo}</p>
                )}
            </div>
        </div>
    );
}
