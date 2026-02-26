import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/data/internships.json');

function readInternships() {
    return JSON.parse(readFileSync(dataPath, 'utf-8'));
}

function writeInternships(items) {
    writeFileSync(dataPath, JSON.stringify(items, null, 2));
}

export async function GET() {
    const items = readInternships();
    return NextResponse.json(items);
}

export async function POST(request) {
    const body = await request.json();
    const items = readInternships();

    const newItem = {
        id: Date.now(),
        title: body.title || '',
        dept: body.dept || '',
        type: body.type || 'Remote',
        fee: body.fee || 'Paid',
        about: body.about || '',
        qualifications: body.qualifications || '',
        experience: body.experience || '',
        skills: body.skills || [],
        status: body.status || 'open',
        createdAt: new Date().toISOString(),
    };

    items.push(newItem);
    writeInternships(items);

    return NextResponse.json(newItem, { status: 201 });
}
