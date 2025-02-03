export interface IFileItem {
  category: string,
  value: number
}

export interface IFile {
  dateLoad: Date,
  file: IFileItem[],
  nameFile: string
}

export interface IFiles {
  files: IFile[]
}
