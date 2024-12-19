import path from 'path';

const validateCSVFileType = (filePath) => {
  const fileExtension = path.extname(filePath).toLowerCase();

  if (fileExtension !== '.csv') {
    let msg = "Invalid file type. Please upload a valid CSV file";
    console.log(msg);
    return new ApiError(500, msg);
  }
};

export { validateCSVFileType };
