import { type NextRequest, NextResponse } from 'next/server'

export async function GET(_: NextRequest) {
    let url = 'https://ap-south-1.aws.data.mongodb-api.com/app/data-jhfyn/endpoint/data/v1/action/findOne?' + Math.random();
    let options = {
        method: 'POST',
        headers: {
            Accept: '*/*',
            'api-key': 'U8Pn5TOC8HNKh9CMJB2gXwK3RA1Ek9yZZok5gT138kOrJWqZsWmcgdWU3lKSQVH6',
            'Content-Type': 'application/json'
        },
        body: '{"dataSource":"AFL","database":"airfi-box-metrics","collection":"opsVisibility","filter":{"_id":"active"}}'
    };

    let response = await fetch(url, options);
    const data = await response.json();
    return NextResponse.json(data?.document?.iata || [])
}
