import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsEmail,
  IsUrl,
  IsArray,
  ValidateNested,
  Min,
  // IsDate,
  ArrayMinSize,
} from 'class-validator';

export class QuotationItemDto {
  @ApiProperty({ example: 'Web Design Service' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Complete redesign of company website' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 'service' })
  @IsString()
  unit: string;

  @ApiProperty({ example: '2500.00' })
  @IsString()
  unitPrice: string;

  @ApiProperty({ example: '2500.00' })
  @IsString()
  amount: string;
}

export class CreateQuotationDto {
  // Company Information
  @ApiProperty({ example: 'Your Company Name' })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiPropertyOptional({ example: 'path/to/logo.png' })
  @IsString()
  @IsOptional()
  companyLogo?: string;

  @ApiProperty({ example: '123 Business Street, City, Country' })
  @IsString()
  @IsNotEmpty()
  companyAddress: string;

  @ApiProperty({ example: '+1-234-567-8900' })
  @IsString()
  @IsNotEmpty()
  companyPhone: string;

  @ApiProperty({ example: 'contact@yourcompany.com' })
  @IsEmail()
  @IsNotEmpty()
  companyEmail: string;

  @ApiPropertyOptional({ example: 'www.yourcompany.com' })
  @IsUrl()
  @IsOptional()
  companyWebsite?: string;

  // Client Information
  @ApiProperty({ example: 'Client Company Name' })
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @ApiProperty({ example: '456 Client Avenue, City, Country' })
  @IsString()
  @IsNotEmpty()
  clientAddress: string;

  @ApiPropertyOptional({ example: '+1-234-567-8901' })
  @IsString()
  @IsOptional()
  clientPhone?: string;

  @ApiPropertyOptional({ example: 'client@clientcompany.com' })
  @IsEmail()
  @IsOptional()
  clientEmail?: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  @IsString()
  @IsOptional()
  clientContactPerson?: string;

  // Quotation Details
  @ApiProperty({ example: 'QT-2025-001' })
  @IsString()
  @IsNotEmpty()
  quotationNumber: string;

  @ApiProperty({ example: 'April 26, 2025' })
  @IsString()
  @IsNotEmpty()
  quotationDate: string;

  @ApiProperty({ example: 'May 26, 2025' })
  @IsString()
  @IsNotEmpty()
  validUntil: string;

  @ApiPropertyOptional({ example: 'Website Redesign Project' })
  @IsString()
  @IsOptional()
  projectName?: string;

  @ApiPropertyOptional({ example: 'REF-001' })
  @IsString()
  @IsOptional()
  referenceNumber?: string;

  // Financial Information
  @ApiProperty({ example: '$' })
  @IsString()
  @IsNotEmpty()
  currency: string;

  @ApiProperty({
    type: [QuotationItemDto],
    example: [
      {
        name: 'Web Design Service',
        description: 'Complete redesign of company website',
        quantity: 1,
        unit: 'service',
        unitPrice: '2500.00',
        amount: '2500.00',
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => QuotationItemDto)
  items: QuotationItemDto[];

  @ApiProperty({ example: '2500.00' })
  @IsString()
  @IsNotEmpty()
  subtotal: string;

  @ApiPropertyOptional({ example: '250.00' })
  @IsString()
  @IsOptional()
  discount?: string;

  @ApiPropertyOptional({ example: 10 })
  @IsNumber()
  @IsOptional()
  taxRate?: number;

  @ApiPropertyOptional({ example: '225.00' })
  @IsString()
  @IsOptional()
  tax?: string;

  @ApiProperty({ example: '2475.00' })
  @IsString()
  @IsNotEmpty()
  total: string;

  // Additional Information
  @ApiPropertyOptional({
    example: 'This quotation is valid for 30 days from the issue date.',
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({
    example: [
      '50% deposit required before work begins.',
      'Remaining payment due upon project completion.',
      'Revisions beyond the scope will incur additional charges.',
      'Client to provide content within 7 days of project start.',
    ],
  })
  @IsArray()
  @IsString({ each: true })
  termsAndConditions: string[];

  @ApiProperty({ example: 'April 26, 2025' })
  @IsString()
  @IsNotEmpty()
  generatedDate: string;

  @ApiPropertyOptional({
    example: 'Please make payments to Account #: 123456789',
  })
  @IsString()
  @IsOptional()
  paymentInstructions?: string;
}
