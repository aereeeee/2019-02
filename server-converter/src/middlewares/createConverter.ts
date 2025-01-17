import * as path from 'path';
import { Converter } from '../core';
import { RequestHandler, OutputNaming } from '../@types';

const creaveConverter: RequestHandler = (req, res, next) => {
  req.stage = { stage: 'beforeConvert', next: false };
  const { channelId } = req.params;
  const naming: OutputNaming = (page: number) => `${channelId}_${page}`;
  const inputPath = req.file.path;
  const outputPath = path.resolve(__dirname, '../../tmpFiles');
  const converter = new Converter(inputPath, outputPath, naming);

  req.converter = converter;
  next();
};

export default creaveConverter;
