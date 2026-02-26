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

export async function GET() {
    const jobs = readJobs();
    return NextResponse.json(jobs);
}

export async function POST(request) {
    const body = await request.json();
    const jobs = readJobs();

    const newJob = {
        id: Date.now(),
        title: body.title || '',
        dept: body.dept || '',
        type: body.type || 'Remote',
        fee: body.fee || '',
        about: body.about || '',
        qualifications: body.qualifications || '',
        experience: body.experience || '',
        skills: body.skills || [],
        status: body.status || 'open',
        createdAt: new Date().toISOString(),
    };

    jobs.push(newJob);
    writeJobs(jobs);

    return NextResponse.json(newJob, { status: 201 });
}
