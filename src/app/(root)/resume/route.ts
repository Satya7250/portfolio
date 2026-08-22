import { NextResponse } from 'next/server';
import { getResume } from '@/data/resume';

export async function GET() {
  const resume = await getResume();

  if (!resume?.fileUrl) {
    return new NextResponse('Resume not found', {
      status: 404,
    });
  }

  console.log('Resume URL:', resume.fileUrl);
  try {
    const response = await fetch(resume.fileUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.status}`);
    }

    const pdfBuffer = await response.arrayBuffer();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${resume.fileName || 'Resume.pdf'}"`,
      },
    });
  } catch (error) {
    console.error('Error serving resume:', error);

    return new NextResponse('Failed to load resume', {
      status: 500,
    });
  }
}
