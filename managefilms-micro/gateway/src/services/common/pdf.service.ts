// import { Injectable } from '@nestjs/common';
// import * as puppeteer from 'puppeteer';

// @Injectable()
// export class PdfService {
//   async generatePdf(html: string): Promise<Buffer> {
//     const browser = await puppeteer.launch({
//       args: [
//         '--no-sandbox',
//         '--disable-setuid-sandbox',
//         '--disable-dev-shm-usage',
//         '--disable-gpu',
//       ],
//       executablePath: '/usr/bin/chromium-browser',
//       // slowMo: 250,
//     });
//     const page = await browser.newPage();
//     console.log('3');
//     await page.setContent(html);
//     const pdf = await page.pdf({ format: 'A4' });
//     await browser.close();
//     return pdf;
//   }
// }
