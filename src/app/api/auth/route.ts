import { type NextRequest } from 'next/server'

export async function GET(_: NextRequest) {
    return new Response('Auth Required.', {
        status: 401,
        headers: { 'WWW-authenticate': 'Basic realm="Secure Area"' },
    })
}
