// app/api/gemini/route.js
import { NextResponse } from 'next/server';

// Define your preferred model name
const MODEL_NAME = 'gemini-2.5-flash';
// The base URL for the generateContent endpoint
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/';

export async function POST(req) {
  try {
    const { message, context } = await req.json();

    if (!message) return NextResponse.json({ error: 'Missing message' }, { status: 400 });

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey)
      return NextResponse.json({ error: 'API Key not configured in environment variables' }, { status: 500 });

    // Construct the endpoint URL with the API Key as a query parameter
    const endpoint = `${BASE_URL}${MODEL_NAME}:generateContent?key=${apiKey}`;

    // 💡 THE FIX IS HERE: Renamed 'config' to 'generationConfig'
    const payload = {
      // The prompt is passed as an array of 'contents'
      contents: [{
        role: "user",
        parts: [{
          // Combine context and message for the model
          text: context
            ? `Context:\n${context}\n\nUser: ${message}`
            : `User: ${message}`,
        }],
      }],
      // ✅ Use the correct name for model configuration parameters
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096, // Use camelCase for official API parameters
      },
    };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      // This will now include the full upstream error for better debugging if a new error occurs
      return NextResponse.json({ error: 'Upstream API error', detail: errorText }, { status: 502 });
    }

    const data = await res.json();
    
    // 🔍 Extract the reply from the standard `generateContent` response structure
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      // Handle cases where no text is returned (e.g., due to safety filters or model refusal)
      return NextResponse.json({ 
        error: 'No text reply received from API', 
        detail: JSON.stringify(data) 
      }, { status: 500 });
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error during API call' }, { status: 500 });
  }
}