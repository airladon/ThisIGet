// @flow
import * as React from 'react';
import Fig from 'figureone';
// import '../../css/style.scss';
import TopicTile from './topicTile';
import TopicDescription from '../Lesson/topicDescription';
import makeTopicTree from '../Lesson/topicTree';

const { Point, Rect } = Fig;
const { getDefinedCSSVariables } = Fig.tools.css;

type Props = {
  learningPath: string;
  selected?: ?string;
  includeSubText?: boolean;
};

export default class LearningPathNavigator extends React.Component
                                    <Props> {
  selected: string;
  topicIndex: Array<Array<TopicDescription>>;
  topicTrees: Object;
  key: number;
  selectedTopic: TopicDescription;
  topicArray: Array<TopicDescription>;
  asTitle: boolean
  topicTilesBounds: Rect;
  tileWidth: number;
  tileHeight: number;
  tileVSpace: number;
  tileHSpace: number;
  learningPath: string;
  learningPathPath: string;
  learningPathName: string;

  constructor(props: Props) {
    super(props);
    // console.log(LI)
    this.topicTrees = makeTopicTree();
    this.topicIndex = this.topicTrees[props.learningPath].tree;
    this.learningPathPath = this.topicTrees[props.learningPath].path;
    this.learningPathName = this.topicTrees[props.learningPath].name;
    this.getVariables();
    this.layoutTopicTiles();
    this.key = 0;
    this.selected = props.selected || '';
    this.asTitle = false;
    if (this.selected !== '') {
      this.asTitle = true;
    }
    this.learningPath = props.learningPath;
  }

  getVariables() {
    const { body } = document;
    if (body) {
      const vars: Object = getDefinedCSSVariables(
        body,
        [
          '--navigator__tile_width',
          '--navigator__tile_height',
          '--navigator__tile_vSpace',
          '--navigator__tile_hSpace',
        ],
        '--navigator__',
      );
      this.tileWidth = vars.tileWidth;
      this.tileHeight = vars.tileHeight;
      this.tileVSpace = vars.tileVSpace;
      this.tileHSpace = vars.tileHSpace;
    }
  }

  layoutTopicTiles() {
    this.topicArray = [];
    // const y = this.tileHeight * 2 + vSpace * 2;
    const width = this.tileWidth;
    const height = this.tileHeight;
    const vSpace = this.tileVSpace;
    const hSpace = this.tileHSpace;
    let x = hSpace;
    this.topicArray = [];
    let maxParallel = 1;
    this.topicIndex.forEach((topic) => {
      if (Array.isArray(topic)) {
        if (topic.length > maxParallel) {
          maxParallel = topic.length;
        }
      }
    });
    const yMiddle = (maxParallel * this.tileHeight
                    + (maxParallel - 1) * vSpace
                    + vSpace * 2) / 2;

    this.topicIndex.forEach((topic) => {
      if (Array.isArray(topic)) {
        const len = topic.length;
        const totalHeight = len * height + (len - 1) * vSpace;
        let yStart = yMiddle - totalHeight / 2 + height / 2;
        if (yStart < yMiddle - 2 * height - 2 * vSpace) {
          yStart = yMiddle - 2 * height - 2 * vSpace;
        }
        topic.forEach((parallelTopic, index) => {
          const yLocation = yStart + index * (height + vSpace);
          // eslint-disable-next-line no-param-reassign
          parallelTopic.location = new Point(x, yLocation - this.tileHeight / 2);
          this.topicArray.push(parallelTopic);
        });
      } else {
        // eslint-disable-next-line no-param-reassign
        topic.location = new Point(x, yMiddle - this.tileHeight / 2);
        this.topicArray.push(topic);
      }
      x += width + hSpace;
    });

    this.getLessonTilesBounds();
  }

  createLessonJsx(topic: TopicDescription) {
    this.key += 1;
    let state = '';
    const { x, y } = topic.location;
    if (topic.title === this.selected) {
      state = 'selected';
      this.selectedTopic = topic;
    }
    let { title } = topic;
    if (topic.enabled === false) {
      state = 'disabled';
      title = `${title}`;
    }

    let linkToUse = '';
    const approachesOrder = ['explanation', 'summary', 'examples', 'discover', 'links'];
    const versionsOrder = ['base', 'static'];
    const getVersion = (approachUID) => {
      const versions = topic.approaches[approachUID];
      for (let i = 0; i < versionsOrder.length; i += 1) {
        const versionUID = versionsOrder[i];
        if (versionUID in versions) {
          linkToUse = `${topic.path}/${topic.uid}/${approachUID}/${versionUID}`;
          return;
        }
      }
      if (linkToUse === '' && Object.keys(versions).length > 0) {
        linkToUse = `${topic.path}/${topic.uid}/${approachUID}/${Object.keys(versions)[0]}`;
      }
    };

    for (let t = 0; t < approachesOrder.length; t += 1) {
      const approach = approachesOrder[t];
      if (approach in topic.approaches) {
        getVersion(approach);
        if (linkToUse !== '') {
          break;
        }
      }
    }

    if (linkToUse === '' && Object.keys(topic.approaches).length > 0) {
      getVersion(Object.keys(topic.approaches)[0]);
    }

    if (linkToUse === '') {
      state = 'disabled';
    }

    return <TopicTile
              id={topic.id}
              link={linkToUse}
              imgLink={topic.imgLink}
              imgLinkSelected={topic.imgLinkSelected}
              imgLinkDisabled={topic.imgLinkDisabled}
              key={this.key}
              label={title}
              state={state}
              left={`${x}px`}
              top={`${y}px`}
              title={false}
            />;
  }

  topics() {
    const topics = [];
    this.topicIndex.forEach((topic) => {
      if (Array.isArray(topic)) {
        topic.forEach((parallelTopic) => {
          topics.push(this.createLessonJsx(parallelTopic));
        });
      } else {
        topics.push(this.createLessonJsx(topic));
      }
    });
    return topics;
  }

  componentDidMount() {
    this.centerTopics();
    // window.addEventListener('resize', this.centerTopics.bind(this));
    this.scrollToSelected();
  }

  scrollToSelected() {
    const navScroll = document
      .getElementById(`id_navigator__scroll_container_${this.learningPath}`);
    const navigatorContainer = document
      .getElementById(`id_navigator__container_${this.learningPath}`);
    if (navScroll != null && navigatorContainer != null) {
      const navRect = navigatorContainer.getBoundingClientRect();
      const xMargin = Math.min(
        this.tileWidth,
        navRect.width / 2 - this.tileWidth / 2,
      );
      const yMargin = (navRect.height - this.topicTilesBounds.height) / 2;
      if (this.selected !== '') {
        navScroll.scrollLeft = this.selectedTopic.location.x + xMargin
                               - navScroll.clientWidth / 2 + this.tileWidth / 2;
        navScroll.scrollTop = this.selectedTopic.location.y + yMargin
                               - navScroll.clientHeight / 2 + this.tileHeight / 2;
      } else {
        navScroll.scrollLeft = this.topicArray[0].location.x + xMargin
                               - navScroll.clientWidth / 2 + this.tileWidth / 2;
        navScroll.scrollTop = this.topicArray[0].location.y + yMargin
                               - navScroll.clientHeight / 2 + this.tileHeight / 2;
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  centerTopics() {
    const navigatorContainer = document
      .getElementById(`id_navigator__container_${this.learningPath}`);
    const topicsContainer =
      document.getElementById(`id_navigator__topics_positions_container_${this.learningPath}`);
    if (topicsContainer != null && navigatorContainer != null) {
      const navRect = navigatorContainer.getBoundingClientRect();
      const navHeight = navRect.height;
      // const xMargin = navRect.width / 2 - this.tileWidth / 2;
      const xMargin = Math.min(this.tileWidth, navRect.width / 2 - this.tileWidth / 2);
      topicsContainer.style.left = `${xMargin}px`;
      topicsContainer.style.top = `${(navHeight - this.topicTilesBounds.height) / 2}px`;
      topicsContainer.style.width = `${this.topicTilesBounds.width + xMargin}px`;
      topicsContainer.style.height = `${this.topicTilesBounds.height}px`;
    }
  }

  getLessonTilesBounds() {
    let xMax = 0;
    let yMax = 0;
    let yMin = 0;
    let xMin = 0;
    let firstElement = true;
    this.topicArray.forEach((topic) => {
      if (firstElement) {
        xMin = topic.location.x;
        xMax = topic.location.x + this.tileWidth;
        yMin = topic.location.y;
        yMax = topic.location.y + this.tileHeight;
        firstElement = false;
      } else {
        if (topic.location.x + this.tileWidth > xMax) {
          xMax = topic.location.x + this.tileWidth;
        }
        if (topic.location.y + this.tileHeight > yMax) {
          yMax = topic.location.y + this.tileHeight;
        }
        if (topic.location.y < yMin) {
          yMin = topic.location.y;
        }
      }
    });
    yMin -= this.tileVSpace;
    yMax += this.tileVSpace;
    xMin -= this.tileHSpace;
    xMax += this.tileHSpace;
    this.topicTilesBounds = new Rect(xMin, yMin, xMax - xMin, yMax - yMin);
  }

  renderSubText() {
    if (this.props.includeSubText == null || this.props.includeSubText) {
      return <div className='navigator__topic_title_subtext'>
                {'Learning path'}
      </div>;
    }
    return '';
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const classStr = 'naviagator__container navigator__container_with_shadow';
    return <div>
        {this.renderSubText()}
        <div className="navigator__topic_title_container">
          <img src={`/static/dist/${this.learningPathPath}/topic.png`}
               className="navigator__topic_title_img"
               alt={`Icon for ${this.learningPathName}`}/>
          <div className='navigator__topic_title'>
            <div className='navigator__topic_title_text'>
              {this.learningPathName}
            </div>
          </div>
        </div>
        <div id={`id_navigator__container_${this.learningPath}`} className={classStr}>
        <div className="navigator__left_side" />
        <div className="navigator__right_side" />
        <div id={`id_navigator__scroll_container_${this.learningPath}`} className="navigator__scroll_container">
          <div id={`id_navigator__topics_positions_container_${this.learningPath}`} className="navigator__topics_positions_container">
              {this.topics()}
          </div>
        </div>
      </div>
    </div>;
  }
}
