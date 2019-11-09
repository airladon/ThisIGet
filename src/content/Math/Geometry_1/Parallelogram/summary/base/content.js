// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
} from '../../../../../../js/TopicFormat/PresentationFormatContent';
import diagramLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import DiagramCollection from './diagramCollection';
import Definition from '../../../../../common/tools/definition';

const {
  style,
  click,
//   clickW,
//   highlight,
//   centerV,
} = Fig.tools.html;

const layout = diagramLayout();
const { colors } = layout;

class Content extends PresentationFormatContent {
  setTitle() {
    this.title = details.title;
    //  this.iconLink = imgLink;
    //  this.iconLinkGrey = imgLinkGrey;
  }

  setDiagram(htmlId: string = '') {
    this.diagram = new CommonTopicDiagram({ htmlId }, layout);
    this.diagram.elements = new DiagramCollection(this.diagram);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const pgram = coll._pgram;

    const common = {
      show: [
        pgram._line,
        pgram._pMarkLeft, pgram._pMarkRight,
        pgram._pMarkTop, pgram._pMarkBottom,
        pgram._a1, pgram._b1, pgram._a2, pgram._b2,
        pgram._labelA1, pgram._labelA2,
        pgram._labelB1, pgram._labelB2,
        pgram._diag1, pgram._diag2,
        pgram._lMarkUp1, pgram._lMarkUp2,
        pgram._lMark21, pgram._lMark22,
        pgram._h,
      ],
      hide: [
        pgram._a1._label, pgram._a2._label,
        pgram._b1._label, pgram._b2._label,
      ],
      setSteadyState: () => {
        pgram.setScenario('summary');
      },
    };

    this.addSection(common, {
      title: 'Properties',
      setContent: [
        style({ top: 0 }, 'A |parallelogram| has'),
        style({
          list: 'unordered', listStyleTyle: 'disc', size: 0.95, top: 1,
        }, [
          '|Opposite_sides| that are |parallel| and |equal|',
          '|Opposite_angles| that are |equal|',
          '|Diagonals| that split each other in |half|',
          '|Area| = |A| \u00D7 |H|',
        ]),
        `${new Definition('Parallelogram', 'Latin', ['parallelogrammum', ''], 'Greek', ['parallelogrammon', 'bounded by parallel lines']).html({
          // classes: 'diagram__definition_high',
          color: colors.sides,
        })}`,
      ],
      modifiers: {
        Opposite_angles: click(coll.toggleOppositeAngles, [coll, null], colors.angles),
        Opposite_sides: click(coll.toggleEqualSides, [coll, null], colors.sides),
        half: click(coll.toggleEqualHalves, [coll, null], colors.sides),
        A: this.bindAccent(pgram, ['labelA1']),
        H: this.bindAccent(pgram, ['h']),
        Diagonals: this.bindAccent(pgram, ['diag1', 'diag2']),
      },
    });

    // ************************************************************************
    // ************************************************************************
    // ************************************************************************
    this.addSection(common, {
      setContent: [
        style({ top: 0 }, 'Conversely:'),
        style({
          list: 'unordered', listStyleTyle: 'disc', size: 0.95, top: 1,
        }, [
          'Any quadrangle with |equal_opposite_angles| is a |parallelogram|',
          'Any quadrangle with |equal_opposite_sides| is a |parallelogram|',
          'Any quadrangle whose |diagonals| split each other in |half| is a |parallelogram|',
        ]),
      ],
      modifiers: {
        equal_opposite_angles: click(coll.toggleOppositeAngles, [coll, null], colors.angles),
        equal_opposite_sides: click(coll.toggleEqualSides, [coll, null], colors.sides),
        half: click(coll.toggleEqualHalves, [coll, null], colors.sides),
        diagonals: this.bindAccent(pgram, ['diag1', 'diag2']),
      },
    });
  }
}

export default Content;
