import React, { ReactElement, useEffect, useRef, useState } from 'react';
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import { PlainObject } from '@mongodb-js/charts-embed-dom/dist/declarations/src/types';
const sdk = new ChartsEmbedSDK({ baseUrl: 'https://charts.mongodb.com/charts-airfilytics-ragqe' });

type props = {
    filters: PlainObject;
    dashboardId: string;
    rendered: boolean;
    setRendered: (_: boolean) => void;
}
export default function Chart({ filters = {}, dashboardId, rendered, setRendered }: props): ReactElement {
    const chartDiv = useRef<any>(null);
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    console.log("🚀 ~ file: charts.tsx:15 ~ Chart ~ darkThemeMq:", darkThemeMq);


    const [ dashboard ] = useState(sdk.createDashboard({
        dashboardId, widthMode: "scale", height: "100%", filter: filters, theme: darkThemeMq.matches ? 'dark' : 'light', getUserToken: async () => {
            // const response = await fetch('/api/opsDashboard/getToken', { method: "POST" });
            // const { token } = await response.json();
            // return token
            return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODkwNzQ5MTYsImV4cCI6MTY4OTE2MTMxNn0.YAYV5TEthdrx6r_3Rzo5fkfEU3dyQMo_31pCvVMn2mo"
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

