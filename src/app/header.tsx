import Image from "next/image";
import logo from '../../public/logo-menu.png'
export default function Header() {
let width;
let height;
    return <div className="h-12 w-full flex">
        <div className="logo bg-gradient-to-r w-2/6 from-orange-600 to-gray-100 flex items-center">
            <Image className="m-1 h-10 w-auto" src={logo} alt="AirFi-NL" />
        </div>
    </div>
}