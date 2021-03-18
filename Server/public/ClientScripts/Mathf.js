class Mathf {
    static getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

     static easeOutQuint(x) {
        return 1 - Math.pow(1 - x, 5);

    }
}
