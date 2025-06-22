import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    // sitemap.xml 경로 재검증
    revalidatePath('/sitemap.xml');
    
    console.log('Sitemap revalidated at:', new Date().toISOString());
    
    return NextResponse.json({
      message: 'Sitemap revalidated successfully',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error revalidating sitemap:', error);
    
    return NextResponse.json(
      { message: 'Failed to revalidate sitemap', error: String(error) },
      { status: 500 }
    );
  }
}