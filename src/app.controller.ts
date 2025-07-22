import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Health Check')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({
    status: 200,
    description: 'API is running successfully',
    schema: {
      example: {
        success: true,
        data: {
          message: 'Taxificant API is running!',
          timestamp: '2025-01-11T10:30:00.000Z',
          version: '1.0.0',
        },
        meta: {},
      },
    },
  })
  getHello(): object {
    return this.appService.getHello();
  }

  @Get('health')
  @ApiOperation({ summary: 'Detailed health check' })
  @ApiResponse({ status: 200, description: 'Detailed health information' })
  getHealth(): object {
    return this.appService.getHealth();
  }
}