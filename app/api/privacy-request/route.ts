import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, requestType, message } = body;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please provide your full name.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!requestType || typeof requestType !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Please choose a data privacy request type.' },
        { status: 400 }
      );
    }

    const privacyRecord = {
      id: `dpr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      requestType,
      message: message ? message.trim() : '',
      submittedAt: new Date().toISOString(),
      status: 'pending_verification',
      noticeSentTo: 'soumick.com@gmail.com',
    };

    console.log('[AstroRashi Privacy & Data Request Received]:', privacyRecord);

    return NextResponse.json({
      success: true,
      referenceId: privacyRecord.id,
      message:
        'Your privacy request has been received. Our Data Protection team will verify your identity and process your request within applicable statutory timelines.',
    });
  } catch (error: any) {
    console.error('Privacy Request API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit privacy request. Please contact soumick.com@gmail.com directly.' },
      { status: 500 }
    );
  }
}

