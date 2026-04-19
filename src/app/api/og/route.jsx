import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const text = searchParams.get('text') || 'Wer auf die "perfekte" KI-Lösung wartet, wartet zu lange.';
  
  const baseUrl = origin.includes('localhost') ? 'https://www.derhefter.com' : origin;
  
  // Lade das Bild als Buffer für die Edge Runtime
  const avatarImageData = await fetch(new URL(`${baseUrl}/avatar-steffen-linkedin.jpg`)).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '120px',
          width: '100%',
          height: '100%',
          backgroundColor: '#0369A1',
          color: 'white',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '24px', background: 'linear-gradient(to right, #FDE68A, #FFFFFF)' }} />
        
        <div style={{ position: 'absolute', top: '80px', left: '120px', display: 'flex', fontSize: '36px', fontWeight: 900, color: 'white' }}>
          KI-Kompass
        </div>

        <div style={{ position: 'absolute', top: '80px', right: '120px', display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: '20px' }}>
            <span style={{ fontSize: '24px', fontWeight: 700, color: 'white' }}>Steffen Hefter</span>
            <span style={{ fontSize: '18px', color: '#BAE6FD' }}>frimalo KI-Beratung</span>
          </div>
          <img
            src={avatarImageData}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '40px',
              border: '3px solid white',
              objectFit: 'cover'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', marginBottom: '50px' }}>
          <div style={{ background: '#1E293B', color: 'white', padding: '12px 28px', borderRadius: '50px', fontWeight: 700, fontSize: '32px', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Praxiswissen
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: '82px', fontWeight: 900, lineHeight: 1.15, marginBottom: '60px', letterSpacing: '-1.5px', color: 'white' }}>
          {text}
        </div>

        <div style={{ position: 'absolute', bottom: '80px', left: '120px', display: 'flex', fontSize: '32px', color: 'white', opacity: 0.9 }}>
          Mehr Praxiswissen auf <strong style={{ marginLeft: '12px', opacity: 1 }}>derhefter.com</strong>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1080,
    }
  );
}
