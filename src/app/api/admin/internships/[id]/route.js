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

export async function PUT(request, { params }) {
    const id = Number(params.id);
    const body = await request.json();
    let items = readInternships();

    const index = items.findIndex((i) => i.id === id);
    if (index === -1) {
        return NextResponse.json({ error: 'Internship not found' }, { status: 404 });
    }

    items[index] = { ...items[index], ...body, id };
    writeInternships(items);

    return NextResponse.json(items[index]);
}

export async function DELETE(request, { params }) {
    const id = Number(params.id);
    let items = readInternships();

    const filtered = items.filter((i) => i.id !== id);
    if (filtered.length === items.length) {
        return NextResponse.json({ error: 'Internship not found' }, { status: 404 });
    }

    writeInternships(filtered);
    return NextResponse.json({ success: true });
}
