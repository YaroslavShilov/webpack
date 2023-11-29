declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
// declare function require(name: string);

declare module '*.module.scss' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare const PLATFORM: 'mobile' | 'desktop';
