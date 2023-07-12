import Image from "next/image";

export default function Header() {
    return <div className="h-12 w-full flex">
        <div className="logo bg-gradient-to-r w-2/6 from-orange-600 to-gray-100">
            <Image width={100} height={100} className="h-10 w-fit mt-1" src="/logo-menu.png" alt="AirFi-NL" />
        </div>
    </div>
}