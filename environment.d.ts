declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
// declare function require(name: string);

declare module '*.module.scss' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      REACT_APP_KEY: string;
    }
  }
}

export {};
