export class CommonServices {
  private readonly allowedImageTypesForProfilePicture = ['png', 'jpg', 'jpeg'];
  private readonly allowedTypesForExcelImport = [
    'xls',
    'xlsx',
    'csv',
    'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];
  private readonly allowedTypesForVideo = ['mp4'];

  profilePictureMimetype(mimetype: string) {
    const type = mimetype.split('/').at(-1);
    return this.allowedImageTypesForProfilePicture.includes(type);
  }
  importExcelMimeType(mimetype: string) {
    const type = mimetype.split('/').at(-1);
    return this.allowedTypesForExcelImport.includes(type);
  }

  videoMimeType(mimetype: string) {
    const type = mimetype.split('/').at(-1);
    return this.allowedTypesForVideo.includes(type);
  }

  checkExtension(filename: string) {
    const splitName = filename.split('.');
    if (splitName.length > 1) {
      return {
        status: true,
        extension: splitName.at(-1),
      };
    }
    return {
      status: false,
      extension: 'null',
    };
  }

  checkExcelExtension(filename: string, mimetype: string) {
    const splitName = filename.split('.');
    if (splitName.length > 1) {
      return {
        status: this.importExcelMimeType(mimetype),
        extension: splitName.at(-1),
      };
    }
    return {
      status: false,
      extension: 'null',
    };
  }

  checkVideoExtension(filename: string, mimetype: string) {
    const splitName = filename.split('.');
    if (splitName.length > 1) {
      return {
        status: this.videoMimeType(mimetype),
        extension: splitName.at(-1),
      };
    }
    return {
      status: false,
      extension: 'null',
    };
  }

  checkFileName(filename: string) {
    const splitName = filename.split('.');
    if (splitName.length > 1) {
      splitName.pop();
      return {
        status: true,
        filename: splitName.join(''),
      };
    }
    return {
      status: false,
      filename: 'null',
    };
  }
}
