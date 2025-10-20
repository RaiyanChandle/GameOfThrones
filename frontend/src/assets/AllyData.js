import Cersei from "./characterImages/Cersei.png";
import Jamie from "./characterImages/Kingslayer.png";
import Arya from "./characterImages/Arya.jpg";
import Sansa from "./characterImages/Sansa.jpg";
import Jon from "./characterImages/John.jpg";
import Tyrion from "./characterImages/Tyrion.jpg";
import Danerys from "./characterImages/Danerys.jpg";
import Stannis from "./characterImages/stannis.png";
import Renly from "./characterImages/Renly.png";
import Davos from "./characterImages/serDavos.png";


const AllyData = [
  {
    name: "Arya Stark",
    house: "Stark",
    quote: "Winter is Coming",
    image: Arya,
    cost: 10,
    positive: {
      power: 2.5,
      loyalty: 2.0,
    },
    negative: {
      diplomacy: -1.0,
    },
  },
  {
    name: "Jon Snow",
    house: "Stark",
    quote: "Winter is Coming",
    image: Jon,
    cost: 15,
    positive: {
      honor: 3.0,
      loyalty: 2.5,
    },
    negative: {
      wealth: -1.0,
    },
  },
  {
    name: "Daenerys Targaryen",
    house: "Targaryen",
    quote: "Winter is Coming",
    image: Danerys,
    cost: 18,
    positive: {
      power: 3.0,
      honor: 2.0,
    },
    negative: {
      stability: -1.1,
    },
  },
  {
    name: "Sansa Stark",
    house: "Stark",
    quote: "Winter is Coming",
    image: Sansa,
    cost: 9,
    positive: {
      diplomacy: 2.5,
      stability: 2.0,
    },
    negative: {
      power: -1.2,
    },
  },
  {
    name: "Tyrion Lannister",
    house: "Lannister",
    quote: "Winter is Coming",
    image: Tyrion,
    cost: 14,
    positive: {
      diplomacy: 3.0,
      intellect: 2.5,
    },
    negative: {
      honor: -1.2,
    },
  },
  {
    name: "Cersei Lannister",
    house: "Lannister",
    quote: "Winter is Coming",
    image: Cersei,
    cost: 20,
    positive: {
      wealth: 3.0,
      power: 2.5,
    },
    negative: {
      betrayal: 3.0,
    },
  },
  {
    name: "Jaime Lannister",
    house: "Lannister",
    quote: "Winter is Coming",
    image: Jamie,
    cost: 13,
    positive: {
      power: 2.5,
      honor: 2.0,
    },
    negative: {
      stability: -1.1,
    },
  },
  {
    name: "Stannis Baratheon",
    house: "Baratheon",
    quote: "Winter is Coming",
    image: Stannis,
    cost: 11,
    positive: {
      honor: 2.5,
      stability: 2.0,
    },
    negative: {
      diplomacy: -1.0,
    },
  },
  {
    name: "Renly Baratheon",
    house: "Baratheon",
    quote: "Winter is Coming",
    image: Renly,
    cost: 10,
    positive: {
      diplomacy: 2.5,
      wealth: 2.0,
    },
    negative: {
      stability: -1.1,
    },
  },
  {
    name: "Davos Seaworth",
    house: "Baratheon",
    quote: "Winter is Coming",
    image: Davos,
    cost: 8,
    positive: {
      loyalty: 3.0,
      honor: 2.5,
    },
    negative: {
      wealth: -1.0,
    },
  },
  // --- duplicates start here ---
  {
    name: "Arya Stark",
    house: "Stark",
    quote: "Winter is Coming",
    image: Arya,
    cost: 10,
    positive: {
      power: 2.5,
      loyalty: 2.0,
    },
    negative: {
      diplomacy: -1.0,
    },
  },
  {
    name: "Jon Snow",
    house: "Stark",
    quote: "Winter is Coming",
    image: Jon,
    cost: 15,
    positive: {
      honor: 3.0,
      loyalty: 2.5,
    },
    negative: {
      wealth: -1.0,
    },
  },
  {
    name: "Daenerys Targaryen",
    house: "Targaryen",
    quote: "Winter is Coming",
    image: Danerys,
    cost: 18,
    positive: {
      power: 3.0,
      honor: 2.0,
    },
    negative: {
      stability: -1.1,
    },
  },
  {
    name: "Sansa Stark",
    house: "Stark",
    quote: "Winter is Coming",
    image: Sansa,
    cost: 9,
    positive: {
      diplomacy: 2.5,
      stability: 2.0,
    },
    negative: {
      power: -1.2,
    },
  },
  {
    name: "Tyrion Lannister",
    house: "Lannister",
    quote: "Winter is Coming",
    image: Tyrion,
    cost: 14,
    positive: {
      diplomacy: 3.0,
      intellect: 2.5,
    },
    negative: {
      honor: -1.2,
    },
  },
  {
    name: "Cersei Lannister",
    house: "Lannister",
    quote: "Winter is Coming",
    image: Cersei,
    cost: 20,
    positive: {
      wealth: 3.0,
      power: 2.5,
    },
    negative: {
      betrayal: 3.0,
    },
  },
  {
    name: "Jaime Lannister",
    house: "Lannister",
    quote: "Winter is Coming",
    image: Jamie,
    cost: 13,
    positive: {
      power: 2.5,
      honor: 2.0,
    },
    negative: {
      stability: -1.1,
    },
  },
  {
    name: "Stannis Baratheon",
    house: "Baratheon",
    quote: "Winter is Coming",
    image: Stannis,
    cost: 11,
    positive: {
      honor: 2.5,
      stability: 2.0,
    },
    negative: {
      diplomacy: -1.0,
    },
  },
  {
    name: "Renly Baratheon",
    house: "Baratheon",
    quote: "Winter is Coming",
    image: Renly,
    cost: 10,
    positive: {
      diplomacy: 2.5,
      wealth: 2.0,
    },
    negative: {
      stability: -1.1,
    },
  },
  {
    name: "Davos Seaworth",
    house: "Baratheon",
    quote: "Winter is Coming",
    image: Davos,
    cost: 8,
    positive: {
      loyalty: 3.0,
      honor: 2.5,
    },
    negative: {
      wealth: -1.0,
    },
  },
];

export default AllyData;
