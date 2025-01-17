import { getExtension } from '../../utils/pathParser';
import {
  ConverterEngine,
  SlideInfo,
  OutputNaming,
} from '../../@types/converter';
import PdfConverter from './PdfConverter';

class Converter {
  private inputPath: string;
  private outputPath: string;
  private outputNaming: OutputNaming;
  public engine: ConverterEngine;
  public isStop: Boolean;

  constructor(
    inputPath: string,
    outputPath: string,
    outputNaming: OutputNaming,
  ) {
    this.inputPath = inputPath;
    this.outputPath = outputPath;
    this.outputNaming = outputNaming;
    this.isStop = false;
  }

  async init() {
    const fileExtension = getExtension(this.inputPath).toLowerCase();

    if (fileExtension === 'pdf') {
      this.engine = new PdfConverter(
        this.inputPath,
        this.outputPath,
        this.outputNaming,
      );
    }

    try {
      await this.engine.init();
    } catch (err) {
      this.logError(err);
    }
  }

  async convert(): Promise<SlideInfo[]> {
    try {
      const slideInfos: SlideInfo[] = await this.engine.convert();

      return slideInfos;
    } catch (err) {
      this.logError(err);
    }
  }

  async stop(clearOutput?: boolean): Promise<void> {
    return this.engine.stop(clearOutput);
  }

  async clear(): Promise<void> {
    return this.engine.clear();
  }

  async clearInput(): Promise<void> {
    return this.engine.clearInput();
  }

  async clearOutput(): Promise<void> {
    return this.engine.clearOutput();
  }

  private logError(err) {
    console.error(`[Converter Error] ${err.message}`);
  }
}

export default Converter;
