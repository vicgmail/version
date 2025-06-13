import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class VercelService {
  public async deploy() {
    if (!process.env.VERCEL_DEPLOYMENT_URL) {
      return;
    }

    console.log('Run deployment process on vercel');

    try {
      await axios.post(
        process.env.VERCEL_DEPLOYMENT_URL,
        {
          name: process.env.VERCEL_DEPLOYMENT_PROJECT_NAME,
          gitSource: {
            type: 'github',
            repoId: process.env.VERCEL_DEPLOYMENT_REPO_ID,
            ref: process.env.VERCEL_DEPLOYMENT_BRANCH,
          },
          target: 'production',
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.VERCEL_DEPLOYMENT_TOKEN}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(
        'Runing was finished successfully, after some minutes you will have a new build.',
      );
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.error('Deployment status error:', error.status);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.error('Deployment data error:', error.response.data);
    }
  }
}
