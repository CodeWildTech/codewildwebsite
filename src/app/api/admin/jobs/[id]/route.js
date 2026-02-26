import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/data/jobs.json');

function readJobs() {
    return JSON.parse(readFileSync(dataPath, 'utf-8'));
}

function writeJobs(jobs) {
    writeFileSync(dataPath, JSON.stringify(jobs, null, 2));
}

export async function PUT(request, { params }) {
    const id = Number(params.id);
    const body = await request.json();
    let jobs = readJobs();

    const index = jobs.findIndex((j) => j.id === id);
    if (index === -1) {
        return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    jobs[index] = { ...jobs[index], ...body, id };
    writeJobs(jobs);

    return NextResponse.json(jobs[index]);
}

export async function DELETE(request, { params }) {
    const id = Number(params.id);
    let jobs = readJobs();

    const filtered = jobs.filter((j) => j.id !== id);
    if (filtered.length === jobs.length) {
        return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    writeJobs(filtered);
    return NextResponse.json({ success: true });
}
