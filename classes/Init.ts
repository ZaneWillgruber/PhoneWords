import { HashTable } from '@/classes/HashTable';
export class Init {
    public static init(): void {


        const hashTable = new HashTable();
        const fs = require('fs');
        const dir = '@/words/';

        fs.readdir(dir, (err: any, files: any) => {
            files.forEach((file: any) => {
                fs.readFile(dir + file, 'utf8', (err: any, data: string) => {
                    const words = data.split('\n');
                    words.forEach((word: string) => {
                        hashTable.insert(word);
                    });
                });
            }
                , (err: any, data: any) => { });
        });

        console.log(hashTable);
    }
}