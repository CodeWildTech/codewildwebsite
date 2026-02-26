import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/data/site-config.json');

function readConfig() {
    try {
        return JSON.parse(readFileSync(dataPath, 'utf-8'));
    } catch {
        return {
            availableForProjects: true,
            contactEmail: 'careers@codewild.tech',
            companyName: 'CodeWild Technology',
            tagline: 'Next-Gen Development Agency',
        };
    }
}

function writeConfig(config) {
    writeFileSync(dataPath, JSON.stringify(config, null, 2));
}

export async function GET() {
    const config = readConfig();
    return NextResponse.json(config);
}

export async function PUT(request) {
    const body = await request.json();
    const config = readConfig();
    const updated = { ...config, ...body };
    writeConfig(updated);
    return NextResponse.json(updated);
}
