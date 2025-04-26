import { Controller, Post, Body, Res, HttpStatus, Get } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { QuotationService } from './quotation.service';

@ApiTags('Quotation')
@Controller('quotation')
export class QuotationController {
  constructor(private readonly quotationService: QuotationService) {}

  @Post('generate-pdf')
  @ApiOperation({ summary: 'Generate a PDF quotation' })
  @ApiCreatedResponse({
    description: 'PDF quotation generated successfully',
  })
  async generatePdf(
    @Body() createQuotationDto: CreateQuotationDto,
    @Res() res: Response,
  ) {
    // If empty body is provided, use default data
    const data =
      Object.keys(createQuotationDto).length === 0
        ? this.quotationService.getDefaultData()
        : createQuotationDto;

    const pdf = await this.quotationService.generatePdf(data);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="quotation-${data.quotationNumber}.pdf"`,
      'Content-Length': pdf.length,
    });

    res.end(pdf);
  }

  @Get('default-data')
  @ApiOperation({ summary: 'Get default quotation data for testing' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Default data retrieved successfully',
    type: CreateQuotationDto,
  })
  getDefaultData() {
    return this.quotationService.getDefaultData();
  }
}
