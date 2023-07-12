import { type NextRequest, NextResponse } from 'next/server'

export async function GET(_: NextRequest) {
    const response = await fetch(
        'https://airfi-disco.herokuapp.com/api/devices?hideOffline=true&onlyProduction=false&hideWithoutProxy=false&onlyProduction=true',
        {
            headers:
            {
                authorization: `Basic ${Buffer.from("script-user:ug34AD_1TfYajg-23_aMeQt").toString("base64")}`
            }
        });
    const data = await response.json();
    return NextResponse.json(data)
}
