import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import { CreateQuotationDto } from './dto/create-quotation.dto';

@Injectable()
export class QuotationService {
  private readonly templatePath = 'src/templates/quotation.hbs';
  private template: HandlebarsTemplateDelegate;

  constructor() {
    // Load and compile the Handlebars template on service initialization
    const templateSource = fs.readFileSync(this.templatePath, 'utf8');
    this.template = Handlebars.compile(templateSource);
  }

  async generatePdf(createQuotationDto: CreateQuotationDto): Promise<any> {
    console.log('companyLogo: ', createQuotationDto.companyLogo);
    // Render the HTML content using Handlebars
    const htmlContent = this.template(createQuotationDto);

    // Launch Puppeteer and generate PDF
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
    });
    // {
    //   headless: 'new',
    //   args: ['--no-sandbox', '--disable-setuid-sandbox']
    // });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm',
      },
    });

    await browser.close();
    return pdfBuffer;
  }

  // Helper method to get default data for testing
  getDefaultData(): CreateQuotationDto {
    const today = new Date();
    const validUntil = new Date();
    validUntil.setDate(today.getDate() + 30);

    const todayStr = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const validUntilStr = validUntil.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return {
      companyName: 'Acme Corporation',
      companyLogo: 'acme-corporation-logo.png',
      companyAddress: '123 Business Avenue, Tech City, TC 12345',
      companyPhone: '+1-555-123-4567',
      companyEmail: 'contact@acmecorp.com',
      companyWebsite: 'www.acmecorp.com',

      clientName: 'Client Company Ltd.',
      clientAddress: '456 Customer Street, Business Park, BP 67890',
      clientPhone: '+1-555-987-6543',
      clientEmail: 'info@clientcompany.com',
      clientContactPerson: 'Jane Smith',

      quotationNumber: `QT-${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`,
      quotationDate: todayStr,
      validUntil: validUntilStr,
      projectName: 'Website Development Project',
      referenceNumber: 'REF-2025-001',

      currency: '$',
      items: [
        {
          name: 'Website Design',
          description: 'Custom website design including UI/UX',
          quantity: 1,
          unit: 'service',
          unitPrice: '2,500.00',
          amount: '2,500.00',
        },
        {
          name: 'Frontend Development',
          description: 'Responsive HTML/CSS/JS implementation',
          quantity: 1,
          unit: 'service',
          unitPrice: '3,500.00',
          amount: '3,500.00',
        },
        {
          name: 'Backend Development',
          description: 'API development and database integration',
          quantity: 1,
          unit: 'service',
          unitPrice: '4,000.00',
          amount: '4,000.00',
        },
      ],

      subtotal: '10,000.00',
      discount: '500.00',
      taxRate: 10,
      tax: '950.00',
      total: '10,450.00',

      notes:
        'This quotation includes three rounds of revisions for the design phase. Additional revisions will be billed separately.',

      termsAndConditions: [
        '50% deposit required before work begins.',
        'Remaining payment due upon project completion.',
        'The project timeline is estimated at 8 weeks from start date.',
        'Client to provide all necessary content within the first 2 weeks.',
        'This quotation is valid for 30 days from the issue date.',
      ],

      generatedDate: todayStr,
      paymentInstructions:
        'Please make payments to Bank Account #: ACME-12345678',
    };
  }
}
