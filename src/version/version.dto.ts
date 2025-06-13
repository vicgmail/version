export type CreateVersionDto = {
  major: number;
  minor: number;
  build: number;
};

export type UpdateVersionDto = {
  inProgress: boolean;
};
