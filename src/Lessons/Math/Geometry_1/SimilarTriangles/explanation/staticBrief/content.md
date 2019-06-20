## Similar Triangles

Similar shapes are those that have the same shape but are a different size.

Similar triangles are triangles that have the same angles, and whose corresponding sides are proportional.

### Equiangular Triangles are Similar - Proof

Consider two triangles with **equal angles** overlaid on each other (left). We then label the points, and add in some construction lines (right).

![](SimilarOverlay.png)

As $$\angle DBC$$ and $$\angle ADE$$ are [[equal corresponding angles]]((qr,'Math/Geometry_1/RelatedAngles/base/Corresponding',#00756F)):

$$\color{b}BC \parallel DE$$

When a triangle is [[split with a parallel line]]((qr,'Math/Geometry_1/ParallelSplitOfTriangle/base/Triangle',#00756F)), the smaller triangle's sides will all be scaled by the same proportion, and so $$\triangle ABC$$ is proportional to $$\triangle ADE$$.

**Therefore if triangles share the same angles, then their corresponding sides have the same proportion, and they are similar triangles**.


### Proportional Triangles are Similar - Proof

If instead you start with two triangles whose **corresponding sides have equal proportion**, then you can show all angles must be equal.

Start by drawing the two proportional triangles $$\triangle ABC$$ and $$\triangle DEF$$, and then drawing an additional triangle along $$DF$$ with the angles $$\angle BAC$$ and $$\angle ACB$$:

![](ProportionalToAngles.png)

As the angles in a triangle [[add]]((qr,'Math/Geometry_1/Triangles/base/AngleSum',#00756F)) to 180º, we know that:

$$\color{b}\angle ABC = \angle DGF$$

Therefore all the corresponding angles of $$\triangle ABC$$ and $$\triangle DFG$$ are equal, and therefore they are similar. Therefore the sides are proportional:

$$\color{b} \frac{AB}{DG} = \frac{AC}{DF} \ \ \ \ \ \ \ \ \color{grey}(1)$$

We started with:

$$\color{b} \frac{AB}{\color{r}{DE}\color{b}} = \frac{AC}{DF} \ \ \ \ \ \ \ \ \color{grey}(2)$$

Combining $$\color{grey}(1)$$ and $$\color{grey}(2)$$:

$$\color{b} DE = DG$$

Using the same process, can similarly show:

$$\color{b} EF = GF$$

Triangles with the same side lengths are [[congruent]]((qr,'Math/Geometry_1/CongruentTriangles/base/Sss',#00756F)), so the angles of $$\triangle DEF$$ will be equal to the angles in $$\triangle DFG$$ and therefore $$\triangle ABC$$.

Therefore $$\triangle ABC$$ and $$\triangle DEF$$ are similar as they have the same angles, and their corresponding sides have the same proportion.


