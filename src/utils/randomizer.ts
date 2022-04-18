import {
  faBug,
  faFutbol,
  faCar,
  faSnowflake,
  faLiraSign,
  faMoon,
  faHand,
  faSun,
  faFlask,
  faAnchor,
  faShip,
  faShirt,
  faStar,
  faTrophy,
  faEarth,
  faVirus,
  faSyringe,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";

export const generateRandomNumbers = (numberToGenerate: number) => {
  let arr = [];
  while (arr.length < numberToGenerate) {
    let r = Math.floor(Math.random() * 99) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
};

export const getShuffledIcons = (grid: number) => {
  const numberOfIconsRequired = (grid * grid) / 2;
  const icons = [
    faBug,
    faFutbol,
    faCar,
    faSnowflake,
    faLiraSign,
    faMoon,
    faHand,
    faSun,
    faFlask,
    faAnchor,
    faShip,
    faShirt,
    faStar,
    faTrophy,
    faEarth,
    faVirus,
    faSyringe,
    faPlane,
  ];
  const selectedIcons = icons.slice(0, numberOfIconsRequired);

  return arrayShuffler([...selectedIcons, ...selectedIcons]);
};

export const arrayShuffler = (array: any) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
