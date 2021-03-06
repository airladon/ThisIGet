### Definition

**Similar** shapes are those that have the same shape but are a different size.

**Similar** triangles have the same corresponding angles and their corresponding sides have the same proportion (have the same scaling factor).


### Triangles with Equal Corresponding Angles are Similar - Proof

Consider two triangles with **equal angles** overlaid on each other.

![](SimilarOverlay.png)

$$\definecolor{b}{RGB}{0,118,186}\definecolor{r}{RGB}{238,34,12}\angle DBC$$ and $$\angle ADE$$ are [[equal corresponding angles]]((qr,'Math/Geometry_1/AnglesAtIntersections/base/Corresponding',#00756F)), therefore $$\color{b}BC \parallel DE$$.

When a triangle is [[split with a parallel line]]((qr,'Math/Geometry_1/ParallelSplitOfTriangle/base/Triangle',#00756F)), the smaller triangle's sides will all be scaled by the same proportion.

Therefore $$\triangle ABC$$ and $$\triangle ADE$$ are **similar**.


*Triangles with the same corresponding angles will have corresponding sides of equal proportion, and will therefore be similar.*


### Similar Triangles have Equal Corresponding Angles - Proof

Start by drawing the two similar triangles $$\triangle ABC$$ and $$\triangle DEF$$, and then draw an additional triangle along $$DF$$ with the angles $$\angle BAC=\angle GDF$$ and $$\angle ACB=\angle DFG$$:

![](ProportionalToAngles.png)

[[Angles in a triangle add to 180º]]((qr,'Math/Geometry_1/Triangles/base/AngleSum',#00756F)), so two triangles with the same two angles will have the same third angle:

$$\angle ABC = \angle DGF$$

Therefore all the corresponding angles of $$\triangle ABC$$ and $$\triangle DFG$$ are equal.

From above, two triangles with the same corresponding angles are similar.

So we started with two initial similar triangles:

$$\frac{{DE}\color{b}}{AB}\color{black} = \frac{DF}{AC} \ \ \ \ \ \ \ \ \color{grey}(2)$$

And then constructed a third triangle $$\triangle DFG$$ similar to $$\triangle ABC$$ resulting in:

$$\frac{\color{r}DG}{\color{black}AB} = \frac{DF}{AC} \ \ \ \ \ \ \ \ \color{grey}(1)$$



Combining $$\color{grey}(1)$$ and $$\color{grey}(2)$$:

$$DE = DG$$

Using the same process, can similarly show:

$$EF = GF$$

Triangles with the same side lengths are [[congruent]]((qr,'Math/Geometry_1/CongruentTriangles/base/Sss',#00756F)), so the angles of $$\triangle DEF$$ will be equal to the angles in $$\triangle DFG$$ and therefore $$\triangle ABC$$.

Therefore the similar triangles $$\triangle ABC$$ and $$\triangle DEF$$ have equal corresponding angles.

### Similarity Tests

How many properties need to be identified to determine two triangles are similar?

As all similar triangles have equal corresponding angles, it follows that triangles without equal corresponding angles cannot be similar.

The longer [form of this explanation](/content/Math/Geometry_1/SimilarTriangles/explanation/static) shows all the combinations that are not possible and why. Here we will focus just on the ones that are.

### Angle-Angle-Angle (AAA) and Side-Side-Side (SSS)

By definition, if you know three angles, or three sides of two triangles, you can tell if they are similar or not by directly comparing their properties. 

If the corresponding sides all have equal proportion, then the triangles will be similar.

Alternately if all corresponding angles are equal, then the triangles will be similar.

### Angle-Angle (AA)

Two angles are also sufficient to determine similarity as all angles in a triangle [[add to 180º]]((qr,'Math/Geometry_1/Triangles/base/AngleSum',#00756F)), and therefore if you know two angles you actually know all three.

### Side-Angle-Side (SAS)

If you know two triangles have the same angle surrounded by corresponding sides that have equal proportion (or scaling factor) then you can align the two triangles on top of each other.

![](sas.png)

* Align the two triangles by the known angle
* When two sides of a triangle [[are split in equal proportion]]((qr,'Math/Geometry_1/ParallelSplitOfTriangle/base/ProportionalSplit',#00756F)), the line between the splits is parallel to the remaining line.
* This means we have the case of a [[triangle split by a parallel line]]((qr,'Math/Geometry_1/ParallelSplitOfTriangle/base/Triangle',#00756F)), which results in a smaller proportional triangle
* Therefore the triangles are similar

### Side-Side-Angle (SSA)

For SSA, we know from [[SSA triangle congruency]]((qr,'Math/Geometry_1/CongruentTriangles/base/Ssa',#00756F)) that triangles are:

* Congruent when the opposite side is longer than or equal to the adjacent side
* Not congruent when the opposite side is shorter than the adjacent side

In other words, when the opposite side to the known angle is shorter than the adjacent side, more than one triangle can be created with different corresponding angles.

So, we can consider only the case where the opposite side is greater than or equal to the adjacent side.

![](ssa_start.png)

Let's start by considering only the shorter triangle, and growing its base to be the same size as the larger triangle.

![](ssa_final.png)

* Grow side $$\color{b}A$$ to length $$\color{b}sA$$, and put angle  $$\color{r}b$$ at its end
* Extend sides $$\color{b}B$$ and $$\color{b}C_1$$ to form a triangle
* The two $$\color{r}b$$ angles are [[equal corresponding angles]]((qr,'Math/Geometry_1/AnglesAtIntersections/base/Corresponding',#00756F)) thus $$\color{b}C_1 \color{black}|| \color{b}C$$
* $$\color{b}\triangle sAB_1C_1$$ is therefore [[split with a parallel line]]((qr,'Math/Geometry_1/ParallelSplitOfTriangle/base/Triangle',#00756F))
* Therefore $$\color{b}\triangle sAB_1C_1$$ is similar to $$\color{b}\triangle ABC$$, and is scaled by $$\color{b}s$$
* Therefore $$\color{b}B_1\color{black}=\color{b}sB$$, $$\color{b}C_1\color{black}=\color{b}sC$$
* By [[SSA]]((qr,'Math/Geometry_1/CongruentTriangles/base/Ssa',#00756F)) the larger triangle is congruent with the original large triangle (as $$\color{b}sB\color{black}\gt\color{b}sA$$)
* Therefore the two original triangles are similar

The same method can be used for when $$\color{b}sB\color{black}=\color{b}sA$$.

