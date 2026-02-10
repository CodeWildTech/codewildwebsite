import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, portfolio, resumeUrl, message, jobTitle } =
      body;

    // Validating data
    if (
      !fullName ||
      !email ||
      !phone ||
      !portfolio ||
      !resumeUrl ||
      !jobTitle
    ) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Here you would typically send an email or save to a database
    console.log('Application received for:', jobTitle);
    console.log('Details:', body);

    // Simulate success
    return NextResponse.json(
      { message: 'Application submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error handling application:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
