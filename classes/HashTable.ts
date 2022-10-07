
export class HashTable {
    private table: Entry[];
    private primeNum: number = 11519;

    constructor() {
        this.table = [];
    }

    public insert(value: string): void {
        const entry = new Entry(value);
        const hash = this.hash(value);
        if(this.table[hash] === undefined) {
            this.table[hash] = entry;
        } else {
            this.table[hash].add(entry);
        }
    }

    public search(key: number): Entry {
        key = Math.floor(this.primeNum * ((key * (Math.sqrt(5) - 1) / 2) % 1));
        return this.table[key];
    }

    private hash(value: string): number {
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

        return Math.floor(this.primeNum * ((hash * (Math.sqrt(5) - 1) / 2) % 1));
    }
}

export class Entry {
    value: string;
    next: Entry | null;

    constructor(value: string) {
        this.value = value;
        this.next = null;
    }

    public add(value: Entry): void {
        if(this.next === null) {
            this.next = value;
        } else {
            this.next.add(value);
        }
    }
}