import { type NextRequest, NextResponse } from 'next/server'

type contextParam = {
    params: {
        id: string
    }
}

export async function GET(_: NextRequest, context: contextParam) {
    const { params } = context;
    let filter = Buffer.from(`[{"id":"currentCustomer","value":"${params.id.toUpperCase()}"}]`).toString('base64');

    const response = await fetch(
        `https://airfi-disco.herokuapp.com/api/devices?hideOffline=false&page=0&pageSize=100000&onlyProduction=true&onlyNotSeenInMaintenance=true&filters=${filter}`,
        {
            headers:
            {
                authorization: `Basic ${Buffer.from("script-user:ug34AD_1TfYajg-23_aMeQt").toString("base64")}`
            }
        });
    const data = await response.json();
    return NextResponse.json(data)
}
