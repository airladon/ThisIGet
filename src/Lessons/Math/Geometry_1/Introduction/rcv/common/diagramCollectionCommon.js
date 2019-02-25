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

function summarizeData(data: Array<Array<string>>) {
  const summary = {};
  data.forEach((d) => {
    if (!(d[0] in summary)) {
      summary[d[0]] = 0;
    }
    summary[d[0]] += 1;
  });
  const summaryArray = [];
  Object.keys(summary).forEach((key) => {
    summaryArray.push({ name: key, count: summary[key] });
  });
  return summaryArray.sort((a, b) => a.count - b.count);
}

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

type TypeSummary = Array<{
  name: string;
  count: number;
}>;

type TypeData = Array<Array<string>>;

function calcRounds(
  dataIn?: TypeData,
  summaryIn?: TypeSummary,
  rounds: Array<Object> = [],
) {
  let summary = summaryIn;
  let data = dataIn;
  if (summaryIn != null && dataIn != null) {
    const threashold = Math.floor(dataIn.length / 2) + 1;
    const highestCount = summaryIn.slice(-1)[0].count;
    if (highestCount > threashold) {
      return rounds;
    }
  } else if (dataIn != null) {
    data = dataIn;
    summary = summarizeData(data);
    // eslint-disable-next-line
    rounds = [{ summary, data }];
  }

  if (data != null && summary != null) {
    const newData = mergeData(summary[0].name, data);
    const newSummary = summarizeData(newData);
    const newRound = { summary: newSummary, data: newData };
    return calcRounds(newData, newSummary, [...rounds, newRound]);
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
    this.rounds.forEach((round, index) => {
      let startY = 0;
      let startX = round.summary.length * 0.4;
      this.candidateOrder.forEach((name) => {
        const startPosition = new Point(x, y);
        const endPosition = new Point(x, y);
      });
      round.summary.forEach((candidate) => {
        const height = round.summary[]
        startPositions[candidate.name].push()
        const lineOptions = {
          color: this.layout.colors[candidate.name],
          length: candidate.count * scaleFactor,
          width: 0.2,
          angle: Math.PI / 2,
          vertexSpaceStart: 'start',
          label: {
            text: `${candidate.count}`,
            color: [0, 0, 0, 1],
          }
        }
        const line = this.diagram.objects.line(lineOptions);
        line.scenarios = {
          start: { position: new Point(startX, startY) },
          end: { position: new Point(endX, endY) },
        };
      })
      const bar = this.diagram.objects.line({
        color: this.layout.colors[]
      })
      this.add()
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
      ...this.rounds.map(d => d.summary[0].name),
      this.rounds.slice(-1)[0].summary.slice(-1)[0].name,
    ].reverse();
    console.log(this.rounds)
    console.log(this.candidateOrder)
    this.addBars();
  }
}
