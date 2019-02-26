// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  // DiagramElementPrimative, DiagramObjectAngle, DiagramObjectLine,
  // DiagramElementCollection,
  Transform, Point,
} = Fig;
const {
  randElements, randInt,
} = Fig.tools.math;


const results = (() => {
  const out = [];
  for (let i = 0; i < 100; i += 1) {
    out.push(randElements(4, ['summer', 'spring', 'autumn', 'winter']));
  }
  // console.log(out)
  return out;
})();

const results2 = [
  ['summer', 'spring', 'autumn', 'winter'],
  ['spring', 'summer', 'winter', 'autumn'],
  ['winter', 'spring', 'summer', 'autumn'],
  ['winter', 'summer', 'spring', 'autumn'],
  ['winter', 'summer', 'spring', 'autumn'],
  ['autumn', 'summer', 'winter', 'spring'],
  ['autumn', 'winter', 'summer', 'spring'],
  ['spring', 'autumn', 'winter', 'summer'],
  ['summer', 'autumn', 'winter', 'spring'],
  ['winter', 'spring', 'summer', 'autumn'],
  ['summer', 'winter', 'autumn', 'spring'],
  ['summer', 'spring', 'autumn', 'winter'],
  ['spring', 'autumn', 'summer', 'winter'],
  ['summer', 'spring', 'autumn', 'winter'],
  ['summer', 'spring', 'winter', 'autumn'],
  ['autumn', 'summer', 'spring', 'winter'],
  ['summer', 'spring', 'autumn', 'winter'],
  ['autumn', 'spring', 'winter', 'summer'],
  ['autumn', 'winter', 'summer', 'spring'],
  ['autumn', 'winter', 'summer', 'spring'],
  ['summer', 'winter', 'autumn', 'spring'],
  ['winter', 'summer', 'autumn', 'spring'],
  ['spring', 'winter', 'autumn', 'summer'],
  ['winter', 'spring', 'autumn', 'summer'],
  ['autumn', 'summer', 'spring', 'winter'],
  ['spring', 'autumn', 'winter', 'summer'],
  ['spring', 'autumn', 'winter', 'summer'],
  ['summer', 'winter', 'autumn', 'spring'],
  ['summer', 'spring', 'autumn', 'winter'],
  ['autumn', 'spring', 'winter', 'summer'],
  ['spring', 'summer', 'autumn', 'winter'],
  ['spring', 'autumn', 'winter', 'summer'],
  ['autumn', 'winter', 'spring', 'summer'],
  ['winter', 'spring', 'autumn', 'summer'],
  ['winter', 'summer', 'spring', 'autumn'],
  ['autumn', 'winter', 'summer', 'spring'],
  ['spring', 'autumn', 'summer', 'winter'],
  ['autumn', 'summer', 'winter', 'spring'],
  ['spring', 'summer', 'autumn', 'winter'],
  ['winter', 'summer', 'spring', 'autumn'],
  ['summer', 'spring', 'autumn', 'winter'],
  ['spring', 'winter', 'summer', 'autumn'],
  ['spring', 'autumn', 'summer', 'winter'],
  ['autumn', 'winter', 'spring', 'summer'],
  ['summer', 'winter', 'autumn', 'spring'],
  ['autumn', 'summer', 'winter', 'spring'],
  ['spring', 'winter', 'summer', 'autumn'],
  ['autumn', 'winter', 'summer', 'spring'],
  ['summer', 'spring', 'autumn', 'winter'],
  ['winter', 'spring', 'summer', 'autumn'],
];

const oldresults = [
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
  ['autumn', 'spring', 'summer', 'winter'],
  ['spring', 'autumn', 'summer', 'winter'],
  ['winter', 'summer', 'spring', 'autumn'],
  ['autumn', 'winter', 'summer', 'spring'],
  ['summer', 'winter', 'spring', 'autumn'],
  ['winter', 'summer', 'spring', 'autumn'],
  ['winter', 'autumn', 'summer', 'spring'],
  ['summer', 'winter', 'spring', 'autumn'],
  ['summer', 'spring', 'winter', 'autumn'],
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
  ['winter', 'spring', 'summer', 'autumn'],
  ['spring', 'autumn', 'winter', 'summer'],
  ['autumn', 'winter', 'summer', 'spring'],
  ['summer', 'autumn', 'winter', 'spring'],
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
    if (newD.length > 0) {
      mergedData.push(newD);
    }
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
    if (highestCount >= threashold) {
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
  // [name: string]: DiagramObjectLine;

  updateAxes() {
    const numVotes = this.rounds[0].data.length;
    const threashold = Math.floor(numVotes / 2) + 1;
    this._halfLine.label.setText(`${threashold}`);
    this._fullLine.label.setText(`${numVotes}`);
    this._halfLine.setPosition(new Point(
      this.layout.plotStart.x,
      this.layout.plotStart.y + threashold / numVotes * this.layout.plotHeight,
    ));
  }

  makeCandidateNames() {
    this.candidateOrder.forEach((name, index) => {
      const baseLocation = new Point(
        this.layout.plotStart.x + index * this.layout.barSeparation
          + this.layout.barWidth / 2,
        this.layout.plotStart.y - 0.1,
      );
      const txt = this.diagram.shapes.txt({
        text: name,
        size: 0.1,
        color: this.layout.colors.text,
        style: 'normal',
        family: 'Helvetica',
        position: baseLocation,
      });
      txt.scenarios.base = { position: baseLocation };
      this.add(`${name}`, txt);
    });
  }

  makeBars() {
    const lineOptions = {
      width: this.layout.barWidth,
      angle: Math.PI / 2,
      vertexSpaceStart: 'start',
      label: {
        color: [1, 1, 1, 1],
        scale: 0.5,
      },
    };
    const { plotHeight } = this.layout;
    const numResults = this.rounds[0].data.length;
    const scaleFactor = plotHeight / numResults;
    this.rounds.forEach((round, roundIndex) => {
      let lastRound;
      if (roundIndex > 0) {
        lastRound = this.rounds[roundIndex - 1];
      }
      round.order.forEach((name) => {
        const count = round.count[name];
        let deltaCount = count;
        if (lastRound != null) {
          deltaCount -= lastRound.count[name];
        }
        let countText = '';
        if (deltaCount > 0) {
          countText = `${deltaCount}`;
        }
        let deltaLength = deltaCount * scaleFactor - this.layout.barVerticalSeparation;
        if (deltaLength < 0) {
          deltaLength = 0;
        }
        const lineDelta = this.diagram.objects.line({
          color: this.layout.colors[name],
          length: deltaLength,
          label: {
            text: countText,
          },
        }, lineOptions);
        this.add(`${roundIndex}delta${name}`, lineDelta);

        const lineTotal = this.diagram.objects.line({
          color: this.layout.colors[name],
          length: count * scaleFactor,
          label: {
            text: `${count}`,
          },
        }, lineOptions);
        this.add(`${roundIndex}total${name}`, lineTotal);
      });
    });
  }

  addEndScenarios() {
    const lastY = {};
    const lastX = {};
    this.candidateOrder.forEach((name, index) => {
      lastX[name] = this.layout.plotStart.x + index
                    * this.layout.barSeparation + this.layout.barWidth / 2;
      lastY[name] = this.layout.plotStart.y;
    });
    this.rounds.forEach((round, roundIndex) => {
      round.order.forEach((name) => {
        const deltaElement = this[`_${roundIndex}delta${name}`]
        const totalElement = this[`_${roundIndex}total${name}`]
        const nameElement =  this[`_${name}`];
        totalElement.scenarios.end = {
          position: new Point(lastX[name], this.layout.plotStart.y),
        };
        totalElement.scenarios.remove = {
          position: new Point(
            this.layout.plotStart.x
              + (round.order.length + 0.5) * this.layout.barSeparation
              + this.layout.barWidth / 2,
            this.layout.plotStart.y,
          ),
        };
        nameElement.scenarios.remove = {
          position: new Point(
            this.layout.plotStart.x
              + (round.order.length + 0.5) * this.layout.barSeparation
              + this.layout.barWidth / 2,
            nameElement.scenarios.base.position.y,
          ),
        };
        deltaElement.scenarios.end = {
          position: new Point(
            lastX[name],
            this.layout.plotStart.y + totalElement.length - deltaElement.length,
          ),
        };
        lastY[name] += deltaElement.length;
      });
    });
  }

  addStartScenarios() {
    this.rounds.forEach((round, roundIndex) => {
      const lastX = this.layout.plotStart.x 
        + (round.order.length + 2.5) * this.layout.barSeparation
        + this.layout.barWidth / 2.5;
      let lastY = this.layout.plotStart.y;
      round.order.forEach((name) => {
        const element = this[`_${roundIndex}delta${name}`];
        const position = new Point(lastX, lastY);
        lastY += element.length + this.layout.barVerticalSeparation;
        element.scenarios.start = { position };
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
    // this.candidateOrder = [
    //   ...this.rounds.map(d => d.order[0]),
    //   this.rounds.slice(-1)[0].order.slice(-1)[0],
    // ].reverse();
    this.candidateOrder = this.rounds[0].order.slice().reverse();
    // console.log(this.rounds)
    // console.log(this.candidateOrder)
    this.makeBars();
    this.makeCandidateNames();
    this.addStartScenarios();
    this.addEndScenarios();
    this.updateAxes();
    
    // console.log(this);
    // this.addBars();
  }
}
