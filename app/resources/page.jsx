"use client";
import SpaceScene from "@/components/SpaceScene";
import NavBar from "@/components/NavBar";
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

    return (
        <main style={{ padding: 20, display: "flex", justifyContent: "center" }}>
            <SpaceScene></SpaceScene>
            <NavBar></NavBar>
            <style jsx>{`
                .glass-shell{width:100%;max-width:1100px}
                .glass{background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));border:1px solid rgba(255,255,255,0.05);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);padding:26px;border-radius:14px;box-shadow:0 12px 40px rgba(2,6,23,0.6)}
                h2{color:#fff;margin:0 0 8px 0;text-align:center;font-size:1.9rem}
                .lead{color:rgba(223,243,255,0.75);text-align:left;margin:12px 0 20px;font-size:1rem}
                .list{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:12px}
                .item{padding:12px;border-radius:10px;background:rgba(255,255,255,0.01);border:1px solid rgba(255,255,255,0.03)}
                .item h3{margin:0 0 6px 0;color:#e6f8ff;font-size:1.05rem}
                .item p{margin:0;color:rgba(223,243,255,0.72);font-size:0.95rem}
                .item a{color:#7fe6ff;text-decoration:none;margin-top:8px;display:inline-block}
            `}</style>

            <div className="glass-shell mt-30">
                <div className="glass">
                    <h2>NASA Data &amp; Space Weather Resources</h2>
                    <p className="lead">Curated links related to space weather, outreach videos and partner resources. Open any link in a new tab.</p>

                    <div className="list">
                        {resources.map((r) => (
                            <div className="item" key={r.href}>
                                <h3>{r.title}</h3>
                                <p>{r.desc}</p>
                                <a href={r.href} target="_blank" rel="noopener noreferrer">Open link ↗</a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}