// /app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "TradingXbert — Most Advanced AI Chart Analysis Tool";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  const base = process.env.NEXT_PUBLIC_METADATA_BASE || 'http://localhost:3000'

  return new ImageResponse(
    (
      <div style={{
        background: 'linear-gradient(90deg, #111827 0%, #0b1220 100%)',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 48,
      }}>
        <div style={{display:'flex',alignItems:'center',gap:20}}>
          <svg width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0%" stopColor="#00ffa3" />
                <stop offset="50%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
            <rect x="2" y="2" width="60" height="60" rx="12" fill="url(#g1)" />
            <path d="M20 46 L44 20" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M44 46 L20 20" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18 18 H46" stroke="rgba(255,255,255,0.95)" strokeWidth="4" strokeLinecap="round" />
            <path d="M32 18 V46" stroke="rgba(255,255,255,0.95)" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <div style={{display:'flex',flexDirection:'column'}}>
            <div style={{fontSize:40,fontWeight:700}}>TradingXbert</div>
            <div style={{fontSize:20,opacity:0.8}}>Advanced AI Chart Analysis</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
