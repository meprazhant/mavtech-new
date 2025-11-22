'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Client {
    _id: string;
    name: string;
    mainImage?: string;
    link?: string;
    logoImage?: string;
    description?: string;
}

const heights = ['h-80'];

const Card = ({ client, index }: { client: Client; index: number }) => {
    const height = heights[index % heights.length];

    return (
        <motion.div
            className={`relative w-full ${height} mb-6 group break-inside-avoid`}
            initial="rest"
            whileHover="hover"
            animate="rest"
        >
            <a href={client.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                {/* Border Container */}
                <div
                    className="absolute inset-0 bg-white/20 transition-colors duration-300 group-hover:bg-[#CCFF00]"
                    style={{
                        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)'
                    }}
                >
                    {/* Inner Content Area */}
                    <div
                        className="absolute inset-[2px] bg-[#050505] overflow-hidden"
                        style={{
                            clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 39px), calc(100% - 39px) 100%, 0 100%)'
                        }}
                    >
                        {/* Layer 2: Hover Background - Circular Reveal */}
                        <motion.div
                            className="absolute inset-0 z-10"
                            variants={{
                                rest: { clipPath: "circle(0% at 50% 50%)" },
                                hover: { clipPath: "circle(150% at 50% 50%)" }
                            }}
                            transition={{ duration: 0.5, ease: "easeIn" }}
                        >
                            {client.mainImage && (
                                <>
                                    <img
                                        src={client.mainImage}
                                        alt={client.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                </>
                            )}

                            {/* Description on Hover */}
                            {client.description && (
                                <div className="absolute bottom-12 left-0 w-full p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    <p className="text-white text-sm font-medium line-clamp-3 drop-shadow-md">
                                        {client.description}
                                    </p>
                                </div>
                            )}
                        </motion.div>

                        {/* Layer 1: Floating Logo */}
                        <div className="absolute inset-0 flex items-center justify-center z-0 transition-all duration-500 group-hover:scale-90 group-hover:opacity-50">
                            {client.logoImage ? (
                                <img
                                    src={client.logoImage}
                                    alt={`${client.name} Logo`}
                                    className="w-1/2 h-auto max-h-32 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] invert"
                                />
                            ) : (
                                <span className="text-4xl font-black text-white/20">{client.name[0]}</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Label in the Chamfered Corner */}
                <div className="absolute bottom-2 right-10 z-30">
                    <span className="text-white/60 group-hover:text-[#CCFF00] text-xs font-bold tracking-wider uppercase font-mono transition-colors duration-300">
                        {client.name}
                    </span>
                </div>
            </a>
        </motion.div>
    );
};

export default function Gallery() {
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const res = await fetch('/api/clients');
                if (res.ok) {
                    const data = await res.json();
                    setClients(data);
                }
            } catch (error) {
                console.error('Failed to fetch clients', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchClients();
    }, []);

    return (
        <section className="w-full bg-black py-24 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4 italic tracking-tighter">
                        Brands we <span className="text-[#CCFF00]">WORKED</span> WITH
                    </h2>
                    <div className="h-1 w-24 bg-[#CCFF00]" />
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#CCFF00]"></div>
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
                        {clients.map((client, index) => (
                            <Card key={client._id} client={client} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}