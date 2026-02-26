import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
    const { password } = await request.json();

    if (password === process.env.ADMIN_PASSWORD) {
        const response = NextResponse.json({ success: true });
        response.cookies.set('admin_session', process.env.ADMIN_SECRET, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });
        return response;
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
}

export async function DELETE() {
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_session', '', {
        httpOnly: true,
        expires: new Date(0),
        path: '/',
    });
    return response;
}
