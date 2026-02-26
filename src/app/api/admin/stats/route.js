import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import path from 'path';

function readJSON(filename) {
    try {
        return JSON.parse(readFileSync(path.join(process.cwd(), 'src/data', filename), 'utf-8'));
    } catch {
        return [];
    }
}

export async function GET() {
    const jobs = readJSON('jobs.json');
    const internships = readJSON('internships.json');
    const applications = readJSON('applications.json');

    const openJobs = jobs.filter((j) => j.status === 'open').length;
    const openInternships = internships.filter((i) => i.status === 'open').length;

    const today = new Date().toISOString().split('T')[0];
    const appsToday = applications.filter((a) => a.submittedAt?.startsWith(today)).length;

    // Last 5 applications
    const recentApplications = applications
        .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
        .slice(0, 5);

    return NextResponse.json({
        totalJobs: jobs.length,
        openJobs,
        totalInternships: internships.length,
        openInternships,
        totalApplications: applications.length,
        applicationsToday: appsToday,
        recentApplications,
    });
}
