"use client";

import SpaceScene from "@/components/SpaceScene";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function ResourcesPage() {
    const resources = [
        { title: "NASA Space Weather Website", href: "https://science.nasa.gov/heliophysics/focus-areas/space-weather/", desc: "Overview of space weather and NASA's Space Weather Program." },
        { title: "Solar Storms and Flares", href: "https://science.nasa.gov/sun/solar-storms-and-flares/", desc: "Explains solar flares, CMEs, and the solar activity cycle." },
        { title: "Results: National Survey of User Needs for Space Weather (2024)", href: "https://www.weather.gov/media/nws/Results-of-the-First-National-Survey-of-User-Needs-for-Space-Weather-2024.pdf", desc: "Findings from the 2024 Space Weather Advisory Group user survey." },
        { title: "Space Weather Centers of Excellence", href: "https://science.nasa.gov/space-weather-centers-of-excellence/", desc: "Projects focused on mitigating space weather impacts." },
        { title: "NASA Heliophysics Fleet (image)", href: "https://science.nasa.gov/wp-content/uploads/2020/01/hpd-fleet-chart-jan-2024.jpg", desc: "Visual representation of NASA heliophysics missions." },
        { title: "NOAA Space Weather Prediction Center (SWPC)", href: "https://www.swpc.noaa.gov/", desc: "Forecasts and data on space weather phenomena." },
        { title: "Human Activity Impacted Space Weather (video)", href: "https://svs.gsfc.nasa.gov/12593/", desc: "Video discussing human impacts on the space environment." },
        { title: "How Solar Flares Affect Earth (video)", href: "https://svs.gsfc.nasa.gov/12640/", desc: "Explains how solar flares impact Earth." },
        { title: "Space Weather Vocabulary (video)", href: "https://svs.gsfc.nasa.gov/11179/", desc: "Definitions of common space weather terms." },
        { title: "GOES-R: Five Things — Space Weather", href: "https://www.goes-r.gov/multimedia/space-weather.html", desc: "NOAA educational resource about space weather." },
        { title: "X-Class: A Guide to Solar Flares (YouTube)", href: "https://www.youtube.com/watch?v=oOXVZo7KikE", desc: "A video overview of X-class solar flares." },
        { title: "Space Weather Canada (CSA)", href: "https://www.spaceweather.gc.ca/index-en.php", desc: "Current conditions, data and services for Canada." },
        { title: "Space Weather over Canada (CSA)", href: "https://www.asc-csa.gc.ca/eng/sciences/space-weather.asp", desc: "Info about the importance of forecasting and impacts." },
        { title: "Brazilian EMBRACE Program (AEB/INPE)", href: "https://www2.inpe.br/climaespacial/portal/pt/", desc: "Real-time data and analysis platform for space weather in Brazil." },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="relative min-h-screen">
            <SpaceScene />
            <NavBar />

            <main className="relative z-10 container mx-auto px-6 py-32">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="glass max-w-5xl mx-auto p-8 md:p-12 mb-10"
                >
                    <h1 className="text-4xl font-bold text-white mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                        NASA Data & Space Weather Resources
                    </h1>
                    <p className="text-lg text-blue-100/70 text-center max-w-3xl mx-auto">
                        Curated links related to space weather, outreach videos and partner resources.
                        Explore the data that powers our understanding of the universe.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
                >
                    {resources.map((r, index) => (
                        <motion.a
                            key={index}
                            href={r.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, translateY: -5 }}
                            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors backdrop-blur-md group flex flex-col"
                        >
                            <h3 className="text-xl font-semibold text-blue-200 mb-3 group-hover:text-white transition-colors">
                                {r.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                                {r.desc}
                            </p>
                            <div className="mt-4 text-blue-400 text-sm font-medium group-hover:text-blue-300 flex items-center gap-2">
                                Open Resource
                                <ExternalLink size={16} />
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </main>
            <Footer />
        </div>
    );
}