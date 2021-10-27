import { useEffect, useState } from "react";
// import {Project} from 'screens/project-list/list'

export const isFalsy = (value: unknown): boolean => (value === 0 ? false : !value);

export const isVoid = (value:unknown): boolean => value === undefined || value === null || value === ''

// 不改变函数本身
export const cleanObject = (object: {[key: string]: unknown}) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
      const value = result[key]
      if(isVoid(value)) {
          delete result[key]
      }
  })
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // 依赖项加上callback会造成无限循环
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setdebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setdebouncedValue(value), delay);
    // TODO  每次在上一次useEffect处理完以后再运行  这和useCallback和useMemo有关系
    return () => clearTimeout(timeout);
  }, [value, delay]); 
  return debouncedValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};
