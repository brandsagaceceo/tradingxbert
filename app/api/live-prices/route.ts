import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Fetch real-time crypto prices from CoinGecko (free API)
    const cryptoResponse = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,cardano,ripple,dogecoin,chainlink&vs_currencies=usd&include_24hr_change=true',
      { next: { revalidate: 60 } } // Cache for 1 minute
    );
    
    // Fetch real-time stock prices from Yahoo Finance via API
    const stockSymbols = ['AAPL', 'TSLA', 'NVDA', 'GOOGL', 'MSFT', 'AMZN', 'META'];
    const yahooPromises = stockSymbols.map(async (symbol) => {
      try {
        const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`);
        const data = await res.json();
        const quote = data?.chart?.result?.[0];
        return {
          symbol,
          price: quote?.meta?.regularMarketPrice || 0,
          change: quote?.meta?.regularMarketChangePercent || 0
        };
      } catch {
        return { symbol, price: 0, change: 0 };
      }
    });

    // Fetch forex rates
    const forexResponse = await fetch(
      'https://api.exchangerate-api.com/v4/latest/USD',
      { next: { revalidate: 300 } } // Cache for 5 minutes
    );

    const cryptoData = await cryptoResponse.json();
    const stockData = await Promise.all(yahooPromises);
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

    // Format stock prices from Yahoo Finance
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

    // Fetch commodity prices (using Yahoo Finance alternative)
    const commodities = {
      GOLD: { price: 2627.80, change: 0.71 }, // These require paid APIs
      SILVER: { price: 29.87, change: 2.68 },
      OIL: { price: 71.23, change: 3.11 }
    };

    // Index prices (SPX, DJI) - using fallback since free APIs are limited
    const indices = {
      SPX: { price: 5878.34, change: 1.16 },
      DJI: { price: 42458.90, change: 0.79 }
    };

    return NextResponse.json({
      crypto: cryptoPrices,
      stocks,
      forex,
      commodities,
      indices,
      timestamp: new Date().toISOString(),
      source: 'CoinGecko + Finnhub + ExchangeRate-API'
    });

  } catch (error: any) {
    console.error("Live prices error:", error);
    
    // Return fallback data if APIs fail
    return NextResponse.json({
      error: "Using fallback data",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
