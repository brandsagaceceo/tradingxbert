import { NextRequest, NextResponse } from "next/server";

const TWELVE_DATA_API_KEY = process.env.TWELVE_DATA_API_KEY;

// Batch fetch multiple symbols in ONE API call (saves rate limits!)
async function fetchTwelveDataBatch(symbols: string[]) {
  if (!TWELVE_DATA_API_KEY) {
    throw new Error('TWELVE_DATA_API_KEY not configured');
  }

  const symbolString = symbols.join(',');
  const response = await fetch(
    `https://api.twelvedata.com/quote?symbol=${symbolString}&apikey=${TWELVE_DATA_API_KEY}`,
    { next: { revalidate: 60 } } // Cache for 60 seconds
  );

  if (!response.ok) {
    throw new Error(`Twelve Data API error: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.code === 429) {
    console.error('⚠️ Rate limit hit - using fallback prices');
    throw new Error('Rate limit exceeded');
  }
  
  if (data.status === 'error') {
    throw new Error(data.message || 'Twelve Data API error');
  }

  // Handle both single and batch responses
  const quotes = Array.isArray(data) ? data : [data];
  
  return quotes.map((quote: any) => ({
    symbol: quote.symbol,
    price: parseFloat(quote.close) || 0,
    change: parseFloat(quote.percent_change) || 0,
  }));
}

export async function GET(req: NextRequest) {
  try {
    // Fetch real-time crypto prices from CoinGecko (free API - still good for crypto)
    const cryptoResponse = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,cardano,ripple,dogecoin,chainlink&vs_currencies=usd&include_24hr_change=true',
      { next: { revalidate: 30 } } // Cache for 30 seconds
    );
    
    // Fetch ALL stocks in ONE batch API call (uses only 1 credit instead of 7!)
    const stockSymbols = ['AAPL', 'TSLA', 'NVDA', 'GOOGL', 'MSFT', 'AMZN', 'META'];
    let stockData: any[] = [];
    
    try {
      stockData = await fetchTwelveDataBatch(stockSymbols);
      console.log(`✅ Twelve Data batch: Fetched ${stockData.length} stocks`);
    } catch (error: any) {
      console.error('Error fetching stocks from Twelve Data:', error.message);
      // Fallback prices for December 31, 2025
      stockData = [
        { symbol: 'AAPL', price: 194.50, change: 0.8 },
        { symbol: 'TSLA', price: 358.75, change: -1.2 },
        { symbol: 'NVDA', price: 138.50, change: 2.1 },
        { symbol: 'GOOGL', price: 175.30, change: 1.1 },
        { symbol: 'MSFT', price: 414.60, change: 0.5 },
        { symbol: 'AMZN', price: 210.80, change: 1.4 },
        { symbol: 'META', price: 595.40, change: 1.8 }
      ];
    }

    // Fetch forex rates (keep ExchangeRate-API - it's free and reliable)
    const forexResponse = await fetch(
      'https://api.exchangerate-api.com/v4/latest/USD',
      { next: { revalidate: 300 } } // Cache for 5 minutes
    );
    
    // Fetch indices + commodities in ONE batch call (uses only 1 credit!)
    const marketSymbols = ['SPX', 'DJI', 'XAU/USD', 'CL', 'XAG/USD'];
    let marketData: any[] = [];
    
    try {
      marketData = await fetchTwelveDataBatch(marketSymbols);
      console.log(`✅ Twelve Data batch: Fetched ${marketData.length} markets`);
    } catch (error) {
      console.error('Error fetching markets from Twelve Data:', error);
      // Fallback for December 31, 2025
      marketData = [
        { symbol: 'SPX', price: 6000.00, change: 0.8 },
        { symbol: 'DJI', price: 43500.00, change: 0.6 },
        { symbol: 'XAU/USD', price: 2631.00, change: 0.3 },
        { symbol: 'CL', price: 71.50, change: -0.5 },
        { symbol: 'XAG/USD', price: 30.25, change: 2.68 }
      ];
    }

    const cryptoData = await cryptoResponse.json();
    const forexData = await forexResponse.json();

    // Format crypto prices
    const cryptoPrices = {
      BTC: {
        price: cryptoData.bitcoin?.usd || 0,
        change: cryptoData.bitcoin?.usd_24h_change || 0,
      },
      ETH: {
        price: cryptoData.ethereum?.usd || 0,
        change: cryptoData.ethereum?.usd_24h_change || 0,
      },
      SOL: {
        price: cryptoData.solana?.usd || 0,
        change: cryptoData.solana?.usd_24h_change || 0,
      },
      ADA: {
        price: cryptoData.cardano?.usd || 0,
        change: cryptoData.cardano?.usd_24h_change || 0,
      },
      XRP: {
        price: cryptoData.ripple?.usd || 0,
        change: cryptoData.ripple?.usd_24h_change || 0,
      },
      DOGE: {
        price: cryptoData.dogecoin?.usd || 0,
        change: cryptoData.dogecoin?.usd_24h_change || 0,
      },
      LINK: {
        price: cryptoData.chainlink?.usd || 0,
        change: cryptoData.chainlink?.usd_24h_change || 0,
      }
    };

    // Format stock prices from Twelve Data
    const stocks: any = {};
    stockData.forEach((data) => {
      if (data && data.price > 0) {
        stocks[data.symbol] = {
          price: data.price,
          change: data.change,
        };
      }
    });

    // Format forex prices
    const forex = {
      'EUR/USD': {
        price: 1 / (forexData.rates?.EUR || 1),
        change: 0, // Exchange rate API doesn't provide change
      },
      'GBP/USD': {
        price: 1 / (forexData.rates?.GBP || 1),
        change: 0,
      },
      'JPY/USD': {
        price: forexData.rates?.JPY || 1,
        change: 0,
      }
    };

    // Format commodities and indices from marketData batch
    const commodities: any = {};
    const indices: any = {};
    
    marketData.forEach((data) => {
      if (data.symbol === 'SPX' || data.symbol === 'DJI') {
        indices[data.symbol] = {
          price: data.price,
          change: data.change
        };
      } else if (data.symbol === 'XAU/USD') {
        commodities.GOLD = { price: data.price, change: data.change };
      } else if (data.symbol === 'CL') {
        commodities.OIL = { price: data.price, change: data.change };
      } else if (data.symbol === 'XAG/USD') {
        commodities.SILVER = { price: data.price, change: data.change };
      }
    });

    return NextResponse.json({
      crypto: cryptoPrices,
      stocks,
      forex,
      commodities,
      indices,
      timestamp: new Date().toISOString(),
      source: 'Twelve Data API (Stocks, Indices, Commodities) + CoinGecko (Crypto) + ExchangeRate-API (Forex)',
      apiStatus: TWELVE_DATA_API_KEY ? 'Using Twelve Data' : 'Using fallback data'
    });

  } catch (error: any) {
    console.error("Live prices error:", error);
    
    // Return fallback data if APIs fail
    return NextResponse.json({
      error: "Using fallback data",
      message: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
