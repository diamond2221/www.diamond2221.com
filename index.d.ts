// import * as imageConversion from "image-conversion";
declare module "image-conversion" {
    export default class methods {
        static compressAccurately(file: any, config: any): Promise<any>
    }

}

declare module '*.scss' {
    const content: any;
    export default content;
}

declare module '*.less' {
    const content: any;
    export default content;
}
