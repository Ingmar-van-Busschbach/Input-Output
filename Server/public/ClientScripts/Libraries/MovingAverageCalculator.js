class MovingAverageCalculator {
    constructor() {
        this._length = 10; // length of moving average
        this._average = 0;
        this.array = new Array(this._length).fill(0); //movingAverage memory

        this.lastMean = 0;
    }
    update(newValue) {
        this.array.pop();//remove the last value
        this.array.unshift(newValue);//add new value to start
    }
    get mean() {
        this.validate();
        this.lastMean = this.array.reduce((a,b) => a + b, 0)/this._length;
        return this.lastMean;

    }
    validate() {
        if (this.array.length === 0) {
            throw new Error('average is undefined')
        }
    }
}
