"use client";

import { Providers } from "@/app/providers";
import { Provider } from "react-redux"
import store from "@/src/redux/store"

import { Navbar } from "@/src/components/navbar";
import { Link } from "@nextui-org/link";


function App({children} : {children: React.ReactNode}) {
    return (
        <Provider store={store}>
            <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="relative flex flex-col h-screen">
                <Navbar />
                <main className="container mx-auto max-w-7xl max-h-7xl pt-16 px-6 flex-grow">
                {children}
                </main>
                <footer className="w-full flex items-center justify-center py-3">
                <Link
                    isExternal
                    className="flex items-center gap-1 text-current"
                    href="#"
                    title="tobeyond"
                >
                    <p className="text-primary">Tobeyond</p>
                </Link>
                </footer>
            </div>
            </Providers>
        </Provider>
    )
}

export default App