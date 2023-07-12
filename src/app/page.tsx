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
import { ArrowPathIcon } from '@heroicons/react/20/solid'
import ProgressBar from "./components/progress";
const interval = 30;
type customer = {
  _id: string
}
export default function Home() {
  const [ rendered, setRendered ] = useState(false);
  const [ filters, setFilters ] = useState({})
  const [ onlineBoxes, setOnlineBoxes ] = useState({ loading: true, count: 0 })
  const [ allBoxes, setAllBoxes ] = useState({ loading: true, count: 0 })
  const [ offlineBoxes, setOfflineBoxes ] = useState({ loading: true, count: 0 })
  const [ customers, setCustomers ] = useState<customer[]>()
  const [ selectedCustomer, setSelectedCutomer ] = useState<string>("")
  const [ progress, setProgress ] = useState<number>(40)

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/atlas/getCustomers');
      let customersData = await response.json();
      if (customersData.length) {
        customersData = customersData.filter((iata: any) => iata._id != null)
        setCustomers(customersData)
      }
    })()
  }, [])

  useEffect(() => {
    if (customers && customers.length) {
      startPresentation(customers)
    }
  }, [ customers ])

  async function startPresentation(customers: any) {
    for (let customer of customers) {
      setSelectedCutomer(customer?._id)
      setFilters({ IATA: customer?._id })
      setProgress(100);
      await sleep(interval * 1000)
    }
    startPresentation(customers)
  }


  useEffect(() => {
    if (selectedCustomer != "") {
      (async () => {
        setOnlineBoxes({ loading: true, count: 0 });
        const responseOnlineBoxes = await fetch(`/api/disco/getOnlineBoxes/${selectedCustomer}`);
        const dataOnlineBoxes = await responseOnlineBoxes.json();
        setOnlineBoxes({ loading: false, count: dataOnlineBoxes.totalCount });
      })()
    }
  }, [ selectedCustomer ])

  useEffect(() => {
    if (selectedCustomer != "") {
      (async () => {
        setAllBoxes({ loading: true, count: 0 });
        const responseAllBoxes = await fetch(`/api/disco/getAllBoxes/${selectedCustomer}`);
        const dataAllBoxes = await responseAllBoxes.json();
        setAllBoxes({ loading: false, count: dataAllBoxes.totalCount });
      })()
    }
  }, [ selectedCustomer ])

  useEffect(() => {
    if (selectedCustomer != "") {
      (async () => {
        setOfflineBoxes({ loading: true, count: 0 });
        const responseOfflineBoxes = await fetch(`/api/disco/getOfflineBoxes/${selectedCustomer}`);
        const dataOfflineBoxes = await responseOfflineBoxes.json();
        setOfflineBoxes({ loading: false, count: dataOfflineBoxes.totalCount });
      })()
    }
  }, [ selectedCustomer ])



  return (
    <main className="min-h-screen max-h-screen">
      <div>
        <p className="text-5xl text-orange-600 absolute top-0 left-1/2">{selectedCustomer}</p>
        {selectedCustomer ? <ProgressBar change={selectedCustomer} counter={interval} /> : null}
      </div>
      {selectedCustomer ?
        <>
          <div className="flex w-full">

            <div>
              <div className="h-40 w-40 ">
                <div className="m-1 bg-white h-full flex justify-center flex-col">
                  <p className=" font-medium flex justify-center mt-4">Boxes</p>
                  <p className="text-5xl flex-grow flex justify-center  mt-4">
                    {
                      allBoxes.loading ? <ArrowPathIcon className="text-gray-600 h-6 wi-6 animate-spin" /> : allBoxes.count
                    }
                  </p>
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
          <div className="flex w-full">
            <div>
              <div className="h-40 w-40 ">
                <div className="m-1 bg-white h-full flex justify-center flex-col">
                  <p className=" font-medium flex justify-center mt-4">Online Boxes</p>
                  <p className="text-5xl flex-grow flex justify-center mt-4">
                    {
                      onlineBoxes.loading ? <ArrowPathIcon className="text-gray-600 h-6 wi-6 animate-spin" /> : onlineBoxes.count
                    }
                  </p>
                </div>
              </div>
              <div className="h-40 w-40 ">
                <div className="m-1 bg-white h-full flex justify-center flex-col">

                  <p className=" font-medium flex justify-center mt-4">{`offline > 2 Days`}</p>
                  <p className="text-5xl flex-grow flex justify-center  mt-4">
                    {
                      offlineBoxes.loading ? <ArrowPathIcon className="text-gray-600 h-6 wi-6 animate-spin" /> : offlineBoxes.count
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
        : null}
    </main>
  )
}

const sleep = (time: any) => new Promise(res => setTimeout(res, time, "done sleeping"));

