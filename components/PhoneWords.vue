<template>
    <div style="text-align: center;">
        <p>Number is: {{ number }}</p>
        <input v-on:input="findWords" v-model="number" placeholder="(000) 000-000" @input="acceptNumber" />
        <button @click="showNumber = !showNumber"> Submit </button>
        <br>
        <p style="color:red" v-if="number.length != 14">Must be a valid phone number</p>
        <p v-if="showNumber">{{ number }}</p>
        <p> {{ words }}</p>
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
                var num = this.number.replace(/\D/g, '');
                //this.words = this.hashTable.search(num);

                //first seartch for 10 digit words
                var tempList = [];
                var temp = this.hashTable.search(num);
                do {
                    tempList.push(temp.value.toString());
                    if (temp.next != null) {
                        temp = temp.next;
                    }
                }
                while (temp.next != null);
                wordList.set(10, tempList);

                this.words = wordList;

            }
            else {
                this.words = "";
            }
            //this.words = this.number;
            //this.words = this.hashTable.search(this.number);
        }
    },
    data: () => ({
        number: '',
        showNumber: false,
        words: '',
    }),
}
</script>

<style lang="">
    
</style>