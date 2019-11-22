// @flow
import Fig from 'figureone';
import {
  PresentationFormatContent,
  // interactiveItem,
} from '../../../../../../js/TopicFormat/PresentationFormatContent';
// import Definition from '../../../../../common/tools/definition';
import diagramLayout from './layout';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
import DiagramCollection from './diagramCollection';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';

const {
  style,
  click,
  // clickW,
  highlight,
  // centerV,
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
    this.loadQRs([
      'Math/Geometry_1/Equilateral/base',
      'Math/Geometry_1/CongruentTriangles/base',
      'Math/Geometry_1/Triangles/base',
      'Math/Geometry_1/RightAngleTriangles/base',
    ]);
  }

  addSections() {
    const diag = this.diagram.elements;
    const coll = diag._collection;
    const equil = coll._equil;

    this.addSection({
      title: 'Introduction',
      setContent: style({ centerV: true }, [
        'Some triangles have |side relationships| that are relatively easy to |calculate| and therefore make problems easier whenever the triangles are |identified|.',
      ]),
    });
    let common = {
      setEnterState: () => {
        coll.setScenarios('default');
        coll.undim();
      },
    };
    this.addSection(common, {
      setContent: style({ top: 0 }, [
        'For instance, an |equilateral_triangle| has |all equal sides|. If you |know| a triangle has |three 60º angles|, and you know |one side| length, the |other two| can be |calculated|.',
      ]),
      modifiers: {
        equilateral_triangle: this.qr('Math/Geometry_1/Equilateral/base/Main'),
      },
      show: [
        equil._equil,
        equil._a60, equil._a60Left, equil._a60Top,
        equil._A, equil._ALeft, equil._ABottom,
      ],
    });

    this.addSection(common, {
      setContent: style({ top: 0 }, [
        'This explanation will find |two| more triangles where |side lengths can be calculated from any side|.',
      ]),
      show: [
        equil._equil,
        equil._a60, equil._a60Left, equil._a60Top,
        equil._A, equil._ALeft, equil._ABottom,
      ],
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    // ************************************************************
    let commonContent = {
      setContent: 'We start by |splitting| the equilateral triangle in |half|.',
    }
    this.addSection(common, commonContent, {
      title: '30-60-90 Triangle',
      modifiers: {
        splitting: this.bindNext(colors.sides),
      },
      show: [
        equil._equil,
        equil._a60, equil._a60Left, equil._a60Top,
        equil._A, equil._ALeft, equil._ABottom,
      ],
    });

    this.addSection(common, commonContent, {
      modifiers: {
        splitting: click(
          coll._equil._split.grow, [coll, 0.05, 1, true, null], colors.sides,
        ),
      },
      show: [
        equil._equil,
        equil._a60, equil._a60Left, equil._a60Top,
        equil._A, equil._ALeft, equil._ABottom,
        equil._split,
      ],
      transitionFromPrev: (done) => {
        equil._split.grow(0.05, 1, true, () => {
          equil._Aon2.showAll();
          equil._Aon2Left.showAll();
          equil._ABottom.dim();
          equil._a60Top.dim();
          equil._H.showAll();
          coll.accent(equil, ['Aon2', 'Aon2Left'], done);
        });
      },
      setSteadyState: () => {
        equil._ABottom.dim();
        equil._a60Top.dim();
        equil._Aon2.showAll();
        equil._Aon2Left.showAll();
        equil._H.showAll();
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'Each half triangle has the |same_side_lengths|, and from |SSS| is therefore |congruent|.',
    };
    this.addSection(common, commonContent, {
      modifiers: {
        same_side_lengths: coll.bindToggleGroups(
          equil, [['Aon2', 'A', 'H'], ['Aon2Left', 'ALeft', 'H']],
        ),
        SSS: this.qr('Math/Geometry_1/CongruentTriangles/base/Sss'),
      },
      show: [
        equil._equil,
        equil._a60, equil._a60Left, equil._a60Top,
        equil._A, equil._ALeft, equil._ABottom,
        equil._split, equil._H,
        equil._Aon2, equil._Aon2Left,
      ],
      setSteadyState: () => {
        equil._ABottom.dim();
        equil._a60Top.dim();
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'This means the top two |angles| must be half of 60º, or |30º|.',
    };
    this.addSection(common, commonContent, {
      modifiers: {
        angles: this.bindNext(colors.angles),
        '30º': highlight(colors.angles),
      },
      show: [
        equil._equil,
        equil._a60, equil._a60Left, equil._a60Top,
        equil._A, equil._ALeft, equil._ABottom,
        equil._split, equil._H,
        equil._Aon2, equil._Aon2Left,
      ],
      setSteadyState: () => {
        equil._ABottom.dim();
        equil._a60Top.dim();
      },
    });

    this.addSection(common, commonContent, {
      modifiers: {
        angles: this.bindNext(colors.angles),
      },
      show: [
        equil._equil,
        equil._a60, equil._a60Left, equil._a60Top,
        equil._A, equil._ALeft, equil._ABottom,
        equil._split, equil._H,
        equil._Aon2, equil._Aon2Left,
        equil._a30, equil._a30Left,
      ],
      transitionFromPrev: (done) => {
        equil._ABottom.dim();
        equil._a60Top.dim();
        coll.accent(equil, ['a30', 'a30Left'], done);
      },
      setSteadyState: () => {
        equil._ABottom.dim();
        equil._a60Top.dim();
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'As a triangle\'s angles |add_to_180º|, the remaining angles must be |right_angles|.',
      modifiers: {
        add_to_180º: this.qr('Math/Geometry_1/Triangles/base/AngleSumPres'),
      },
    };
    this.addSection(common, commonContent, {
      modifiers: {
        right_angles: this.bindNext(colors.angles),
      },
      show: [
        equil._equil,
        equil._a60, equil._a60Left, equil._a60Top,
        equil._A, equil._ALeft, equil._ABottom,
        equil._split, equil._H,
        equil._Aon2, equil._Aon2Left,
        equil._a30, equil._a30Left,
      ],
      setSteadyState: () => {
        equil._ABottom.dim();
        equil._a60Top.dim();
      },
    });

    this.addSection(common, commonContent, {
      modifiers: {
        right_angles: coll.bindAccent(equil, ['a90', 'a90Left']),
      },
      show: [
        equil._equil,
        equil._a60, equil._a60Left, equil._a60Top,
        equil._A, equil._ALeft, equil._ABottom,
        equil._split, equil._H,
        equil._Aon2, equil._Aon2Left,
        equil._a30, equil._a30Left, equil._a90, equil._a90Left,
      ],
      transitionFromPrev: (done) => {
        equil._ABottom.dim();
        equil._a60Top.dim();
        coll.accent(equil, ['a90', 'a90Left'], done);
      },
      setSteadyState: () => {
        equil._ABottom.dim();
        equil._a60Top.dim();
      },
    });

    // ************************************************************
    // ************************************************************
    // ************************************************************
    commonContent = {
      setContent: 'Now let\'s |focus| on just |one half| and solve for |H| using the |Pythagorean_Theorem|.',
      modifiers: {
        Pythagorean_Theorem: this.qr('Math/Geometry_1/RightAngleTriangles/base/PythagorusPres')
      }
    };
    this.addSection(common, commonContent, {
      show: [
        equil._equil,
        equil._a60, equil._a60Left, equil._a60Top,
        equil._A, equil._ALeft, equil._ABottom,
        equil._split, equil._H,
        equil._Aon2, equil._Aon2Left,
        equil._a30, equil._a30Left, equil._a90, equil._a90Left,
      ],
      setSteadyState: () => {
        equil._ABottom.dim();
        equil._a60Top.dim();
      },
    });
    this.addSection(common, commonContent, {
      show: [
        equil._equil,
        equil._a60, equil._a60Left, equil._a60Top,
        equil._A, equil._ALeft, equil._ABottom,
        equil._split, equil._H,
        equil._Aon2, equil._Aon2Left,
        equil._a30, equil._a30Left, equil._a90, equil._a90Left,
      ],
      transitionFromPrev: (done) => {
        equil._ABottom.dim();
        equil._a60Top.dim();
        coll.animations.new()
          .inParallel([
            equil._a30Left.anim.dissolveOut(1),
            equil._ALeft.anim.dissolveOut(1),
            equil._ABottom.anim.dissolveOut(1),
            equil._a60Left.anim.dissolveOut(1),
            equil._a60Top.anim.dissolveOut(1),
            equil._Aon2Left.anim.dissolveOut(1),
            equil._equil.anim.dissolveOut(1),
            equil._a90Left.anim.dissolveOut(1),
            equil._tri.anim.dissolveIn(0.8),
          ])
          .inParallel([
            equil.anim.scenario({ target: 'side', duration: 1 }),
          ])
          .whenFinished(done)
          .start();
      },
      setSteadyState: () => {
        equil._ABottom.dim();
        equil._a60Top.dim();
        equil._a30Left.hide();
        equil._ALeft.hide();
        equil._ABottom.hide();
        equil._a60Left.hide();
        equil._a60Top.hide();
        equil._Aon2Left.hide();
        equil._a90Left.hide();
        equil._equil.hide();
        equil._tri.showAll();
        equil.setScenario('side')
      },
    });
  }
}

export default Content;
