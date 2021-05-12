import { FormatData, ITreeDataBase } from '../types/type';

export const getSource = (data: FormatData[]): ITreeDataBase[] => data.map(({ _source }) => {
  return _source;
})