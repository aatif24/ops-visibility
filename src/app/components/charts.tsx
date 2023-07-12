import React, { ReactElement, useEffect, useRef, useState } from 'react';
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import { PlainObject } from '@mongodb-js/charts-embed-dom/dist/declarations/src/types';
const sdk = new ChartsEmbedSDK({ baseUrl: 'https://charts.mongodb.com/charts-airfilytics-ragqe' });

type props = {
    filters: PlainObject;
    chartId: string;
    rendered: boolean;
    setRendered: (_: boolean) => void;
}
export default function Chart({ filters = {}, chartId, rendered, setRendered }: props): ReactElement {
    const chartDiv = useRef<any>(null);
    const [ dashboard ] = useState(sdk.createChart({
        chartId, height: "100%", filter: filters, getUserToken: async () => {
            // const response = await fetch('/api/opsDashboard/getToken', { method: "POST" });
            // const { token } = await response.json();
            // return token
            return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODkxNTMzMjMsImV4cCI6MTY4OTIzOTcyM30.ab7xnO3VOTzDa9xeJSfeonjUkkD_QyEXBo4vJfcfZ1s"
        }
    }));

    useEffect(() => {
        dashboard.render(chartDiv.current).then(() => setRendered(true)).catch(err => console.log("Error during Charts rendering.", err));
    }, [ dashboard ]);

    useEffect(() => {
        if (rendered) {
            if (Object.keys(filters).length) {
                dashboard.setFilter(filters).then(d => console.log("set filter returned")).catch(err => console.log("Error while filtering.", err));
            }
        }
    }, [ dashboard, filters, rendered ]);

    return <div className="chart w-full h-full" ref={chartDiv} />;
};

