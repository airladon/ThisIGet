// @flow
// import Fig from 'figureone';
import PresentationFormat from './PresentationFormat';

class InteractiveVideoFormat extends PresentationFormat {

  nextSection(message: ?string = null) {
    if (this.diagram == null) {
      return;
    }
    const { recorder } = this.diagram;
    if (recorder && recorder.state === 'recording') {
      recorder.recordSlide('slide', ['next', message, Math.min(this.currentSectionIndex + 1, this.content.sections.length)]);
    }
    super.nextSection(message);
  }

  prevSection(message: ?string = null) {
    if (this.diagram == null) {
      return;
    }
    const { recorder } = this.diagram;
    if (recorder && recorder.state === 'recording') {
      recorder.recordSlide('slide', ['prev', message, Math.max(this.currentSectionIndex - 1, 0)]);
    }
    super.prevSection(message);
  }

  goToSection(sectionId: number | string) {
    if (this.diagram == null) {
      return;
    }
    const { recorder } = this.diagram;
    if (recorder && recorder.state === 'recording') {
      recorder.recordSlide('slide', ['goto', '', sectionId]);
    }
    super.goToSection(sectionId);
  }

  getCurrentSlide() {
    return this.currentSectionIndex;
  }

  initialize() {
    super.initialize();
    if (this.diagram == null) {
      return;
    }
    const { recorder } = this.diagram;
    if (recorder) {
      const processSlide = (payload) => {
        const [direction, message, slideNo] = payload;
        if (direction === 'next' && this.getCurrentSlide() === slideNo - 1) {
          this.nextSection(message);
        } else if (direction === 'prev' && this.getCurrentSlide() === slideNo + 1) {
          this.prevSection(message);
        } else {
          this.goToSection(slideNo);
        }
      };
      recorder.addEventType('slide', processSlide, true)
      // recorder.nextSlide = this.nextSection.bind(this);
      // recorder.prevSlide = this.prevSection.bind(this);
      // recorder.goToSlide = this.goToSection.bind(this);
      // recorder.getCurrentSlide = this.getCurrentSlide.bind(this);
      recorder.seek(0);
      recorder.unpauseDiagram();
      this.diagram.animateNextFrame();
    }
  }
}

export default InteractiveVideoFormat;
