import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, category, message, attachmentName, attachmentSize } = body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please enter your full name.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: 'Please provide a subject for your enquiry.' },
        { status: 400 }
      );
    }

    if (!category || typeof category !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Please select an enquiry category.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Please enter your message (at least 10 characters).' },
        { status: 400 }
      );
    }

    // Server-side logging / record creation
    const inquiryRecord = {
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      category: category.trim(),
      message: message.trim(),
      attachment: attachmentName ? { name: attachmentName, size: attachmentSize } : null,
      submittedAt: new Date().toISOString(),
      status: 'received',
      recipient: 'soumick.com@gmail.com',
    };

    console.log('[AstroRashi Contact Form Submission Received]:', inquiryRecord);

    return NextResponse.json({
      success: true,
      referenceId: inquiryRecord.id,
      message:
        'Thank you for contacting AstroRashi! Your message has been submitted successfully. Our support team will get back to you as soon as possible.',
    });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process message submission. Please try again.' },
      { status: 500 }
    );
  }
}

