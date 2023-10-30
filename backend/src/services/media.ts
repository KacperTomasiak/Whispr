import * as fs from "fs";

const createMediaFolder = (): void => {
  const directory: string = "./media";
  let exists: boolean = fs.existsSync(directory);
  if (!exists) {
    fs.mkdir(directory, (err): void => {
      if (err) throw err;
    });
  }
};

const createPersonalFolder = (privateKey: string): void => {
  const directory: string = `./media/${privateKey}`;
  fs.mkdir(directory, (err): void => {
    if (err) throw err;
  });
};

const deletePersonalFolder = (privateKey: string): void => {
  const directory: string = `./media/${privateKey}`;
  fs.rm(directory, { recursive: true, force: true }, (err): void => {
    if (err) throw err;
  });
};

const createMessageFolder = (privateKey: string, id: number): void => {
  const directory: string = `./media/${privateKey}/${id}`;
  fs.mkdir(directory, (err): void => {
    if (err) throw err;
  });
};

const deleteMessageFolder = (privateKey: string, id: number): void => {
  const directory: string = `./media/${privateKey}/${id}`;
  fs.rm(directory, { recursive: true, force: true }, (err): void => {
    if (err) throw err;
  });
};

const readAndMoveFile = (privateKey: string, id: number, file: any): void => {
  const directory: string = `./media/${privateKey}/${id}/${file.name}`;
  fs.readFile(file.tempFilePath, (err, data): void => {
    fs.writeFile(directory, data, (err) => {
      console.log("File successfully moved");
    });
  });
};

export {
  createMediaFolder,
  createPersonalFolder,
  deletePersonalFolder,
  createMessageFolder,
  deleteMessageFolder,
  readAndMoveFile,
};
