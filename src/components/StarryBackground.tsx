"use client";

import React, { useEffect, useState } from "react";

const StarryBackground = () => {
    const [staticStars, setStaticStars] = useState<{ id: number, top: string, left: string, size: string, duration: string }[]>([]);

    useEffect(() => {
        // Generate static twinkling stars
        const newStaticStars = Array.from({ length: 150 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 2 + 0.5}px`,
            duration: `${Math.random() * 3 + 2}s`,
        }));
        setStaticStars(newStaticStars);
    }, []);

    return (
        <div className="stars-container">
            {staticStars.map((star) => (
                <div
                    key={`static-${star.id}`}
                    className="static-star"
                    style={{
                        top: star.top,
                        left: star.left,
                        width: star.size,
                        height: star.size,
                        "--duration": star.duration,
                    } as any}
                />
            ))}
        </div>
    );
};

export default StarryBackground;
