# ☕ CELO Coffee Payment Tracker

A serverless application that tracks CELO payments on the Alfajores testnet, built with Vercel serverless functions.

## Features

- 🔍 Real-time payment monitoring on CELO Alfajores testnet
- 📊 Payment history display with transaction details
- 🚀 Serverless deployment on Vercel
- 📱 Responsive web interface

## Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/celo-coffee)

## Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/celo-coffee.git
   cd celo-coffee
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Vercel CLI** (if not already installed)
   ```bash
   npm i -g vercel
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Configuration

### Environment Variables

Copy `env.example` to `.env.local` and configure:

```bash
cp env.example .env.local
```

Key variables:
- `CELO_RPC_URL`: CELO testnet RPC endpoint
- `RECEIVER_ADDRESS`: Your CELO address to monitor
- `MIN_AMOUNT_CELO`: Minimum payment amount to track

### Updating Receiver Address

Edit `api/check-payment.js` and update:
```javascript
const RECEIVER_ADDRESS = "your_celo_address_here";
```

## Deployment

### Deploy to Vercel

1. **Login to Vercel**
   ```bash
   vercel login
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

### Manual Deployment via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables if needed
5. Deploy!

## API Endpoints

- `GET /` - Main payment history page
- `GET /api/check-payment` - Check for new payments (returns JSON)

## How It Works

1. **Payment Detection**: Scans recent CELO blocks for transactions to your address
2. **Validation**: Ensures minimum payment amount is met
3. **Storage**: Maintains payment history in memory (resets on deployment)
4. **Display**: Shows payment history in a clean table format

## Tech Stack

- **Runtime**: Node.js 18.x
- **Blockchain**: CELO Alfajores Testnet
- **Web3**: Web3.js v4
- **Deployment**: Vercel Serverless Functions
- **Frontend**: Vanilla HTML/CSS/JS

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Create an issue on GitHub
- Check Vercel documentation for deployment issues
- CELO documentation for blockchain integration

---

**Note**: This app is configured for CELO Alfajores testnet. For mainnet deployment, update the RPC URL and ensure proper security measures.
