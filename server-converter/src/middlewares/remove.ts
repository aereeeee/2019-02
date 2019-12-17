import { RequestHandler } from '../@types';

const removeMiddleware: RequestHandler = (req: any, res, next) => {
  req.stage = { stage: 'remove', next: true };
  req.converter.clear()
    .then(() => { next(); })
    .catch((err) => { next(err); });
};

export default removeMiddleware;
