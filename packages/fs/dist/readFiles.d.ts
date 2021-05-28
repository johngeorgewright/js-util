/// <reference types="node" />
export interface ReadFilesOptions {
    encoding?: BufferEncoding;
    filter?(filename: string): boolean;
    recursive?: boolean;
}
export default function readFiles(dirname: string, options: ReadFilesOptions & {
    encoding: BufferEncoding;
}): AsyncGenerator<string, void>;
export default function readFiles(dirname: string, options?: Omit<ReadFilesOptions, 'encoding'>): AsyncGenerator<Buffer, void>;
