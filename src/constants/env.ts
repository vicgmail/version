export enum ENV {
  DEVELOPMENT = 'dev',
  PRODUCTION = 'production',
}

export const NODE_ENV: ENV = (process.env.NODE_ENV as ENV) || ENV.DEVELOPMENT;

export const DEPLOYMENT_TIME_MS = 1000 * 60 * 10; // 10min is time needed to redeploy ui front builds
