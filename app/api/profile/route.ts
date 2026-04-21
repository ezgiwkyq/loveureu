import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) return NextResponse.json({ error: "Kullanıcı ID eksik" }, { status: 400 });

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) return NextResponse.json({}); 

    return NextResponse.json({
      bioText: data.bio_text,
      bgUrl: data.bg_url,
      bgType: data.bg_type,
      links: data.links || []
    });
  } catch (error: any) {
    return NextResponse.json({ error: `GET Hatası: ${error.message}` }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Giriş yapmanız gerekiyor!" }, { status: 401 });
    }

    const body = await req.json();
    
    if (session.user.id !== body.userId) {
      return NextResponse.json({ error: "Sadece KENDİ profilini düzenleyebilirsin!" }, { status: 403 });
    }

    const guvenliLinkler = body.links?.filter((link: any) => 
      link.url.startsWith('http://') || link.url.startsWith('https://')
    ) || [];

    // Veritabanına yazma işlemi
    const { error } = await supabase.from('profiles').upsert({ 
      id: body.userId, 
      bio_text: body.bioText,
      bg_url: body.bgUrl,
      bg_type: body.bgType,
      links: guvenliLinkler
    });

    if (error) {
      console.error("Supabase Hatası:", error);
      // Supabase'in gerçek hatasını ekrana yansıtıyoruz
      return NextResponse.json({ error: `Veritabanı Hatası: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API Hatası:", error);
    return NextResponse.json({ error: `Sunucu Hatası: ${error.message}` }, { status: 500 });
  }
}