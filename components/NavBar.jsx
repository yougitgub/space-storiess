import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="glass fixed inset-x-0 top-6 mx-auto w-[92%] max-w-5xl z-50 rounded-2xl bg-white/6 backdrop-blur-md border border-white/10 shadow-lg text-white px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="text-lg font-semibold tracking-tight">Space Stories</div>
                <span className="hidden sm:inline-block text-xs text-white/60">— journal of the cosmos</span>
            </div>

            <div className="flex items-center gap-3">
                <Link href="/" className="text-sm font-medium px-3 py-1 rounded-md hover:bg-white/10 transition">Home</Link>
                <Link href="#" className="text-sm font-medium px-3 py-1 rounded-md hover:bg-white/10 transition">Stories</Link>
                <Link href="#" className="text-sm font-medium px-3 py-1 rounded-md hover:bg-white/10 transition">About US</Link>
            </div>
        </nav>
    );
}

