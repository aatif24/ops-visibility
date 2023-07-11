'use client'
import { useState } from "react";
import Chart from "./components/charts";
const DASHBOARD_ID = '64ad400c-ed87-499d-81a0-a29dc5f49be2'
export default function Home() {
  const [ rendered, setRendered ] = useState(false);
  const [ filters, setFilters ] = useState({})

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Chart rendered={rendered} setRendered={setRendered} dashboardId={DASHBOARD_ID} filters={filters} />
    </main>
  )
}
