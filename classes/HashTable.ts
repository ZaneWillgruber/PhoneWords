
export class HashTable {
    private table: Entry[];
    private primeNum: number = 234193;

    constructor() {
        this.table = [];
    }

    public insert(value: string): void {
        const hashAndKey = this.hash(value);
        const entry = new Entry(hashAndKey[0], value);
        const hash = hashAndKey[1];
        if(this.table[hash] === undefined) {
            this.table[hash] = entry;
        } else {
            if(this.table[hash].key == entry.key) {
                this.table[hash].add(entry);
            }
            else {
                this.rehashTable();
                this.insert(value);
            }
        }
    }

    public search(key: number): Entry {
        var hashWord = key.toString();
        var hash = 0;
        
        for (var i = 0; i< hashWord.length; i++) {
            var char = hashWord.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash;
        }

        key = Math.floor(this.primeNum * ((Math.abs(hash) * (Math.sqrt(5) - 1) / 2) % 1));
        return this.table[key];
    }

    private hash(value: string): number[] {
        const letterToNumber = new Map<number, string[]>([
            [2, ['a', 'b', 'c']],
            [3, ['d', 'e', 'f']],
            [4, ['g', 'h', 'i']],
            [5, ['j', 'k', 'l']],
            [6, ['m', 'n', 'o']],
            [7, ['p', 'q', 'r', 's']],
            [8, ['t', 'u', 'v']],
            [9, ['w', 'x', 'y', 'z']]
        ]);

        let hash = 0;

        for(let i = 0; i < value.length; i++) {
            const letter = value[i];
            letterToNumber.forEach((letters, number) => {
                if(letters.includes(letter)) {
                    hash += number * Math.pow(10, value.length - i - 1);
                }
            });
        }

        var secondHash = 0;
        var hashWord = hash.toString();
        for (var i = 0; i< hashWord.length; i++) {
            var char = hashWord.charCodeAt(i);
            secondHash = ((secondHash<<5)-secondHash)+char;
            secondHash = secondHash & secondHash;
        }

        //return[hash, secondHash];

        return [hash, Math.floor(this.primeNum * ((Math.abs(secondHash) * (Math.sqrt(5) - 1) / 2) % 1))];
    }

    private rehashTable(): void {
        console.log("Rehashing table...");
        const oldTable = this.table;
        this.table = [];
        this.primeNum = this.nextPrime(this.primeNum * 2);
        oldTable.forEach(entry => {
            this.insert(entry.value);
            while(entry.next !== null) {
                this.insert(entry.next.value);
                entry = entry.next;
            }
        });
    }

    private isPrime(num: number): boolean {
        if(num < 2) {
            return false;
        }
        for(let i = 2; i < num; i++) {
            if(num % i === 0) {
                return false;
            }
        }

        return true;
    }

    private nextPrime(num: number): number {
        while(!this.isPrime(num)) {
            num++;
        }
        return num;
    }
}

export class Entry {
    key: number;
    value: string;
    next: Entry | null;
    last: Entry | null;

    constructor(key: number, value: string) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.last = null;
    }

    public add(value: Entry): void {
        if(this.next === null) {
            this.next = value;
        } else {
            this.next.add(value);
        }
        this.last = value;
    }
}