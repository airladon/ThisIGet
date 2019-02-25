// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  // DiagramElementPrimative, DiagramObjectAngle, DiagramObjectLine,
  // DiagramElementCollection,
  Transform,
} = Fig;
// const {
//   randElements,
// } = Fig.tools.math;

const results = [
  // randElements(4, ['summer', 'spring', 'autumn', 'winter']),
  ['spring', 'winter', 'summer', 'autumn'],
  ['autumn', 'summer', 'spring', 'winter'],
  ['autumn', 'summer', 'winter', 'spring'],
  ['summer', 'spring', 'winter', 'autumn'],
  ['spring', 'summer', 'autumn', 'winter'],
  ['winter', 'spring', 'summer', 'autumn'],
  ['summer', 'spring', 'autumn', 'winter'],
  ['spring', 'summer', 'winter', 'autumn'],
  ['spring', 'winter', 'autumn', 'summer'],
  ['winter', 'spring', 'summer', 'autumn'],
  ['spring', 'summer', 'autumn', 'winter'],
  ['spring', 'autumn', 'winter', 'summer'],
  ['autumn', 'winter', 'summer', 'spring'],
  ['spring', 'autumn', 'summer', 'winter'],
  ['winter', 'summer', 'spring', 'autumn'],
  ['autumn', 'winter', 'summer', 'spring'],
  ['summer', 'winter', 'spring', 'autumn'],
  ['winter', 'summer', 'spring', 'autumn'],
  ['autumn', 'winter', 'summer', 'spring'],
  ['summer', 'winter', 'spring', 'autumn'],
  ['winter', 'spring', 'summer', 'autumn'],
  ['spring', 'summer', 'autumn', 'winter'],
  ['spring', 'autumn', 'winter', 'summer'],
  ['autumn', 'winter', 'summer', 'spring'],
  ['spring', 'autumn', 'summer', 'winter'],
  ['winter', 'summer', 'spring', 'autumn'],
  ['autumn', 'winter', 'summer', 'spring'],
  ['summer', 'winter', 'spring', 'autumn'],
  ['winter', 'summer', 'spring', 'autumn'],
  ['autumn', 'winter', 'summer', 'spring'],
  ['summer', 'winter', 'spring', 'autumn'],
  ['spring', 'summer', 'autumn', 'winter'],
  ['winter', 'spring', 'summer', 'autumn'],
  ['summer', 'spring', 'autumn', 'winter'],
  ['spring', 'summer', 'winter', 'autumn'],
  ['spring', 'winter', 'autumn', 'summer'],
  ['winter', 'spring', 'summer', 'autumn'],
  ['spring', 'summer', 'autumn', 'winter'],
  ['spring', 'autumn', 'winter', 'summer'],
  ['autumn', 'winter', 'summer', 'spring'],
  ['spring', 'autumn', 'summer', 'winter'],
  ['spring', 'summer', 'autumn', 'winter'],
  ['winter', 'spring', 'summer', 'autumn'],
  ['summer', 'spring', 'autumn', 'winter'],
  ['spring', 'summer', 'winter', 'autumn'],
  ['spring', 'winter', 'autumn', 'summer'],
  ['winter', 'spring', 'summer', 'autumn'],
  ['spring', 'summer', 'autumn', 'winter'],
  ['spring', 'autumn', 'winter', 'summer'],
  ['autumn', 'winter', 'summer', 'spring'],
  ['spring', 'autumn', 'summer', 'winter'],
];

function getHighest(summaryData: { [name: string]: number }) {
  let highest = '';
  Object.keys(summaryData).forEach((name) => {
    if (highest === '') {
      highest = name;
    }
    if (summaryData[name] > highest) {
      highest = summaryData[name];
    }
  });
  return highest;
}
function getLowest(summaryData: { [name: string]: number }) {
  let highest = '';
  Object.keys(summaryData).forEach((name) => {
    if (highest === '') {
      highest = name;
    }
    if (summaryData[name] < highest) {
      highest = summaryData[name];
    }
  });
  return highest;
}

function getCount(data: Array<Array<string>>) {
  const count = {};
  data.forEach((d) => {
    if (!(d[0] in count)) {
      count[d[0]] = 0;
    }
    count[d[0]] += 1;
  });
  // const summaryArray = [];
  // Object.keys(summary).forEach((key) => {
  //   summaryArray.push({ name: key, count: summary[key] });
  // });
  // return summaryArray.sort((a, b) => a.count - b.count);
  return count;
}

function getOrder(count: { [name: string]: number }) {
  const countArray = [];
  Object.keys(count).forEach((key) => {
    countArray.push({ name: key, count: count[key] });
  });
  const sortedCountArray = countArray.sort((a, b) => a.count - b.count);
  return sortedCountArray.map(c => c.name);
}


// round: {
//   count: { summer: 10, autum: 20 ,...}
//   order: [summer, autum, ]
// }
function removeFromArray(value: string, fromArray: Array<string>) {
  const copyArray = fromArray.slice();
  for (let i = 0; i < copyArray.length; i += 1) {
    if (copyArray[i] === value) {
      copyArray.splice(i, 1);
    }
  }
  return copyArray;
}

function mergeData(candidateToMerge: string, data: Array<Array<string>>): Array<Array<string>> {
  const mergedData = [];
  data.forEach((d) => {
    const newD = removeFromArray(candidateToMerge, d);
    mergedData.push(newD);
  });
  return mergedData;
}

type TypeCount = { [name: string]: number };
type TypeOrder = Array<string>;
type TypeData = Array<Array<string>>;

function calcRounds(
  dataIn?: TypeData,
  countIn?: TypeCount,
  orderIn?: TypeOrder,
  rounds: Array<Object> = [],
) {
  let count = countIn;
  let data = dataIn;
  let order = orderIn;
  if (countIn != null && dataIn != null && orderIn != null) {
    const threashold = Math.floor(dataIn.length / 2) + 1;
    const highestCount = countIn[orderIn.slice(-1)[0]];
    if (highestCount > threashold) {
      return rounds;
    }
  } else if (dataIn != null) {
    data = dataIn;
    count = getCount(data);
    order = getOrder(count);
    // eslint-disable-next-line
    rounds = [{ count, order, data }];
  }

  if (data != null && count != null && order != null) {
    const newData = mergeData(order[0], data);
    const newCount = getCount(newData);
    const newOrder = getOrder(newCount);
    const newRound = { count: newCount, order: newOrder, data: newData };
    return calcRounds(newData, newCount, newOrder, [...rounds, newRound]);
  }
  return rounds;
}

function getRounds() {
  return calcRounds(results);
}


export default class CommonCollection extends CommonDiagramCollection {
  rounds: Array<Object>;
  candidateOrder: Array<string>;

  addBars() {
    const plotHeight = this.layout.plotHeight;
    const numResults = this.rounds[0].data.length;
    const scaleFactor = plotHeight / numresults;
    const endY = {}
    this.order.forEach((name) => {
      endY[name] = 0;
    });
    this.rounds.forEach((round, roundIndex) => {
      let startY = 0;
      let startX = round.summary.length * 0.4;
      // this.candidateOrder.forEach((name) => {
      //   const startPosition = new Point(x, y);
      //   const endPosition = new Point(x, y);
      // });
      round.order.forEach((name, orderIndex) => {
        const height = round.count[name] * scaleFactor;
        const startPosition = new Point(startX, startY);
        startY += height;
        const endPosition = new Point(orderIndex * 0.4, endY[name])
        endY[name] += height;

        const lineOptions = {
          color: this.layout.colors[name],
          length: height,
          width: 0.2,
          angle: Math.PI / 2,
          vertexSpaceStart: 'start',
          label: {
            text: `${round.count[name]}`,
            color: [0, 0, 0, 1],
          },
        },
        const line = this.diagram.objects.line(lineOptions);
        line.scenarios = {
          start: { position: startPosition },
          end: { position: endPosition },
        };
        this.add()
      });
      
    });
  }

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Iso').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
    this.rounds = getRounds();
    this.candidateOrder = [
      ...this.rounds.map(d => d.order[0]),
      this.rounds.slice(-1)[0].order.slice(-1)[0],
    ].reverse();
    console.log(this.rounds)
    console.log(this.candidateOrder)
    // this.addBars();
  }
}
