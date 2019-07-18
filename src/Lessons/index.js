export default function lessonIndex() {
  return {
    Angle: {
      title: 'Angles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Angle',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: 'Introduction to Angles.',
            htmlTitle: 'Introduction to Angles',
            htmlDescription: 'Introduction to the concept of angle',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: 'Summary of Angles introduction',
            htmlTitle: 'Summary of Angles introduction',
            htmlDescription: 'Definition of an angle and where the name comes from',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Circle',
      ],
      enabled: true,
    },
    Area: {
      title: 'Area and Rectangles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Area',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Introduction to area, rectangle area and square area',
            htmlDescription: 'Concept of area, why they it is measured in squares and why areas of rectangles and squares are what they are',
            fullLesson: true,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Create an area',
            description: '',
            htmlTitle: 'Quiz: Create a rectangle or square with area',
            htmlDescription: 'Create a rectangle or square that has some defined area on this dynamic page',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Summary of area, rectangle area and square area.',
            htmlDescription: 'Summary of area concept, and equations for rectangle area and square area',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'RectanglesAndSquares',
      ],
      enabled: true,
    },
    AreaCircle: {
      title: 'Area of a Circle',
      path: '/Lessons/Math/Geometry_1',
      uid: 'AreaCircle',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Intuitive derivation of circle area',
            htmlDescription: 'Find the equation for circle area using triangles',
            fullLesson: true,
          },
          static: {
            type: 'singlePage',
            title: 'Single Page Full explanation',
            description: '',
            htmlTitle: 'Intuitive derivation of circle area in a single page',
            htmlDescription: 'Using triangles, find the equation to area of a circle',
            fullLesson: true,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Quiz: Calculate the circle property',
            htmlDescription: 'Calculate circle property from either the radius, diameter, area or circumference',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Summary of Circle Area',
            htmlDescription: 'Area of a circle equation',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'AreaTriangle',
      ],
      enabled: true,
    },
    AreaTriangle: {
      title: 'Area of a Triangle',
      path: '/Lessons/Math/Geometry_1',
      uid: 'AreaTriangle',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Triangle Area derivation and proof',
            htmlDescription: 'Explanation on why area of a triangle is what it is',
            fullLesson: true,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Make triangle with target area',
            description: '',
            htmlTitle: 'Quiz - Create a triangle with a given area',
            htmlDescription: 'Drag the corners of a triangle to change its height and base to get the target area',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Area of a triangle',
            htmlDescription: 'Summary of triangle area',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Area',
      ],
      enabled: true,
    },
    Circle: {
      title: 'Circles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Circle',
      topics: {
        examples: {
          static: {
            type: 'singlePage',
            title: 'Circle Radius, Diameter and Circumference',
            description: 'Examples calculations of diameter, radius and circumference',
            htmlTitle: 'Example calculations of radius, diameter and circumference',
            htmlDescription: 'Examples showing how to calculate radius, diameter and circumference of circles from known properties',
            fullLesson: true,
          },
        },
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: 'Presentation form - interactive.',
            htmlTitle: 'Introduction to circles, their history and properties',
            htmlDescription: 'Introduction to circle, diameter, radius, circumference, center point. Relationships between radius, diameter and circumference.',
            fullLesson: true,
          },
        },
        links: {
          base: {
            type: 'generic',
            title: 'External',
            description: 'External links to information on circles',
            htmlTitle: 'Circles, circle properties and relationships links',
            htmlDescription: 'Explanations, proofs, examples and questions about Circles',
            fullLesson: false,
          },
        },
        quiz: {
          calcProperties: {
            type: 'singlePage',
            title: 'Calculate Properties',
            description: 'Calculate properties of a circle from other properties',
            htmlTitle: 'Calculate circle properties',
            htmlDescription: 'Calculate properties of a circle from other properties',
            fullLesson: true,
          },
          identifyProperties: {
            type: 'presentation',
            title: 'Identify Properties',
            description: 'Identify the properties of a circle.',
            htmlTitle: 'Quiz - Identify the circle property',
            htmlDescription: 'Given four different properties, click on the one that is requested',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Circle Properties',
            description: 'Presentation form - interactive.',
            htmlTitle: 'Properties of a circle summary',
            htmlDescription: 'Diameter, circumference, radius and center point, and the relationships between them',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Introduction',
      ],
      enabled: true,
    },
    CombinationAngles: {
      title: 'Combination Angles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'CombinationAngles',
      topics: {
        examples: {
          base: {
            type: 'singlePage',
            title: 'Example problems with complementary, supplementary and explementary angles',
            description: '',
            htmlTitle: 'Example problems with complementary angles, supplementary angles and explementary angles',
            htmlDescription: 'Identify and calculate complementary, supplementary and explementary angles',
            fullLesson: true,
          },
        },
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: 'Explanation of complementary, supplementary, and explementary angles.',
            htmlTitle: 'Complementary, supplementary and explementary angles explanation',
            htmlDescription: 'What are complementary angles, supplementary angles and explementary angles',
            fullLesson: true,
          },
        },
        links: {
          base: {
            type: 'generic',
            title: 'External Links to Combination Angles',
            description: 'External links to sources of information for Combination Angles>',
            htmlTitle: 'Adjacent Angles, Complementary Angles, Supplementary Angles and Explementary Angles Links',
            htmlDescription: 'Explanations, proofs, examples and questions about adjacent angles',
            fullLesson: false,
          },
        },
        quiz: {
          base: {
            type: 'singlePage',
            title: 'Complementary, Supplementary and Explementary Angles',
            description: 'Questions to identify and calculate complementary, supplementary and explementary angles',
            htmlTitle: 'Complementary, Supplementary and Explementary angles quiz',
            htmlDescription: 'Identify and calculate angles that are complementary, supplementary and explementary',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Complementary, Supplementary and Explementary Angles.',
            description: 'Summary of complementary, supplementary and explementary Angles.',
            htmlTitle: 'Complementary, supplementary and explementary angles summary',
            htmlDescription: 'Summary of complementary angles, supplementary angles and explementary angles',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'ImportantAngles',
      ],
      enabled: true,
    },
    CongruentTriangles: {
      title: 'Congruent Triangles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'CongruentTriangles',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Congruent triangles and how to determine congruency',
            htmlDescription: 'Introduction to congruent triangles and intuitive reasoning behind the SAS, SSA, ASA, AAS, SSS, AAA congruency tests',
            fullLesson: true,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Quiz - Determine if two triangles are congruent',
            htmlDescription: 'Given three properties of two triangles, can you determine if they are congruent?',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Summary of congruent triangles and SAS, SSA, ASA, AAS, SSS, AAA',
            htmlDescription: 'Facts only summary of congruent triangles and congruent triangle tests',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Triangles',
      ],
      enabled: true,
    },
    Degrees: {
      title: 'Degrees',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Degrees',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Explanation on why we use degrees as a measure of angle',
            htmlDescription: 'How angle is measured, why use degrees and common angles in degrees',
            fullLesson: true,
          },
        },
        links: {
          base: {
            type: 'generic',
            title: 'External',
            description: 'External links to sources of information for Degrees',
            htmlTitle: 'Measuring angles in degrees links',
            htmlDescription: 'Explanations, and examples about measuring angles in degrees',
            fullLesson: false,
          },
        },
        quiz: {
          base: {
            type: 'singlePage',
            title: 'General Questions about Degrees',
            description: 'Answer general questions about measuring angle and degrees',
            htmlTitle: 'Quiz - Measuring angles and degrees',
            htmlDescription: 'Answer general questions about measuring angle and degrees',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Summary of using degrees to measure angle',
            htmlDescription: 'History of word, interactive diagram to see different angles in degrees',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Angle',
      ],
      enabled: true,
    },
    Equilateral: {
      title: 'Equilateral Triangle',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Equilateral',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Equilateral triangle derivation from an isosceles triangle',
            htmlDescription: 'Use isosceles triangles to show the properties of an equilateral triangle, and the relationship of its angles',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Equilateral triangle summary',
            htmlDescription: 'Interactive diagram showing properties of an equilateral triangle',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Isosceles',
      ],
      enabled: true,
    },
    ExternalAngles: {
      title: 'External Angle of a Triangle',
      path: '/Lessons/Math/Geometry_1',
      uid: 'ExternalAngles',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'External angles (also called exterior angles) in a triangle explanation through presentation',
            htmlDescription: 'Proof of external angles in a triangle equalling sum of opposite internal angles',
            fullLesson: true,
          },
          simple: {
            type: 'singlePage',
            title: 'Full explanation in single page',
            description: '',
            htmlTitle: 'External angles (also called exterior angles)  in a triangle as a single page explanation',
            htmlDescription: 'Proof of external angles in a triangle equalling sum of opposite internal angles',
            fullLesson: true,
          },
        },
        links: {
          base: {
            type: 'generic',
            title: 'External',
            description: 'External links to sources of information for External Angles of Triangles',
            htmlTitle: 'Links for external angles of a triangle',
            htmlDescription: 'Links with explanations, examples and proofs for external angles of a triangle',
            fullLesson: false,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Quiz - find the external angle of a triangle',
            htmlDescription: 'Find the external angle (also called exterior angle) in a triangle quiz',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'External angle summary',
            description: '',
            htmlTitle: 'Summary of triangle external angle (or exterior angle)',
            htmlDescription: 'Interactive diagram showing and describing the external angle of a triangle',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Triangles',
      ],
      enabled: true,
    },
    ImportantAngles: {
      title: 'Important Angles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'ImportantAngles',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Right Angle, Acute Angle, Obtuse Angle, Reflex Angle, Straight Angle, Full Angle',
            htmlDescription: 'Dynamic diagram that lets you explore the different types of important angles',
            fullLesson: true,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Quiz - set the angle to be either acute, right, obtuse, straight, reflex or full',
            htmlDescription: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Degrees',
      ],
      enabled: true,
    },
    IntersectionAngles: {
      title: 'Intersection Angles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'IntersectionAngles',
      topics: {
        examples: {
          base: {
            type: 'singlePage',
            title: 'Examples of related angles',
            description: 'Examples of calculating opposite, corresponding, alternate and interior angles',
            htmlTitle: 'Opposite angles, corresponding angles, alternate angles and interior angles calculation examples',
            htmlDescription: 'Examples of finding angles in different geometries using the concepts of opposite, corresponding, alternate, interior and supplementary angles',
            fullLesson: true,
          },
        },
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Opposite angles, corresponding angles, alternate angles and interior angles',
            htmlDescription: 'Introduction to opposite, corresponding, alternate and interior angles and their proofs',
            fullLesson: true,
          },
        },
        links: {
          base: {
            type: 'generic',
            title: 'External',
            description: 'External links to sources of information for opposite, corresponding, alternate and interior angles',
            htmlTitle: 'Opposite angles, corresponding angles, alternate angles and interior angles links',
            htmlDescription: 'Various external links covering definition and examples of opposite, corresponding, alternate and interior angles when two or three lines intersect',
            fullLesson: false,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Simple geometries',
            description: '',
            htmlTitle: 'Quiz - Find the unknown angle in a system of opposite, corresponding, alternate and interior angles',
            htmlDescription: 'Dynamic quiz where no two questions are the same',
            fullLesson: true,
          },
          complex: {
            type: 'singlePage',
            title: 'More complex geometries',
            description: 'Find angles using opposite, corresponding, alternate, interior and supplementary angles',
            htmlTitle: 'Examples using opposite angles, corresponding angles, alternate angles, interior angles and supplementary angles',
            htmlDescription: 'Find angles using opposite, corresponding, alternate, interior and supplementary angles',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Summary of opposite, corresponding, adjacent and interior angles',
            htmlDescription: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'ParallelLines',
      ],
      enabled: true,
    },
    Introduction: {
      title: 'Why Study Shapes?',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Introduction',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Descriptive',
            description: 'Motivation to studying shapes.',
            htmlTitle: 'Why Study Shapes?',
            htmlDescription: 'Introduction to shapes, naming, history and why we should study them',
            fullLesson: true,
          },
          singlePage: {
            type: 'singlePage',
            title: 'Descriptive - Single Page',
            description: 'Motivation to studying shapes.',
            htmlTitle: 'Why Study Shapes?',
            htmlDescription: 'Introduction to shapes, naming, history and why we should study them',
            fullLesson: true,
          },
        },
      },
      dependencies: [
      ],
      enabled: true,
    },
    Isosceles: {
      title: 'Isosceles Triangle',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Isosceles',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Isosceles triangles and proof',
            htmlDescription: 'Proof for if two sides are equal why two angles are equal and vise versa',
            fullLesson: true,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Quiz - Find the missing side or angle of an isosceles triangle',
            htmlDescription: 'Given a set of sides and angles, find the missing one',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Summary of Isosceles triangle and its properties',
            htmlDescription: 'Isosceles triangle, side and angle equality, split line properties',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'CongruentTriangles',
      ],
      enabled: true,
    },
    ParallelLineDistance: {
      title: 'Parallel Line Distance',
      path: '/Lessons/Math/Geometry_1',
      uid: 'ParallelLineDistance',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Introduction to the distance between parallel lines',
            htmlDescription: 'Investigate the property of distance between parallel lines',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Summary of parallel line distance property',
            htmlDescription: 'Parallel line distance is the length of the perpendicular line between them',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'PointLineDistance',
      ],
      enabled: true,
    },
    ParallelLines: {
      title: 'Parallel Lines',
      path: '/Lessons/Math/Geometry_1',
      uid: 'ParallelLines',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Interactive introduction to parallel lines',
            htmlDescription: 'See what parallel lines are, and when lines are parallel',
            fullLesson: true,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Quiz - Move lines to be parallel and find parallel lines',
            htmlDescription: 'Interactive quiz to make lines parallel, and find parallel lines in a selection of lines',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Introduction to parallel lines summary',
            htmlDescription: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'CombinationAngles',
      ],
      enabled: true,
    },
    ParallelSplitOfTriangle: {
      title: 'Parallel Split of Triangle',
      path: '/Lessons/Math/Geometry_1',
      uid: 'ParallelSplitOfTriangle',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Descriptive',
            description: '',
            htmlTitle: 'Splitting a triangle with a parallel line',
            htmlDescription: 'Proof that splitting a triangle with a parallel line results in a similar triangle',
            fullLesson: true,
          },
          static: {
            type: 'singlePage',
            title: 'Full Proof',
            description: 'Proof showing the resulting triangle has proportional sides',
            htmlTitle: 'Similar Triangles Proof',
            htmlDescription: 'Proofs showing why equiangular triangles, and proportional triangles are similar',
            fullLesson: true,
          },
        },
        links: {
          base: {
            type: 'generic',
            title: 'External',
            description: 'External links to sources of information for Parallel Split of a Triangle',
            htmlTitle: 'Links: Parallel split of a triangle',
            htmlDescription: 'External links looking at triangle proportionality and parallel splits of a triangle.',
            fullLesson: false,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'External angle summary',
            description: '',
            htmlTitle: 'Splitting a triangle with a parallel line',
            htmlDescription: 'Summary showing splitting a triangle with a parallel line results in a similar triangle',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'ParallelLineDistance',
      ],
      enabled: true,
    },
    PointLineDistance: {
      title: 'Point to Line Distance',
      path: '/Lessons/Math/Geometry_1',
      uid: 'PointLineDistance',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Introduction to distance between a point and line',
            htmlDescription: 'Properties of distance between point and a line',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Summary of point line distance property',
            htmlDescription: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'RightAngleTriangles',
      ],
      enabled: true,
    },
    Quadrangles: {
      title: 'Quadrangles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Quadrangles',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Introduction to quadrangles and quadrilaterals',
            htmlDescription: 'Quadrangles, quadrilaterals and their properties',
            fullLesson: true,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Quiz - Find the unknown angle in the quadrangle',
            htmlDescription: 'Dynamic quiz where no two questions are the same',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Quadrangles (quadrilaterals) summary',
            htmlDescription: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Triangles',
      ],
      enabled: true,
    },
    Radians: {
      title: 'Radians',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Radians',
      topics: {
        examples: {
          static: {
            type: 'singlePage',
            title: 'Example problems using Radians',
            description: 'Use radians to calculate radius, angle and arc length',
            htmlTitle: 'Calculating radius, arc length and angle using radians',
            htmlDescription: 'Example problems showing how to use radians to calculate radius, arc length and angle when given two other circle properties',
            fullLesson: true,
          },
        },
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Introduction to radians and why we use them',
            htmlDescription: 'Radians and their relationship with arc length and radius',
            fullLesson: true,
          },
        },
        links: {
          base: {
            type: 'generic',
            title: 'External',
            description: 'External links to information on radians',
            htmlTitle: 'Links introducing radians',
            htmlDescription: 'Explanations, proofs, examples and questions about radians',
            fullLesson: false,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Change Circle to Match',
            description: '',
            htmlTitle: 'Quiz: Find the arc or angle that matches the target',
            htmlDescription: 'Interactive quiz where you can change the diagram to find the target angle or arc length',
            fullLesson: true,
          },
          calc: {
            type: 'singlePage',
            title: 'Calculate Properties with Radians',
            description: 'Calculate properties of a circle from other properties using radians',
            htmlTitle: 'Calculate circle properties using radians',
            htmlDescription: 'Calculate properties of a circle from other properties using radians',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Summary of what radians are and their relationship to radius and arc length',
            htmlDescription: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Degrees',
      ],
      enabled: true,
    },
    RectanglesAndSquares: {
      title: 'Rectangles and Squares',
      path: '/Lessons/Math/Geometry_1',
      uid: 'RectanglesAndSquares',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Introduction to rectangles and squares and derivation of their properties',
            htmlDescription: 'Proof showing why a rectangles opposite sides are equal and parallel',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Summary of rectangle and square properties',
            htmlDescription: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Quadrangles',
        'CongruentTriangles',
      ],
      enabled: true,
    },
    RightAngleTriangles: {
      title: 'Right Angle Triangles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'RightAngleTriangles',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: 'Properties of right angle triangles, and the Pythagorean theorem.',
            htmlTitle: 'Right angle triangle introduction and pythagoean theorem proof',
            htmlDescription: 'Right angle triangle introduction, hypotenuse, area and pythagorean theorem derivation.',
            fullLesson: true,
          },
          pythagorus_proof: {
            type: 'singlePage',
            title: 'Derivation of Pythagorean Theorem',
            description: 'Derivation using area of four right angle triangles',
            htmlTitle: 'Pythagorean Theorem Derivation',
            htmlDescription: 'Derivation using area of four right angle triangles',
            fullLesson: false,
          },
        },
        links: {
          base: {
            type: 'generic',
            title: 'External',
            description: 'External links to sources of information for Right Angle Triangles',
            htmlTitle: 'Links for Right Angle Triangles',
            htmlDescription: 'External explanations of right angle triangles',
            fullLesson: false,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Find the Unknown Angle',
            description: '',
            htmlTitle: 'Quiz - Find the unknown angle, side or area in a right angle triangle.',
            htmlDescription: 'Dynamic quiz where no two questions are the same',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Properties',
            description: '',
            htmlTitle: 'Right Angle Triangle Summary',
            htmlDescription: 'Right angle triangle definition including hypotenuse, area and pythagorean theorem.',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'AreaTriangle',
      ],
      enabled: true,
    },
    SideAngleRelationship: {
      title: 'Side Angle Relationships',
      path: '/Lessons/Math/Geometry_1',
      uid: 'SideAngleRelationship',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Introduction to relationship between triangle side length and angle',
            htmlDescription: 'Proof of why larger angles are opposite longer sides in a triangle',
            fullLesson: true,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Quiz - Find the largest or smallest side or angle',
            htmlDescription: 'Dynamic quiz where no two questions are the same',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Summary of relationship between side and angle in a triangle',
            htmlDescription: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Isosceles',
      ],
      enabled: true,
    },
    SideSideSide: {
      title: 'Side-Side-Side Congruency',
      path: '/Lessons/Math/Geometry_1',
      uid: 'SideSideSide',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Proof for Side Side Side triangle congruency',
            htmlDescription: 'Proof for SSS or side-side-side congruent triangles',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Congruent triangles by SSS Summary',
            htmlDescription: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Isosceles',
      ],
      enabled: true,
    },
    SimilarTriangles: {
      title: 'Similar Triangles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'SimilarTriangles',
      topics: {
        explanation: {
          equilangularIsSimilarProof: {
            type: 'singlePage',
            title: 'Equilangular Triangles are Similar - Proof 2',
            description: 'Proof showing why equiangular triangles are proportional triangles and therefore similar',
            htmlTitle: 'Equilangular Triangles are Similar Proof',
            htmlDescription: 'Proof showing why equiangular triangles are proportional triangles and therefore similar',
            fullLesson: false,
          },
          equilangularProofBrief: {
            type: 'singlePage',
            title: 'Equilangular Triangles are Similar - Proof 2 (Brief)',
            description: 'Succinct proof showing why equiangular triangles, are proportional triangles and therefore similar',
            htmlTitle: 'Triangles with equal angles are similar proof',
            htmlDescription: 'Succinct proof showing why equiangular triangles, are proportional triangles and therefore similar',
            fullLesson: false,
          },
          static: {
            type: 'singlePage',
            title: 'Descriptive',
            description: 'Proofs showing why equiangular triangles, and proportional triangles are similar',
            htmlTitle: 'Similar Triangles Proof',
            htmlDescription: 'Proofs showing why equiangular triangles, and proportional triangles are similar',
            fullLesson: true,
          },
          staticBrief: {
            type: 'singlePage',
            title: 'In Brief',
            description: 'Succinct proofs showing why equiangular triangles, and proportional triangles are similar',
            htmlTitle: 'Similar Triangles Proof',
            htmlDescription: 'Proofs showing why equiangular triangles, and proportional triangles are similar',
            fullLesson: true,
          },
        },
        links: {
          base: {
            type: 'generic',
            title: 'External Links',
            description: 'External links to sources of information for Similar Triangles',
            htmlTitle: 'Similar Triangles Links',
            htmlDescription: 'Explanations, proofs, examples and questions about Similar Triangles>',
            fullLesson: false,
          },
        },
      },
      dependencies: [
        'ParallelSplitOfTriangle',
      ],
      enabled: false,
    },
    CalculatingPi: {
      title: 'Calculating Pi',
      path: '/Lessons/Math/Geometry_1/ToDo',
      uid: 'CalculatingPi',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: '',
            htmlDescription: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'RightAngleTriangles',
      ],
      enabled: false,
    },
    Triangles: {
      title: 'Triangles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Triangles',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Introduction to triangles and their properties',
            htmlDescription: 'Proof that triangle total angle equals 180º',
            fullLesson: true,
          },
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Quiz - Find the unknown angle in the triangle',
            htmlDescription: 'Dynamic quiz where no two questions are the same',
            fullLesson: true,
          },
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Summary of triangles and their properties',
            htmlDescription: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'IntersectionAngles',
      ],
      enabled: true,
    },
    Chord: {
      title: 'Chord',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'Chord',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: '',
            htmlDescription: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Sine',
      ],
      enabled: false,
    },
    Cosecant: {
      title: 'Cosecant',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'Cosecant',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: '',
            htmlDescription: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Secant',
      ],
      enabled: false,
    },
    Cosine: {
      title: 'Cosine',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'Cosine',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: '',
            htmlDescription: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Sine',
      ],
      enabled: false,
    },
    Cotangent: {
      title: 'Cotangent',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'Cotangent',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: '',
            htmlDescription: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Pythagoras',
      ],
      enabled: false,
    },
    LawOfCosines: {
      title: 'Law of Cosines',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'LawOfCosines',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: '',
            htmlDescription: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'LawOfSines',
      ],
      enabled: false,
    },
    LawOfSines: {
      title: 'Law of Sines',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'LawOfSines',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: '',
            htmlDescription: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Pythagoras',
      ],
      enabled: false,
    },
    Pythagoras: {
      title: 'Pythagorean Identity',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'Pythagoras',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: '',
            htmlDescription: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Tangent',
      ],
      enabled: false,
    },
    Secant: {
      title: 'Secant',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'Secant',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: '',
            htmlDescription: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Pythagoras',
      ],
      enabled: false,
    },
    Sine: {
      title: 'Sine',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'Sine',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: '',
            htmlDescription: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'UnitCircle',
      ],
      enabled: false,
    },
    Tangent: {
      title: 'Tangent',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'Tangent',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: '',
            htmlDescription: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
        'Chord',
      ],
      enabled: false,
    },
    UnitCircle: {
      title: 'Unit Circle',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'UnitCircle',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: '',
            htmlDescription: '',
            fullLesson: true,
          },
        },
      },
      dependencies: [
      ],
      enabled: false,
    },
  };
}
