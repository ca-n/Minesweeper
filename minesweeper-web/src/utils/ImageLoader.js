const images = {
    one: require('../assets/one.png'),
    two: require('../assets/two.png'),
    three: require('../assets/three.png'),
    four: require('../assets/four.png'),
    five: require('../assets/five.png'), 
    six: require('../assets/six.png'),
    seven: require('../assets/seven.png'),
    eight: require('../assets/eight.png'),
    flag: require('../assets/flag.png'),
    mine: require('../assets/mine.png'),
    noMine: require('../assets/no_mine.png'),
    notFount: require('../logo.svg')
};

export function loadImage(name) {
    if (images.hasOwnProperty(name)) {
        return images[name];
    }
    return images['notFound'];
}