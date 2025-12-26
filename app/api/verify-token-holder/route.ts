import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';
import { Connection, PublicKey } from '@solana/web3.js';

const SOLANA_RPC = process.env.NEXT_PUBLIC_SOLANA_RPC || 'https://api.mainnet-beta.solana.com';
const TOKEN_MINT = process.env.NEXT_PUBLIC_TOKEN_MINT || ''; // Your token mint address
const REQUIRED_TOKEN_AMOUNT = parseFloat(process.env.TOKEN_GATE_AMOUNT || '1000'); // Default 1000 tokens

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { walletAddress } = await req.json();

    if (!walletAddress) {
      return NextResponse.json({ error: 'Wallet address required' }, { status: 400 });
    }

    // Validate wallet address format
    let publicKey: PublicKey;
    try {
      publicKey = new PublicKey(walletAddress);
    } catch (error) {
      return NextResponse.json({ error: 'Invalid wallet address' }, { status: 400 });
    }

    // Check token balance
    const connection = new Connection(SOLANA_RPC, 'confirmed');
    
    try {
      // Get token accounts for this wallet
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
        mint: new PublicKey(TOKEN_MINT),
      });

      let totalBalance = 0;
      for (const account of tokenAccounts.value) {
        const balance = account.account.data.parsed.info.tokenAmount.uiAmount;
        totalBalance += balance;
      }

      const hasEnoughTokens = totalBalance >= REQUIRED_TOKEN_AMOUNT;

      // Update user's subscription if they have enough tokens
      if (hasEnoughTokens) {
        const user = await prisma.user.findUnique({
          where: { email: session.user.email },
        });

        if (user) {
          await prisma.subscription.upsert({
            where: { userId: user.id },
            create: {
              userId: user.id,
              status: 'active',
              plan: 'pro',
            },
            update: {
              status: 'active',
              plan: 'pro',
            },
          });
        }
      }

      return NextResponse.json({
        hasEnoughTokens,
        balance: totalBalance,
        required: REQUIRED_TOKEN_AMOUNT,
        isPro: hasEnoughTokens,
      });
    } catch (error) {
      console.error('Error checking token balance:', error);
      return NextResponse.json({ error: 'Failed to check token balance' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in token gate:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
