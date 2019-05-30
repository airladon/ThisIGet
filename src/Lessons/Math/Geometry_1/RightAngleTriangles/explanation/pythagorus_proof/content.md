## Pythagorean Theorem

Start with a **Right Angled Triangle** that has side lengths $$\definecolor{lessonBlue}{RGB}{0,162,255}\definecolor{lessonGreen}{RGB}{29,177,0}\color{lessonBlue}A$$, $$\color{lessonBlue}{B}$$, and $$\color{lessonBlue}{C}$$, and angles $$\color{lessonGreen}{a}$$, $$\color{lessonGreen}{b}$$ and $$\color{lessonGreen}{90^\circ}$$:

![](./Triangle.png)

As a triangle's angles [[add]]((qr,'Math/Geometry_1/Triangles/base/AngleSum',#16E7CF)) to 180º, and one angle is $$\color{lessonGreen}{90^\circ}$$, then the remaining angles must be $$\color{lessonGreen}{180^\circ-90^\circ = 90^\circ}$$.

Therefore $$\color{lessonGreen}{a} + \color{lessonGreen}{b} = 90^\circ$$.

Rotate a copy of the triangle so the sides $$\color{lessonBlue}A$$ and $$\color{lessonBlue}B$$ form a straight line:

![](./TwoTriangles.png)

As $$\color{lessonBlue}A$$ and $$\color{lessonBlue}B$$ are a straight line, angles $$\color{lessonGreen}{a}$$, $$\color{lessonGreen}{b}$$ and $$\color{lessonGreen}{e}$$ are [[supplementary]]((qr,'Math/Geometry_1/AdjacentAngles/base/Supplementary',#16E7CF)).

We know $$\color{lessonGreen}{a} + \color{lessonGreen}{b} = 90^\circ$$ and $$\color{lessonGreen}{a} + \color{lessonGreen}{b} + \color{lessonGreen}{e} = 180^\circ$$, so therefore $$\color{lessonGreen}{e}=90^\circ$$.

Copy the original triangle two more times to create a large square. Each angle between the triangles can be shown the same way to be a right angle.

![](./ThreeTriangles.png)

The side length of the large square is $$\color{lessonBlue}A+B$$ and so the [[area]]((qr,'Math/Geometry_1/Area/base/Square',#16E7CF')) is $$\color{lessonBlue}\(A+B\)^2$$.

As $$\color{lessonBlue}e$$ is a right-angle, then the inside shape is also a square with area $$\color{lessonBlue}C^2$$.

Each right angle triangle has an [[area]]((qr,'Math/Geometry_1/RightAngleTriangles/base/Area',#16E7CF')) of $$\color{lessonBlue}\textstyle{\frac{1}{2}}AB$$.

The large square's area is the sum of the four triangles and the smaller square:

$$\color{lessonBlue}\(A+B\)^2 = 4\textstyle{\frac{1}{2}}AB + C^2$$

Expanding out the left side and simplifying the right:

$$\color{lessonBlue} A^2 + 2AB + B^2 = 2AB + C^2$$

Subtract $$\color{lessonBlue}2AB$$ from both sides:

$$\color{lessonBlue} \bbox[20px,border:1px solid red]{A^2 + B^2 = C^2}$$

And so for a right angle triangle the sum of the squares of the perpendicular sides is equal to the square of the hypotenuse. This can also be visulaized as squares made from the edges of the right angle triangle:

![](./Squares.png)