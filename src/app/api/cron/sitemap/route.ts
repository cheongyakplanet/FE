import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// 동적 렌더링 강제 (revalidatePath 사용을 위함)
export const dynamic = 'force-dynamic';

// 외부 cron 서비스용 엔드포인트
export async function GET() {
  try {
    // sitemap.xml 재생성 트리거
    revalidatePath('/sitemap.xml');
    
    const timestamp = new Date().toISOString();
    console.log('Scheduled sitemap update completed at:', timestamp);
    
    return NextResponse.json({
      message: 'Sitemap updated successfully via cron',
      timestamp,
      success: true
    });
    
  } catch (error) {
    console.error('Cron sitemap update failed:', error);
    
    return NextResponse.json(
      { message: 'Cron sitemap update failed', error: String(error), success: false },
      { status: 500 }
    );
  }
}