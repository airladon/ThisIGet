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
  click,
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
    const circ = diag._circle;
    const circle = circ._circle;

    this.addSection({
      title: 'Circle',
      setContent: [
        'A |circle| is a shape whose |edge| is a constant distance from its |center|.',
        `${new Definition('Circle', 'Latin', ['circulus', 'MEANING', '', 'ring']).html(colors.circle)}`,
      ],
      modifiers: {
        edge: click(circ.pulseCircle, [circ], colors.circle),
        center: click(circ.pulseCenter, [circ], colors.center),
      },
      setEnterState: () => {
        circle.setScenario('summary');
      },
      show: [circle._line, circle._center],
      setSteadyState: () => {},
      setLeaveState: () => {},
    });

    this.addSection({
      title: 'Properties',
      setContent: [
        'A circle\'s |properties| include the |circumference|, |radius|, |diameter| and |center|.',
        `${new Definition('Center', 'Latin', ['centrum', 'middle']).html({ classes: 'diagram__definition_highest', color: colors.center })}`,
        `${new Definition('Radius', 'Latin', ['radius', 'spoke of a chariot wheel']).html({ classes: 'diagram__definition_higher', color: colors.radius })}`,
        `${new Definition('Diameter', 'Greek', ['diametros', '', 'dia', 'across', 'metros', 'measure']).html({ classes: 'diagram__definition_high', color: colors.diameter })}`,
        `${new Definition('Circumference', 'Latin', ['circumferentia', '', 'circum', 'around', 'ferre', 'carry']).html(colors.circle)}`,
      ],
      modifiers: {
        center: click(circ.pulseCenter, [circ], colors.center),
        radius: click(circ.pulseRadius, [circ], colors.radius),
        diameter: click(circ.pulseDiameter, [circ], colors.diameter),
        circumference: click(circ.pulseCircle, [circ], colors.circle),
      },
      setEnterState: () => {
        circle.setScenario('summaryHigher');
        circle._radius.setRotation(0.5);
        circle._diameter.setRotation(-0.5);
      },
      show: [circle._line, circle._center, circle._radius, circle._diameter],
      setSteadyState: () => {},
      setLeaveState: () => {},
    });

    this.addSection({
      title: 'Property Relationships',
      setContent: [
        'The |circumference|, |radius|, |diameter| are related and can be calculated from each other.',
      ],
      modifiers: {
        center: click(circ.pulseCenter, [circ], colors.center),
        radius: click(circ.pulseRadius, [circ], colors.radius),
        diameter: click(circ.pulseDiameter, [circ], colors.diameter),
        circumference: click(circ.pulseCircle, [circ], colors.circle),
      },
      setEnterState: () => {
        circle.setScenario('right');
        circle._radius.setRotation(0.5);
        circle._diameter.setRotation(-0.5);
      },
      show: [circle._line, circle._center, circle._radius, circle._diameter],
      setSteadyState: () => {
        circ._eqnDiameterRadius.showForm('base');
        circ._eqnDiameterRadius.setScenario('left');
        circ._eqnCircumferenceDiameter.showForm('base');
        circ._eqnCircumferenceDiameter.setScenario('left');
        circ._eqnCircumferenceRadius.showForm('base');
        circ._eqnCircumferenceRadius.setScenario('left');
      },
      setLeaveState: () => {},
    });
  }
}

export default Content;
