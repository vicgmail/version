import { Injectable } from '@nestjs/common';
import { VercelService } from './vercel.service';

@Injectable()
export class DeploymentService {
  constructor(private readonly vercelService: VercelService) {}

  public async deployFront() {
    await this.vercelService.deploy();
  }
}
