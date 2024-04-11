import { join } from 'path';
import { randomInt } from 'crypto';
import { unlinkSync } from 'fs';
import { sign } from 'jsonwebtoken';
import { errorLogging } from '@config/logger';

export const generateSixDigitOtp = () =>
    Math.floor(100000 + Math.random() * 900000);

export const isoFormattedDateTimeIncrease = (date, seconds: number) => {
    const newDate = new Date(date);
    return new Date(newDate.getTime() + seconds * 1000);
};

export const isNumber = (data: any, returnNumber = 1): number => {
    return data !== undefined && typeof +data === 'number' && !Number.isNaN(+data)
        ? +data
        : returnNumber
            ? returnNumber
            : 1;
};

export const capitalizeFirstLetter = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

// export const optimizeUploadedImage = async (file: any) => {
//     const uploadPath = join(process.cwd(), '/public/users/profile');
//     const fileNewName = `${randomInt(0, 100000000000000)}_${file.originalname}`;
//     const newFilePath = join(uploadPath, fileNewName);
//     const imageSize = file.size / (1024 * 1024);
//     const quality =
//         imageSize > 3 ? 40 : imageSize > 2 ? 60 : imageSize > 1 ? 70 : 80;
//     if (fileNewName.endsWith('jpeg') || fileNewName.endsWith('jpg'))
//         await sharp(file.path)
//             .rotate()
//             .resize()
//             .jpeg({ quality })
//             .toFile(newFilePath);
//     else
//         await sharp(file.path)
//             .rotate()
//             .resize()
//             .png({ quality })
//             .toFile(newFilePath);

//     unlinkSync(file.path);

//     const image = `/users/profile/${fileNewName}`;

//     return image;
// };


export const generateReferCode = () => {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let referCode = '';
    let runLoop = true;
    while (runLoop) {
        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            referCode += characters.charAt(randomIndex);
        }
        // const user = User.findOne({ referral_code: referCode });
        const user = false;

        if (user) runLoop = false;
    }

    return referCode;
};

export const generateAuthToken = (id: string): string => {
    try {
        const token = sign({ _id: id }, process.env.JWT_SECRET as string);
        return token;
    } catch (error) {
        errorLogging(error);
    }
};

export const generateSlug = (name: string): string => {
    const lowerCase = name.toLowerCase().trim();
    const removedSpecialCharacter = lowerCase.replace(
        /[&\/\\#,+()$~%.'":*?<>{}]/g,
        '',
    );
    const removedMultipleSpaces: string = removedSpecialCharacter.replace(
        /\s\s+/g,
        ' ',
    );
    const replacedSpacesWithUnderscore = removedMultipleSpaces.replace(/ /g, '_');
    return replacedSpacesWithUnderscore;
};
