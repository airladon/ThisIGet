// import Fig from 'figureone';
import PresentationFormat from './PresentationFormat';

class InteractiveVideoFormat extends PresentationFormat {

  nextSection(message: ?string = null) {
    const { recorder } = this.diagram;
    if (recorder && recorder.isRecording) {
      recorder.recordSlide('next', message, Math.min(this.currentSectionIndex + 1, this.content.sections.length));
    }
    super.nextSection(message);
  }

  prevSection(message: ?string = null) {
    const { recorder } = this.diagram;
    if (recorder && recorder.isRecording) {
      recorder.recordSlide('prev', message, Math.max(this.currentSectionIndex - 1, 0));
    }
    super.prevSection(message);
  }

  goToSection(sectionId: number | string) {
    const { recorder } = this.diagram;
    if (recorder && recorder.isRecording) {
      recorder.recordSlide('goto', '', sectionId);
    }
    super.goToSection(sectionId);
  }

  getCurrentSlide() {
    return this.currentSectionIndex;
  }

  initialize() {
    super.initialize();
    const { recorder } = this.diagram;
    if (recorder) {
      recorder.nextSlide = this.nextSection.bind(this);
      recorder.prevSlide = this.prevSection.bind(this);
      recorder.goToSlide = this.goToSection.bind(this);
      recorder.getCurrentSlide = this.getCurrentSlide.bind(this);
      recorder.seek(0);
      recorder.unpauseDiagram();
      this.diagram.animateNextFrame();
    }
  }
}

export default InteractiveVideoFormat;
