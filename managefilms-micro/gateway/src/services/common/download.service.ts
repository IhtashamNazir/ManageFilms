import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as fastCsv from 'fast-csv';
import * as xlsx from 'xlsx';

@Injectable()
export class DownloadService {
  convertToCsv(data: any[]) {
    const csvStream = fastCsv.format({ headers: true });
    data.forEach((row) => csvStream.write(row));
    csvStream.end();
    return csvStream;
  }

  convertToXlsx(data: any[]) {
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Data');
    const xlsxBuffer = xlsx.write(workbook, {
      bookType: 'xlsx',
      type: 'buffer',
    });
    return xlsxBuffer;
  }

  validateImportedData(data: any[], expectedKeys: any[]): void {
    if (!data.length) {
      throw new BadRequestException(`Please Input some data to import`);
    }
    const firstItemKeys = Object.keys(data[0]);
    if (!expectedKeys.every((key) => firstItemKeys.includes(key.name))) {
      throw new BadRequestException(
        `Imported data does not match expected keys: ${expectedKeys}`,
      );
    }
    // Add additional validation logic here
    data.forEach((item, index) => {
      expectedKeys.forEach((ek) => {
        if (ek.type === 'string') {
          if (!item[ek.name] || item[ek.name].trim() === '') {
            throw new BadRequestException(
              `${ek.name} is missing or empty at row ${index + 2}`,
            );
          }
        } else if (ek.type === 'number') {
          if (!item[ek.name] || isNaN(item[ek.name])) {
            throw new BadRequestException(
              `${ek.name} is missing or invalid at row ${index + 2}`,
            );
          }
        }
      });
    });
  }

  importData(file: Express.Multer.File, fileType: string, expectedKeys: any[]) {
    if (fileType === 'xls' || fileType === 'xlsx') {
      const workbook = xlsx.read(file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(worksheet);
      this.validateImportedData(data, expectedKeys);
      return data;
    } else if (fileType === 'csv') {
      const data = file.buffer
        .toString('utf-8')
        .split('\n')
        .map((row) => {
          const [name, age] = row.split(',');
          return { name, age: parseInt(age) };
        });
      this.validateImportedData(data, expectedKeys);
      return data;
    } else {
      throw new BadRequestException(`Unsupported file type: ${fileType}`);
    }
  }
}
