import one from '../assets/one.png'
import two from '../assets/two.png'
import three from '../assets/three.png'
import four from '../assets/four.png'
import five from '../assets/five.png'
import six from '../assets/six.png'
import seven from '../assets/seven.png'
import eight from '../assets/eight.png'
import flag from '../assets/flag.png'
import mine from '../assets/mine.png'
import noMine from '../assets/no_mine.png'
import notFound from '../assets/not_found.png'
import none from '../assets/none.png'

const images = {
    one: one,
    two: two,
    three: three,
    four: four,
    five: five, 
    six: six,
    seven: seven,
    eight: eight,
    flag: flag,
    mine: mine,
    noMine: noMine,
    none: none,
    notFound: notFound
};

export function loadImage(name) {
    if (images.hasOwnProperty(name)) {
        return images[name];
    }
    return images['notFound'];
}