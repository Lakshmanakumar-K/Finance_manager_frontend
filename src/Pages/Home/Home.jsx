import Header from "../../Components/Header/Header.jsx"
import Navigation from "../../Components/Navigation/Navigation.jsx"
import { Outlet } from "react-router-dom"


export const Home = () => {

    return (<>
        <Header />
        <Navigation />
        <main>
            <Outlet />
        </main>
    </>)
}