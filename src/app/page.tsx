'use client'
import { useEffect, useState } from "react";
import Chart from "./components/charts";
import base64 from 'buffer'
const charts = {
  boxes: '64ad400c-ed87-4ba0-8a5a-a29dc5f49bea',
  aircrafts: "64ad41f7-19ae-4458-801f-6cfc69afa5a7",
  connections: "64ad400c-ed87-4526-8fc0-a29dc5f49c02",
  flights: "64ad400c-ed87-4589-8019-a29dc5f49c0c"
}
export default function Home() {
  const [ rendered, setRendered ] = useState(false);
  const [ filters, setFilters ] = useState({})
  const [ onlineBoxes, setOnlineBoxes ] = useState(0)
  const [ allBoxes, setAllBoxes ] = useState(0)
  const [ offlineBoxes, setOfflineBoxes ] = useState(0)

  useEffect(() => {
    (async () => {
      const responseOnlineBoxes = await fetch('/disco/getOnlineBoxes');
      const dataOnlineBoxes = await responseOnlineBoxes.json();
      setOnlineBoxes(dataOnlineBoxes.totalCount);

      const responseAllBoxes = await fetch('/disco/getAllBoxes');
      const dataAllBoxes = await responseAllBoxes.json();
      setAllBoxes(dataAllBoxes.totalCount);

      const responseOfflineBoxes = await fetch('/disco/getOfflineBoxes');
      const dataOfflineBoxes = await responseOfflineBoxes.json();
      setOfflineBoxes(dataOfflineBoxes.totalCount);
    })()
  }, [])

  return (
    <main className="min-h-screen max-h-screen">
      <div className="flex w-full">
        <div>
          <div className="h-40 w-40 ">
            <div className="m-1 bg-white h-full flex justify-center flex-col">
              <p className=" font-medium flex justify-center mt-4">Boxes</p>
              <p className="text-5xl flex-grow flex justify-center  mt-4">{allBoxes}</p>
            </div>
          </div>
          <div className="h-40 w-40 p-1">
            <Chart rendered={rendered} setRendered={setRendered} chartId={charts.aircrafts} filters={filters} />
          </div>
        </div>
        <div className="h-80 w-1/2 p-1">
          <Chart rendered={rendered} setRendered={setRendered} chartId={charts.connections} filters={filters} />
        </div>
        <div className="h-80 w-1/2 p-1">
          <Chart rendered={rendered} setRendered={setRendered} chartId={charts.flights} filters={filters} />
        </div>
      </div>
      <div className="h-40 w-40 ">
        <div className="m-1 bg-white h-full flex justify-center flex-col">
          <p className=" font-medium flex justify-center mt-4">Online Boxes</p>
          <p className="text-5xl flex-grow flex justify-center  mt-4">{onlineBoxes}</p>
        </div>
      </div>
      <div className="h-40 w-40 ">
        <div className="m-1 bg-white h-full flex justify-center flex-col">
          <p className=" font-medium flex justify-center mt-4">{`offline > 2 Days`}</p>
          <p className="text-5xl flex-grow flex justify-center  mt-4">{offlineBoxes}</p>
        </div>
      </div>
    </main>
  )
}
