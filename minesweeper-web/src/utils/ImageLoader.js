const images = {
    mine: require('path_to_mine_image.png'),
    flag: require('path_to_flag_image.png'),
    flaggedMine: require('wjateven'),
    notFount: require('askdlkads')
};

export function loadImage(name) {
    if (images.hasOwnProperty(name)) {
        return images[name];
    }
    return images['notFound'];
}