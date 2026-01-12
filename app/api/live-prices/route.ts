import { NextRequest, NextResponse } from "next/server";

// Using Finnhub free API - 60 calls/minute (no API key required for basic quotes)
async function fetchFinnhubQuote(symbol: string) {
  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=demo`,
      { next: { revalidate: 60 } }
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    
    if (!data.c || data.c === 0) return null;
    
    const currentPrice = data.c; // current price
    const previousClose = data.pc; // previous close
    const change = previousClose ? ((currentPrice - previousClose) / previousClose) * 100 : 0;
    
    return {
      symbol,
      price: currentPrice,
      change: change,
    };
  } catch (error) {
    console.error(`Error fetching ${symbol}:`, error);
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    // Fetch real-time crypto prices from CoinGecko (free API)
    const cryptoResponse = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,cardano,ripple,dogecoin,chainlink&vs_currencies=usd&include_24hr_change=true',
      { next: { revalidate: 30 } }
    );
    
    // Fetch real-time stock prices from Finnhub (free API - 60 calls/min)
    const stockSymbols = ['AAPL', 'TSLA', 'NVDA', 'GOOGL', 'MSFT', 'AMZN', 'META'];
    const stockPromises = stockSymbols.map(symbol => fetchFinnhubQuote(symbol));
    const stockResults = await Promise.all(stockPromises);
    
    // Fetch indices and commodities from Yahoo Finance (free, no key needed)
    const yahooSymbols = [
      { symbol: '^GSPC', key: 'SPX' },      // S&P 500
      { symbol: '^DJI', key: 'DJI' },       // Dow Jones
      { symbol: 'GC=F', key: 'GOLD' },      // Gold Futures
      { symbol: 'CL=F', key: 'OIL' },       // Crude Oil Futures
    ];
    
    const yahooPromises = yahooSymbols.map(async ({ symbol, key }) => {
      try {
        const response = await fetch(
          `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`,
          { next: { revalidate: 60 } }
        );
        const data = await response.json();
        const result = data.chart?.result?.[0];
        const meta = result?.meta;
        const quote = result?.indicators?.quote?.[0];
        
        if (meta && quote) {
          const currentPrice = meta.regularMarketPrice;
          const previousClose = meta.chartPreviousClose;
          const change = previousClose ? ((currentPrice - previousClose) / previousClose) * 100 : 0;
          
          return { key, price: currentPrice, change };
        }
        return null;
      } catch (error) {
        console.error(`Error fetching ${symbol}:`, error);
        return null;
      }
    });
    
    const yahooResults = await Promise.all(yahooPromises);

    // Fetch forex rates (keep ExchangeRate-API - it's free and reliable)
    const forexResponse = await fetch(
      'https://api.exchangerate-api.com/v4/latest/USD',
      { next: { revalidate: 300 } }
    );

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

    // Format stock prices from Finnhub
    const stocks: any = {};
    stockResults.forEach((data) => {
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
        change: 0,
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

    // Format commodities and indices from Yahoo Finance
    const commodities: any = {};
    const indices: any = {};
    
    yahooResults.forEach((data) => {
      if (!data) return;
      
      if (data.key === 'SPX' || data.key === 'DJI') {
        indices[data.key] = {
          price: data.price,
          change: data.change
        };
      } else if (data.key === 'GOLD') {
        commodities.GOLD = { price: data.price, change: data.change };
      } else if (data.key === 'OIL') {
        commodities.OIL = { price: data.price, change: data.change };
      }
    });

    return NextResponse.json({
      crypto: cryptoPrices,
      stocks,
      forex,
      commodities,
      indices,
      timestamp: new Date().toISOString(),
      source: 'CoinGecko (Crypto) + Finnhub (Stocks) + Yahoo Finance (Indices/Commodities) - All FREE APIs',
      note: '100% Free real-time market data'
    });

  } catch (error: any) {
    console.error("Live prices error:", error);
    
    // Return error
    return NextResponse.json({
      error: "API error",
      message: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
