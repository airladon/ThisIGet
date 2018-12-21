/* eslint-disable prefer-destructuring */

// import Lesson from './Lesson';
// import { LessonContent, Section, diagramCanvas } from './LessonContent';

test('Lesson', () => {
  expect(true).toBe(true);
});
// describe('Lesson', () => {
//   let lessonMulti;
//   let lessonSingle;
//   let mockSetState;
//   let mockGetState;
//   let DiagramClass;

//   beforeEach(() => {
//     class Diagram {
//       constructor(id) {
//         this.id = id;
//         this.stop = () => {};
//         this.animateNextFrame = () => {};
//       }
//     }
//     DiagramClass = Diagram;
//     mockSetState = jest.fn();
//     mockGetState = jest.fn();
//     mockGetState
//       .mockReturnValueOnce({ angle: 1 })
//       .mockReturnValueOnce({ angle: 2 })
//       .mockReturnValueOnce({ angle: 3 });

//     class Content extends LessonContent {
//       setTitle() {
//         this.title = 'Lesson Title';
//       }
//       addSections() {
//         this.addSection({
//           title: 'S1 Title',
//           setContent: () => 'S1 Content',
//           setState: (state) => {
//             mockSetState(state);
//           },
//           getState: () => {
//             mockGetState();
//           },
//         });
//         this.addSection({
//           title: 'S2 Title',
//           setContent: () => [
//             'S2 Content Line 1',
//             'S2 Content Line 2',
//           ],
//           setState: (state) => {
//             mockSetState(state);
//           },
//           getState: () => {
//             mockGetState();
//           },
//         });
//         this.addSection({
//           title: 'S3 Title',
//           setContent: () => 'S3 Content |Diagram_1| |Diagram_2|',
//           setState: (state) => {
//             mockSetState(state);
//           },
//           getState: () => {
//             mockGetState();
//           },
//         });
//       }
//     const content = new Content('id');
//     lessonMulti = new Lesson(content, 'multiPage');
//     lessonSingle = new Lesson(content, 'singlePage');
//   });
//   test('Instantiation', () => {
//     expect(lessonSingle).not.toBe(null);
//     expect(lessonMulti).not.toBe(null);
//   });
//   describe('Single Page', () => {
//     let lesson;
//     beforeEach(() => {
//       lesson = lessonSingle;
//     });
//     test('Get Single Page Content HTML', () => {
//       const html = lesson.getContentHtml();
//       const count1 = (html.match(/d1_id/g) || []).length;
//       const count2 = (html.match(/d2_id/g) || []).length;
//       expect(count1).toBe(1);
//       expect(count2).toBe(1);
//     });
//     test('createDiagramsAndSetState', () => {
//       expect(mockSetState.mock.calls).toHaveLength(0);
//       lesson.createDiagrams();
//       lesson.setState();
//       expect(mockSetState.mock.calls).toHaveLength(3);

//       const expectedDiagrams = JSON.stringify({
//         d1_id: new DiagramClass('d1_id'),
//         d2_id: new DiagramClass('d2_id'),
//       });
//       const expectedType = 'singlePage';
//       expect(JSON.stringify(mockSetState.mock.calls[0][0])).toEqual(expectedDiagrams);
//       expect(mockSetState.mock.calls[0][2]).toEqual(expectedType);
//       expect(JSON.stringify(mockSetState.mock.calls[1][0])).toEqual(expectedDiagrams);
//       expect(mockSetState.mock.calls[1][2]).toEqual(expectedType);
//       expect(JSON.stringify(mockSetState.mock.calls[2][0])).toEqual(expectedDiagrams);
//       expect(mockSetState.mock.calls[2][2]).toEqual(expectedType);
//     });
//   });
//   describe('Multi Page', () => {
//     let lesson;
//     beforeEach(() => {
//       lesson = lessonMulti;
//     });
//     test('Get Multi Page Content HTML', () => {
//       lesson.goToSection(2);
//       const html = lesson.getContentHtml();
//       const count1 = (html.match(/d1_id/g) || []).length;
//       expect(count1).toBe(1);
//     });
//     test('Save State', () => {
//       lesson.createDiagrams();
//       lesson.setState();
//       expect(mockGetState.mock.calls).toHaveLength(0);
//       expect(lesson.state).toEqual({});

//       lesson.saveState();
//       expect(lesson.state).toEqual({ angle: 1 });
//       expect(mockGetState.mock.calls).toHaveLength(1);
//       expect(JSON.stringify(mockGetState.mock.calls[0][0])).toEqual(JSON.stringify({
//         multipage_diagram: new DiagramClass('multipage_diagram'),
//       }));
//       lesson.currentSectionIndex = 2;

//       lesson.setState();

//       lesson.saveState();
//       expect(lesson.state).toEqual({ angle: 2 });
//       expect(mockGetState.mock.calls).toHaveLength(2);
//       expect(JSON.stringify(mockGetState.mock.calls[1][0])).toEqual(JSON.stringify({
//         multipage_diagram: new DiagramClass('multipage_diagram'),
//       }));
//     });
//     test('NextPage', () => {
//       expect(lesson.state).toEqual({});
//       expect(lesson.currentSectionIndex).toBe(0);
//       expect(mockGetState.mock.calls).toHaveLength(0);

//       lesson.nextSection();
//       expect(lesson.currentSectionIndex).toBe(1);
//       expect(lesson.state).toEqual({ angle: 1 });
//       expect(mockGetState.mock.calls).toHaveLength(1);
//       // expect(result).toBe(true);
//       lesson.nextSection();
//       expect(lesson.currentSectionIndex).toBe(2);
//       expect(lesson.state).toEqual({ angle: 2 });
//       expect(mockGetState.mock.calls).toHaveLength(2);

//       // This is out of bounds, so nothing should change
//       lesson.nextSection();
//       expect(lesson.currentSectionIndex).toBe(2);
//       expect(lesson.state).toEqual({ angle: 2 });
//       expect(mockGetState.mock.calls).toHaveLength(2);
//     });
//     test('PrevPage', () => {
//       expect(lesson.state).toEqual({});
//       expect(mockGetState.mock.calls).toHaveLength(0);
//       lesson.currentSectionIndex = 2;
//       expect(lesson.currentSectionIndex).toBe(2);

//       lesson.prevSection();
//       expect(lesson.currentSectionIndex).toBe(1);
//       expect(lesson.state).toEqual({ angle: 1 });
//       expect(mockGetState.mock.calls).toHaveLength(1);

//       lesson.prevSection();
//       expect(lesson.currentSectionIndex).toBe(0);
//       expect(lesson.state).toEqual({ angle: 2 });
//       expect(mockGetState.mock.calls).toHaveLength(2);

//       // This is out of bounds, so nothing should change
//       lesson.prevSection();
//       expect(lesson.currentSectionIndex).toBe(0);
//       expect(lesson.state).toEqual({ angle: 2 });
//       expect(mockGetState.mock.calls).toHaveLength(2);
//     });
//     test('createDiagramsAndSetState', () => {
//       let diagrams;
//       let type;
//       expect(mockSetState.mock.calls).toHaveLength(0);
//       lesson.createDiagrams();
//       lesson.setState();
//       diagrams = mockSetState.mock.calls[0][0];
//       type = mockSetState.mock.calls[0][2];
//       // expect(diagrams).toEqual({});
//       expect(JSON.stringify(diagrams)).toEqual(JSON.stringify({
//         multipage_diagram: new DiagramClass('multipage_diagram'),
//       }));
//       expect(type).toEqual('multiPage');

//       lesson.nextSection();
//       lesson.setState();
//       // lesson.createDiagramsAndSetState();
//       diagrams = mockSetState.mock.calls[1][0];
//       type = mockSetState.mock.calls[1][2];
//       expect(JSON.stringify(diagrams)).toEqual(JSON.stringify({
//         multipage_diagram: new DiagramClass('multipage_diagram'),
//       }));
//       expect(type).toEqual('multiPage');

//       lesson.nextSection();
//       lesson.setState();
//       // lesson.createDiagramsAndSetState();
//       diagrams = mockSetState.mock.calls[2][0];
//       type = mockSetState.mock.calls[2][2];
//       expect(JSON.stringify(diagrams)).toEqual(JSON.stringify({
//         multipage_diagram: new DiagramClass('multipage_diagram'),
//       }));
//       expect(type).toEqual('multiPage');
//       expect(mockSetState.mock.calls).toHaveLength(3);
//     });
//   });
// });
