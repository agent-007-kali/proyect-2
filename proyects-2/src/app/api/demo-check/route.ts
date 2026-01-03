import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // 1. Basic URL validation
    try {
      new URL(url);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    console.log(`🧪 Demo check requested for: ${url}`);

    // 2. Scrape the URL
    let textContent = '';
    try {
      const response = await fetch(url, { 
        headers: { 'User-Agent': 'Mozilla/5.0 (AgenticSpy-Demo/1.0)' },
        next: { revalidate: 3600 } 
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const html = await response.text();
      const $ = cheerio.load(html);
      
      // Remove scripts, styles, etc.
      $('script, style, nav, footer, header').remove();
      textContent = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 2000);
    } catch (scrapeError: any) {
      console.error('Scrape error:', scrapeError);
      return NextResponse.json({ error: 'Failed to scrape the website. Some sites block automated access.' }, { status: 500 });
    }

    // 3. Call local Ollama
    const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434/api/generate';
    const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2:3b';

    try {
      const ollamaResponse = await fetch(OLLAMA_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({
          model: OLLAMA_MODEL,
          prompt: `You are a competitive intelligence analyst. Below is text from a competitor's website. 
Provide a "Quick Competitive Summary" focusing on their core value proposition and pricing (if visible). 
Keep it under 150 words.

WEBSITE TEXT:
${textContent}`,
          stream: false,
        }),
      });

      if (!ollamaResponse.ok) {
        const errorText = await ollamaResponse.text();
        console.error('Ollama API Error Response:', errorText);
        throw new Error(`Ollama error! status: ${ollamaResponse.status}`);
      }

      const aiData = await ollamaResponse.json();
      const analysis = aiData.response;

      return NextResponse.json({ 
        success: true, 
        analysis,
        url,
        timestamp: new Date().toISOString()
      });
    } catch (aiError: any) {
      console.error('AI error detail:', aiError);
      return NextResponse.json({ 
        error: 'AI Analysis engine is currently busy or unavailable.',
        debug: process.env.NODE_ENV === 'development' ? aiError.message : undefined 
      }, { status: 503 });
    }

  } catch (error: any) {
    console.error('Demo API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
