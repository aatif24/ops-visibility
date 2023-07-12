import { type NextRequest, NextResponse } from 'next/server'

export async function GET(_: NextRequest) {
    let url = 'https://ap-south-1.aws.data.mongodb-api.com/app/data-jhfyn/endpoint/data/v1/action/aggregate';
    let options = {
        method: 'POST',
        headers: {
            Accept: '*/*',
            'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
            'api-key': 'U8Pn5TOC8HNKh9CMJB2gXwK3RA1Ek9yZZok5gT138kOrJWqZsWmcgdWU3lKSQVH6',
            'Content-Type': 'application/json'
        },
        body: '{"dataSource":"AFL","database":"airfi-box-metrics","collection":"metrics","pipeline":[{"$group":{"_id":"$IATA"}}]}'
    };

    let response = await fetch(url, options);
    const data = await response.json();
    return NextResponse.json(data.documents || [])
}
