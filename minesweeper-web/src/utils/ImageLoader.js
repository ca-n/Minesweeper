const images = {
    mine: require('../logo.svg'),
    flag: require('../logo.svg'),
    flaggedMine: require('../logo.svg'),
    notFount: require('../logo.svg')
};

export function loadImage(name) {
    if (images.hasOwnProperty(name)) {
        return images[name];
    }
    return images['notFound'];
}