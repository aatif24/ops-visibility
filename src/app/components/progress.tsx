import { useEffect, useState } from "react"

export default function ProgressBar({ counter, change }: any) {
    const [ progressPercentage, setProgressPercentage ] = useState(100);
    let interval: any = null;
    useEffect(() => {
        if (interval)
            clearInterval(interval);

        setProgressPercentage(100);
        interval = setInterval(() => {
            setProgressPercentage((prev: any) => {
                let pieces = 100 / counter;
                let num = prev - pieces;
                if (num <= pieces) {
                    clearInterval(interval);
                }
                return num;
            })
        }, 1000)
    }, [ change ])

    return <div className='h-1 w-full bg-gray-300'>
        <div
            style={{ width: `${progressPercentage}%` }}
            className={`h-full bg-orange-600 transition-all duration-300 ease-in-out`}>
        </div>
    </div>
}