export enum ENV {
  DEVELOPMENT = 'dev',
  PRODUCTION = 'production',
}

export const NODE_ENV = process.env.NODE_ENV || ENV.DEVELOPMENT;
