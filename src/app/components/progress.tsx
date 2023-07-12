import { useEffect, useState } from "react"

export default function ProgressBar({ counter }: any) {
    const [ progressPercentage, setProgressPercentage ] = useState(100);

    useEffect(() => {
        let interval = setInterval(() => {
            setProgressPercentage((prev: any) => {
                let pieces = 100 / counter;
                let num = prev - pieces;
                if (num <= pieces) {
                    return 100
                }
                return num;
            })
        }, 1000)
    }, [])

    return <div className='h-1 w-full bg-gray-300'>
        <div
            style={{ width: `${progressPercentage}%` }}
            className={`h-full bg-orange-600 transition-all duration-300 ease-in-out`}>
        </div>
    </div>
}