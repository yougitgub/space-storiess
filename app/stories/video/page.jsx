import NavBar from "@/components/NavBar"

export default function VideoPage(){
    return (
        <>
        <NavBar/>
        <div className="w-full h-screen">     
            <iframe className="w-full h-full" src="https://www.youtube.com/embed/nZP4gNOBVXw?autoplay=1&controls=0&loop=1&playlist=nZP4gNOBVXw" title="YouTube video player" allow="autoplay; fullscreen" allowfullscreen=""></iframe>
        </div>
        </>
    )
}