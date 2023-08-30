
export default function Navbar() {



    return <nav className='nav'>

        <a href='/' className='site-title'>SupplyChain Blockchain</a>
        <ul className="dis">


            <li>
                <a href='/component/AllProducts'>Products</a>
            </li>

            <li>
                <a href='/component/ProductsId'>Products ID</a>
            </li>


            <li>
                <a href='/component/address'>Manufacturer</a>
            </li>

            <li className="services">
                <a href='/component/Zero'>State</a>
                <ul className="dropdown" >
                    <li><a href="/">PROCESS</a></li>
                    <li><a href="/">FINISH</a></li>
                    <li><a href="/">IN_TRANSIT</a></li>
                    <li><a href="/">ARRIVED</a></li>
                </ul>


            </li>



            <li>
                <a href='/component/Search'>Serach</a>
            </li>







        </ul>

    </nav>
}
