import createError from 'http-errors';

export default (_req: any, _res: any, next: any) => {
  next(createError(404));
};
