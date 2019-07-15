// @flow
import * as React from 'react';
import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill
import Fig from 'figureone';
// import '../../css/style.scss';
import LessonTile from './lessonTile';
import LessonDescription from '../Lesson/lessonDescription';
import makeLessonTree from '../Lesson/lessonTree';


const { Point, Rect } = Fig;
const { getDefinedCSSVariables } = Fig.tools.css;

type Props = {
  learningPath: string;
  selected?: ?string;
};

type State = {
  lessonIndex: Array<Array<LessonDescription>>;
};

export default class LessonNavigator extends React.Component
                                    <Props, State> {
  selected: string;
  lessonTrees: Object;
  key: number;
  selectedLesson: LessonDescription;
  lessonArray: Array<LessonDescription>;
  asTitle: boolean
  lessonTilesBounds: Rect;
  tileWidth: number;
  tileHeight: number;
  tileVSpace: number;
  tileHSpace: number;
  learningPath: string;
  learningPathPath: string;
  learningPathName: string;

  constructor(props: Props) {
    super(props);
    // this.lessonTrees = makeLessonTree();
    // this.lessonIndex = this.lessonTrees[props.learningPath].tree;
    this.learningPathPath = props.learningPath;
    this.learningPathName = props.learningPath.split('/')[1].replace('_', ' ');
    this.getVariables();
    this.state = { lessonIndex: [] };
    // this.layoutLessonTiles();
    this.key = 0;
    this.selected = props.selected || '';
    this.asTitle = false;
    if (this.selected !== '') {
      this.asTitle = true;
    }
    this.learningPath = props.learningPath;
    this.getLearningPath(props.learningPath.split('/')[1]);
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

  getLearningPath(learningPathUid: string) {
    const link = `/learningPath/${learningPathUid}`;
    fetchPolyfill(link, { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.error == null) {
          // console.log(data)
          const lessonIndex = makeLessonTree(data);
          console.log(lessonIndex)
          this.layoutLessonTiles(lessonIndex);
          this.setState({ lessonIndex });
        }
      })
      .catch(() => {});
  }

  layoutLessonTiles(lessonIndex: Array<Array<LessonDescription>>) {
    this.lessonArray = [];
    // const y = this.tileHeight * 2 + vSpace * 2;
    const width = this.tileWidth;
    const height = this.tileHeight;
    const vSpace = this.tileVSpace;
    const hSpace = this.tileHSpace;
    let x = hSpace;
    this.lessonArray = [];
    let maxParallel = 1;
    lessonIndex.forEach((lesson) => {
      if (Array.isArray(lesson)) {
        if (lesson.length > maxParallel) {
          maxParallel = lesson.length;
        }
      }
    });
    const yMiddle = (maxParallel * this.tileHeight
                    + (maxParallel - 1) * vSpace
                    + vSpace * 2) / 2;

    lessonIndex.forEach((lesson) => {
      if (Array.isArray(lesson)) {
        const len = lesson.length;
        const totalHeight = len * height + (len - 1) * vSpace;
        let yStart = yMiddle - totalHeight / 2 + height / 2;
        if (yStart < yMiddle - 2 * height - 2 * vSpace) {
          yStart = yMiddle - 2 * height - 2 * vSpace;
        }
        lesson.forEach((parallelLesson, index) => {
          const yLocation = yStart + index * (height + vSpace);
          // eslint-disable-next-line no-param-reassign
          parallelLesson.location = new Point(x, yLocation - this.tileHeight / 2);
          this.lessonArray.push(parallelLesson);
        });
      } else {
        // eslint-disable-next-line no-param-reassign
        lesson.location = new Point(x, yMiddle - this.tileHeight / 2);
        this.lessonArray.push(lesson);
      }
      x += width + hSpace;
    });

    this.getLessonTilesBounds();
  }

  createLessonJsx(lesson: LessonDescription) {
    this.key += 1;
    let state = '';
    const { x, y } = lesson.location;
    if (lesson.title === this.selected) {
      state = 'selected';
      this.selectedLesson = lesson;
    }
    let { title } = lesson;
    if (lesson.enabled === false) {
      state = 'disabled';
      title = `${title}`;
    }

    let linkToUse = '';
    const topicsOrder = ['explanation', 'summary', 'examples', 'links'];
    const versionsOrder = ['base', 'static'];
    console.log(lesson.topics)
    const getVersion = (topic) => {
      console.log(topic)
      const versions = lesson.topics[topic];
      for (let i = 0; i < versionsOrder.length; i += 1) {
        const version = versionsOrder[i];
        console.log(version, versions)
        if (version in versions) {
          linkToUse = `${lesson.path}/${lesson.uid}/${topic}/${version}`;
          return;
        }
      }
      if (linkToUse === '' && Object.keys(versions).length > 0) {
        linkToUse = `${lesson.path}/${lesson.uid}/${topic}/${Object.keys(versions)[0]}`;
      }
    };

    for (let t = 0; t < topicsOrder.length; t += 1) {
      const topic = topicsOrder[t];
      if (topic in lesson.topics) {
        getVersion(topic);
        if (linkToUse !== '') {
          break;
        }
      }
    }

    if (linkToUse === '' && Object.keys(lesson.topics).length > 0) {
      getVersion(lesson.topics[0]);
    }

    if (linkToUse === '') {
      state = 'disabled';
    }

    return <LessonTile
              id={lesson.id}
              link={linkToUse}
              imgLink={lesson.imgLink}
              imgLinkSelected={lesson.imgLinkSelected}
              imgLinkDisabled={lesson.imgLinkDisabled}
              key={this.key}
              label={title}
              state={state}
              left={`${x}px`}
              top={`${y}px`}
              title={false}
            />;
  }

  lessons() {
    const lessons = [];
    this.state.lessonIndex.forEach((lesson) => {
      if (Array.isArray(lesson)) {
        lesson.forEach((parallelLesson) => {
          lessons.push(this.createLessonJsx(parallelLesson));
        });
      } else {
        lessons.push(this.createLessonJsx(lesson));
      }
    });
    return lessons;
  }

  componentDidUpdate() {
    if (this.state.lessonIndex.length > 0) {
      this.centerLessons();
      // window.addEventListener('resize', this.centerLessons.bind(this));
      this.scrollToSelected();
    }
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
      const yMargin = (navRect.height - this.lessonTilesBounds.height) / 2;
      if (this.selected !== '') {
        navScroll.scrollLeft = this.selectedLesson.location.x + xMargin
                               - navScroll.clientWidth / 2 + this.tileWidth / 2;
        navScroll.scrollTop = this.selectedLesson.location.y + yMargin
                               - navScroll.clientHeight / 2 + this.tileHeight / 2;
      } else {
        navScroll.scrollLeft = this.lessonArray[0].location.x + xMargin
                               - navScroll.clientWidth / 2 + this.tileWidth / 2;
        navScroll.scrollTop = this.lessonArray[0].location.y + yMargin
                               - navScroll.clientHeight / 2 + this.tileHeight / 2;
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  centerLessons() {
    const navigatorContainer = document
      .getElementById(`id_navigator__container_${this.learningPath}`);
    const lessonsContainer =
      document.getElementById(`id_navigator__lessons_positions_container_${this.learningPath}`);
    if (lessonsContainer != null && navigatorContainer != null) {
      const navRect = navigatorContainer.getBoundingClientRect();
      const navHeight = navRect.height;
      // const xMargin = navRect.width / 2 - this.tileWidth / 2;
      const xMargin = Math.min(this.tileWidth, navRect.width / 2 - this.tileWidth / 2);
      lessonsContainer.style.left = `${xMargin}px`;
      lessonsContainer.style.top = `${(navHeight - this.lessonTilesBounds.height) / 2}px`;
      lessonsContainer.style.width = `${this.lessonTilesBounds.width + xMargin}px`;
      lessonsContainer.style.height = `${this.lessonTilesBounds.height}px`;
    }
  }

  getLessonTilesBounds() {
    let xMax = 0;
    let yMax = 0;
    let yMin = 0;
    let xMin = 0;
    let firstElement = true;
    this.lessonArray.forEach((lesson) => {
      if (firstElement) {
        xMin = lesson.location.x;
        xMax = lesson.location.x + this.tileWidth;
        yMin = lesson.location.y;
        yMax = lesson.location.y + this.tileHeight;
        firstElement = false;
      } else {
        if (lesson.location.x + this.tileWidth > xMax) {
          xMax = lesson.location.x + this.tileWidth;
        }
        if (lesson.location.y + this.tileHeight > yMax) {
          yMax = lesson.location.y + this.tileHeight;
        }
        if (lesson.location.y < yMin) {
          yMin = lesson.location.y;
        }
      }
    });
    yMin -= this.tileVSpace;
    yMax += this.tileVSpace;
    xMin -= this.tileHSpace;
    xMax += this.tileHSpace;
    this.lessonTilesBounds = new Rect(xMin, yMin, xMax - xMin, yMax - yMin);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const classStr = 'naviagator__container navigator__container_with_shadow';
    return <div>
        <div className='navigator__topic_title_subtext'>
                {'Learning path'}
        </div>
        <div className="navigator__topic_title_container">
          <img src={`/static/dist/Lessons/${this.learningPathPath}/topic.png`}
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
          <div id={`id_navigator__lessons_positions_container_${this.learningPath}`} className="navigator__lessons_positions_container">
              {this.lessons()}
          </div>
        </div>
      </div>
    </div>;
  }
}
