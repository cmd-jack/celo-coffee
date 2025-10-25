import { paymentHistory } from "./check-payment.js";

export default function handler(req, res) {
  const html = `
  <html>
  <head>
    <title>☕ CELO Coffee Payments</title>
    <style>
      body { font-family: Arial; text-align:center; background:#f5f5f5; }
      h2 { color:#333; margin-top: 30px; }
      table { margin:auto; border-collapse: collapse; width:80%; background:white; }
      th, td { padding:10px; border:1px solid #ddd; }
      th { background:#222; color:white; }
      tr:nth-child(even){ background:#f2f2f2; }
      .footer { margin-top:20px; color:#666; font-size:14px; }
    </style>
  </head>
  <body>
    <h2>☕ CELO Coffee Payment History (Alfajores Testnet)</h2>
    <table>
      <tr><th>#</th><th>From</th><th>Amount (CELO)</th><th>Tx</th><th>Time</th></tr>
      ${
        paymentHistory.length === 0
          ? `<tr><td colspan="5">No payments yet</td></tr>`
          : paymentHistory
              .map(
                (p, i) => `
            <tr>
              <td>${i + 1}</td>
              <td>${p.from}</td>
              <td>${p.amount}</td>
              <td><a href="https://explorer.celo.org/alfajores/tx/${p.hash}" target="_blank">View</a></td>
              <td>${p.time}</td>
            </tr>`
              )
              .join("")
      }
    </table>
    <div class="footer">Powered by CELO Testnet + Vercel</div>
  </body>
  </html>`;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
