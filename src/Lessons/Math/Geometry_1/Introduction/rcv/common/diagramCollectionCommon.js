// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  // DiagramElementPrimative, DiagramObjectAngle, DiagramObjectLine,
  // DiagramElementCollection,
  Transform,
} = Fig;
const {
  randElements,
} = Fig.tools.math;

const candidates = ['spring', 'winter', 'summer', 'autumn'];
const overallResults = [
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
  return summaryArray.sort((a, b) => b.count - a.count);
}

function mergeData(candidateToMerge:string, data: Array<Array<string>>) {
  const mergedData = [];
  data.forEach((d) => {
    if (d[0] === candidateToMerge) {
      mergedData.push()
    }
  })
}

function processResults(rawData: Array<Array<string>>) {
  const summary = summarizeData(rawData);
  console.log(summary);
}

class ResultsNew {
  rawData: Array<Array<string>>;
  candidateNames: Array<string>;
  constructor(raw: Array<Array<string>>, candidateNames: Array<string>) {
    this.rawData = raw;
    this.candidateNames = candidateNames;
  }

}

class Results {
  rawData: Array<Array<string>>;
  candidateNames: Array<string>;
  results: { count: number, preferences: Array<Array<string>>};
  sortedResults: Array<{ count: number, preferences: Array<Array<string>>}>;

  constructor(raw: Array<Array<string>>, candidateNames: Array<string>) {
    this.rawData = raw;
    this.candidateNames = candidateNames;
    this.results = this.countRound();
    this.sortedCount();
  }

  countRound() {
    const countDict = {};
    this.candidateNames.forEach((name) => {
      countDict[name] = {
        count: 0,
        preferences: [],
        name,
      };
    });

    this.rawData.forEach((result) => {
      countDict[result[0]].count += 1;
      countDict[result[0]].preferences.push(result.slice(1));
    });
    return countDict;
  }

  sortedCount() {
    // convert to array to sort
    const countArray: Array<{
      count: number,
      preferences: Array<Array<string>>,
      name: string,
    }> = [];
    Object.values(this.results).forEach((value) => {
      countArray.push(value);
    });

    this.sortedResults = countArray.sort((a, b) => b.count - a.count);
  }
}

export default class CommonCollection extends CommonDiagramCollection {

  // countRound(results: Array<Array<string>>) {
  //   const count = {
  //     summer: {
  //       count: 0,
  //       preferences: [],
  //     },
  //     winter: {
  //       count: 0,
  //       preferences: [],
  //     },
  //     spring: {
  //       count: 0,
  //       preferences: [],
  //     },
  //     autumn: {
  //       count: 0,
  //       preferences: [],
  //     },
  //   }
  //   results.forEach((result) => {
  //     count[result[0]].count += 1;
  //     count[result[0]].preferences.push(result.slice(1));
  //   });
  //   console.log(count)
  //   return count;
  // }
  // eslint-disable-next-line class-methods-use-this
  calcRounds(data: Array<Array<string>>, candidateNames: Array<string>) {
    const rounds = [];
    let round = new Results(data, candidateNames);
    const names = candidateNames.slice();
    rounds.push(round);
    console.log(rounds);
    let index = 0;
    while (index < candidateNames.length) {
      // console.log(round[0].count, Math.floor(data.length / 2) + 1)
      // console.log(round[0].count < Math.floor(data.length / 2) + 1)
      // console.log(round.slice(-1)[0].preferences)
      const lowest = round.sortedResults.slice(-1)[0];
      console.log(lowest)
      // const names = candidateNames.slice();
      for (let i = 0; i < names.length; i += 1) {
        if (names[i] === lowest.name) {
          names.splice(i, 1);
        }
      }
      console.log(names)
      const newRound = (new Results(round.sortedResults.slice(-1)[0].preferences, names));
      Object.keys(newRound.results).forEach((candidate) => {
        newRound.results[candidate].count += round.results[candidate].count;
        newRound.results[candidate].preferences = [
          ...round.results[candidate].preferences,
          ...newRound.results[candidate].preferences,
        ];
      });
      newRound.sortedCount();
      round = newRound;
      rounds.push(round);
      console.log(round)
      // console.log(round);
      index += 1;
    }
    // console.log(round.sortCount());
    // console.log(rounds)
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
    // this.calcRounds(overallResults, candidates);
    processResults(overallResults);
    // const round1 = new Results(overallResults, ['summer', 'winter', 'spring', 'autumn']);
    // console.log(round1.count);
    // console.log(round1.getLowest());
    // const round1 = this.countRound(overallResults);
    // const round2 = this.countRound(round1);
    // console.log(overalResults)
    // console.log(overalResults)
    // this.countRound()
  }
}
