## Congruent Triangles

In mathematics, if **two shapes are the same size and shape**, then they are said to be **congruent**.

The word **congruent** comes from _Latin_, where it means _"agreeing, meeting together"_.

For two triangles to be **congruent**, the corresponding **side lengths** and **angles** of each triangle must be the same as the other.

![](congruent.png)

Flipped and rotated triangles can still have the same corresponding sides and angles and therefore be congruent.

## Congruency Tests

The easy way to determine if two triangles are congruent is to measure all six sides and angles.

But is there a faster way? What is the number of sides and/or angles you need to know to determine if two triangles are congruent?

If the answer is less than six, then when you determine two triangles are congruent and you don't know all their properties, you may be able to infer one triangles unknown properties from the others known properties. 

### One Property

If you just know a single side or angle, is that enough to know whether two triangles are congruent?

<hintLow>

Another way to ask this is: if you fix one side (or angle), how many different triangles can you make?

If the answer is just one, then you know if two triangles have one side that is the same length then they will be congruent.

</hintLow>

<hint>Try drawing a side - how can you build more than one triangle off that side?</hint>

<hint>Try drawing an angle - how can you build more than one triangle off that angle?</hint>

<hintLow>[Answer]

If you start with just a single side, you can make more than one triangle. For example:

![](1side.png)

If you know one side (in this case of value 1), then triangles ABC and ABD can be built off that side.

If you start with just a single angle, you can also make more than one triangle.

![](1angle.png)

If you know one angle (60º), then triangles ABE and ACD can be formed from it.

In fact, any number of triangles can be formed from either a single side or single angle.

</hintLow>

### Two Properties

What about if you know two properties? What are the different combinations of properties you might know? One combination is two sides, what are the others?

<hintLow>[Answer] The combinations are 

* two sides
* two angles
* one side and one angle

</hintLow><div></div>

Are any of these combinations suffient to determine if two triangles are congruent?

<hintLow>Try drawing a side and an angle - can more than one triangle be built? ![](side-angle.png)</hintLow>

<hintLow>Try drawing two angles - can more than one triangle be built? What if you change their separation? ![](angle-angle.png)</hintLow>

<hint>When drawing two sides, remember the angle between them can be any angle</hint>

<hintLow>[Answer] Many triangles can be made if you start with just **two properties**. Therefore, two properties are not sufficient to tell whether two triangles are congruent.

Knowing just a **side-angle** combination is not enough:

![](side-angle-tri.png)

In this example, triangles ACD and ABD both share the same side and angle.

Knowing just an **angle-angle** combination is not enough:

![](angle-angle-tri.png)

In this example, triangles ACD and ABE both share a 60º and 45º angle but are different sizes.

Knowing just a **side-side** combination is not enough:

![](side-side-tri.png)

In this example, triangles ABD or ACD both have sides of value 1 and 1.2. In fact, the side of value 1 can be anywhere on the circle around D, forming many different triangles.

</hintLow>

### Three Properties

What about if you know three properties? What are the different combinations of properties you might know? One combination is three sides, what are the others?

<hintLow>[Answer] There are six combinations. Combinations are typlically denoted **property-property-property** where order is how they appear in the triangle.

For example, if you have two angles and a side, it could either be **side-side-angle** or **side-angle-side**. The **side-angle-side** combination would consist of an angle between two sides like:

![](side-angle-side.png)

whereas **side-side-angle** would be an angle adjacent to just one of the sides:

![](side-side-angle.png)

The six combinations are:

* side-side-side
* angle-angle-angle
* side-side-angle
* side-angle-side
* angle-angle-side
* angle-side-angle

</hintLow><div></div>

Are any of these combinations suffient to determine if two triangles are congruent?

<hint>**Some** of the three property cases will only produce one triangle and therefore be a sufficient test of congruency.
</hint>

<hint>Start with **side-angle-side** or **angle-side-angle**. Draw out the fixed properties, then see how many different triangles you can make from them.
</hint>

<hintLow>For **side-angle-side**, how many triangles can be constructed once you start with:
![](side-angle-side.png)
</hintLow>

<hintLow>For **angle-side-angle**, how many triangles can be constructed once you start with:
![](angle-side-angle.png)
</hintLow>

<hint>You might not be able to prove the **side-side-side** case yet, as it can be useful to know about [[isosceles]]((qr,'Math/Geometry_1/Isosceles/base/Main',#00756F)) triangles first. If you already know about isosceles triangles, then you can use them to simply the **side-side-side** case to **side-angle-side**</hint>

<hint>For **angle-angle-side**, use the total angle of a [[triangle]]((qr,'Math/Geometry_1/Triangles/base/AngleSumPres',#00756F)) to get to the **angle-side-angle** case.
</hint>

<hint>Be careful with the **side-side-angle** case can only sometimes be a sufficient test of congruency. Can you figure out when?</hint>

<hint>For **angle-angle-angle**, think about shrinking or zooming out from the triangle. As it gets smaller, do the angles change?</hint>

<hintLow>[Answer]
  The cases that can only make one triangle, and are therefore sufficient to determine if two triangles are congruent are:

* side-side-side
* angle-side-angle
* side-angle-side
* angle-angle-side

The **side-side-angle** case is only sufficient if the side opposite to the known angle is longer than or equal to the side adjacent to the angle.

The **angle-angle-angle** can produce many different sized triangles and is therefore insufficient.

This lessons [Explanation](/Lessons/Math/Geometry_1/CongruentTriangles/explanation/base) explains why each case is either possible or not.
</hintLow>

### More than three properties

What about if you know four or five properties? Are any of these combinations sufficeint to determine congruency?

<hint>Do four and five combinations of properties have already known three property combinations?</hint>

<hintLow>[Answer]
All combinations of four or five properties have within them either three sides, or 
one side and two angles. As **side-side-side**, **angle-angle-side** and **angle-side-angle** are all sufficient tests of congruency, then all combinations of four or five properties will also be sufficient tests of congruency.
</hintLow>
