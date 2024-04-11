import dayjs from 'dayjs';
import { createWriteStream } from 'fs';
import { format } from 'util';

const logFileCreator = (filename: string, ...data) => {
  const currentDate = dayjs().format('DD_MM_YYYY');

  const file = createWriteStream(
    `${__dirname}/../logs/${filename}_${currentDate}.log`,
    {
      flags: 'a+',
    },
  );

  file.write(`${dayjs().format('HH:mm:ss')} ${format(...data)}\n`);
};

export const errorLogging = (...data) => logFileCreator('error', ...data);

export const firebaseLogging = (...data) => logFileCreator('firebase', ...data);
