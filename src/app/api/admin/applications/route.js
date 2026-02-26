import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/data/applications.json');

function readApplications() {
    try {
        return JSON.parse(readFileSync(dataPath, 'utf-8'));
    } catch {
        return [];
    }
}

export async function GET() {
    const applications = readApplications();
    return NextResponse.json(applications);
}
