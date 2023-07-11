'use client'
import { useState } from "react";
import Chart from "./components/charts";
const DASHBOARD_ID = '64ad400c-ed87-499d-81a0-a29dc5f49be2'
export default function Home() {
  const [ rendered, setRendered ] = useState(false);
  const [ filters, setFilters ] = useState({})

  return (
    <main className="flex min-h-screen max-h-screen">
      <Chart rendered={rendered} setRendered={setRendered} dashboardId={DASHBOARD_ID} filters={filters} />
    </main>
  )
}
