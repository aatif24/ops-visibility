import { type NextRequest, NextResponse } from 'next/server'
const jwt =  require('jsonwebtoken');

export async function POST(_: NextRequest) {
    var token = jwt.sign({}, 'ops-dashboard-disco-secret-4321',{ expiresIn: '24h' });
    return NextResponse.json({token})
}
