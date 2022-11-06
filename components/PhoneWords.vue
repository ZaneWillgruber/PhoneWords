<template>
    <div style="text-align: center;">
        <p>Number is: {{ number }}</p>
        <input v-on:input="findWords" v-model="number" placeholder="(000) 000-000" @input="acceptNumber" />
        <br>
        <p style="color:red" v-if="number.length != 14">Must be a valid phone number</p>
        <p v-if="showNumber">{{ number }}</p>
        <p> {{ words }}</p>
        <div v-for="word in words" :key="word">
            {{ word }}
        </div>

    </div>
</template>

<script>

export default {
    props: {
        hashTable: {
            type: Object,
        }
    },
    methods: {
        acceptNumber() {
            var x = this.number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            this.number = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        },
        findWords() {
            const wordList = new Map([
                [10, []],
                [7, []],
                [4, []],
                [3, []]
            ]);
            if (this.number.length == 14) {
                var tempList = [];
                wordList.forEach((value, key) => {
                    var num = this.number.replace(/\D/g, '');
                    var numSubString = key == 3 ? num.toString().substring(3, 6) : num.toString().substring(0 + (num.length - key), num.length);
                    console.log(numSubString);
                    console.log(parseInt(numSubString));

                    
                    var temp = this.hashTable.search(parseInt(numSubString));
                    if (temp != null) {
                        do {
                            tempList.push(temp.value.toString());
                            temp = temp.next;
                        }
                        while (temp != null);
                        wordList.set(key, tempList);
                    }
                    
                });

                
                this.words = tempList;

            }
            else if (this.number.length < 14) {
                this.words = '';
            }
            //this.words = this.number;
            //this.words = this.hashTable.search(this.number);
        }
    },
    data: () => ({
        number: '',
        showNumber: false,
        words: '',
        words10: [],
    }),
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap');

    :root {
        font-family: 'Didact Gothic', sans-serif;
    }

    input {
        font-size: xx-large;
        text-align: center;
    }
</style>