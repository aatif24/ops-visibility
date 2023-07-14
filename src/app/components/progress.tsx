import { useEffect, useState } from "react"

export default function ProgressBar({ counter, change }: any) {
    const [progressPercentage, setProgressPercentage] = useState(100);
    let interval: any = null;
    let pieces = 1 / counter;
    useEffect(() => {
        if (interval)
            clearInterval(interval);

        setProgressPercentage(100);
        interval = setInterval(() => {
            setProgressPercentage((prev: any) => {
                let num = prev - pieces;
                if (num <= pieces) {
                    clearInterval(interval);
                }
                return num;
            })
        }, 10)
    }, [change])

    return <progress className="w-full h-1 block" max="100" value={progressPercentage}></progress>

}