const shapes = [
    {
        name: "Circle",
        type: "circle",
        formula: "circle(50% at 50% 50%)",
        vertices: 0,
        edges: 0,
        likes: 0,
        createdBy: 0,
        private: true,
        notes: "A circle is a round shaped figure that has no corners or edges. In geometry, a circle can be defined as a closed, two-dimensional curved shape."
    },
    {
        name: "Square",
        type: "polygon",
        formula: "polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)",
        vertices: 4,
        edges: 4,
        likes: 0,
        createdBy: 0,
        private: true,
        notes: "A square is closed, two-dimensional shape with 4 equal sides. A square is a quadrilateral."
    },
    {
        name: "Rectangle",
        type: "polygon",
        formula: "polygon(10% 25%, 90% 25%, 90% 75%, 10% 75%)",
        vertices: 4,
        edges: 4,
        likes: 0,
        createdBy: 0,
        private: false,
        notes: "A Rectangle is a four sided-polygon, having all the internal angles equal to 90 degrees. The two sides at each corner or vertex, meet at right angles. The opposite sides of the rectangle are equal in length which makes it different from a square."
    },
    {
        name: "Rhombus",
        type: "polygon",
        formula: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        vertices: 4,
        edges: 4,
        likes: 0,
        createdBy: 0,
        private: true,
        notes: "A rhombus is a quadrilateral whose four sides all have the same length. A square and a rhombus both have sides equal in length. But square has all its angles equal to 90 degrees, but a rhombus only has its opposite angles equal."
    },
    {
        name: "Ellipse",
        type: "ellipse",
        formula: "ellipse(25% 40% at 50% 50%);",
        vertices: 0,
        edges: 0,
        likes: 0,
        createdBy: 0,
        private: true,
        notes: "An ellipse is a shape that looks like an oval or a flattened circle."
    },
    {
        name: "Triangle",
        type: "polygon",
        formula: "polygon(50% 0%, 0% 100%, 100% 100%)",
        vertices: 3,
        edges: 3,
        likes: 0,
        createdBy: 0,
        private: false,
        notes: " a triangle is a three-sided polygon that consists of three edges and three vertices. The most important property of a triangle is that the sum of the internal angles of a triangle is equal to 180 degrees."
    },
    {
        name: "Parallelogram",
        type: "polygon",
        formula: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
        vertices: 4,
        edges: 4,
        likes: 0,
        createdBy: 0,
        private: true,
        notes: "A parallelogram is a quadrilateral that has its opposite sides parallel and equal to each other. It has its interior opposite angles equal. Also, the angles on the same side of transversal sum up to 180 degrees or supplementary to each other."
    },
    {
        name: "Trapezoid",
        type: "polygon",
        formula: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
        vertices: 4,
        edges: 4,
        likes: 0,
        createdBy: 0,
        private: true,
        notes: "A trapezoid(also called, trapezium) is a quadrilateral with at least one pair of parallel sides. No other features matter. The parallel sides may be vertical , horizontal , or slanting ."
    },
    {
        name: "Pentagon",
        type: "polygon",
        formula: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
        vertices: 5,
        edges: 5,
        likes: 0,
        createdBy: 0,
        private: true,
        notes: "A pentagon is a geometrical shape, which has five sides and five angles. Here, “Penta” denotes five and “gon” denotes angle. An equilateral pentagon is a polygon with five sides of equal length."
    },
    {
        name: "Hexagon",
        type: "polygon",
        formula: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
        vertices: 6,
        edges: 6,
        likes: 0,
        createdBy: 0,
        private: true,
        notes: "A hexagon can be defined as a polygon with six sides. The two-dimensional shape has 6 sides, 6 vertices and 6 angles."
    },
    {
        name: "Heptagon",
        type: "polygon",
        formula: "polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)",
        vertices: 7,
        edges: 7,
        likes: 0,
        createdBy: 0,
        private: true,
        notes: "Heptagon is a polygon ( a closed shape made up of line segments) made up of 7 sides and 7 angles. The word heptagon is made up of two words, hepta meaning seven and gon meaning sides."
    },
    {
        name: "Octagon",
        type: "polygon",
        formula:
            "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
        vertices: 8,
        edges: 8,
        likes: 0,
        createdBy: 0,
        private: true,
        notes: "An octagon is a polygon made up of 8 sides. It has eight angles. Octagon = Octa + gon where octa means eight and gon means sides. "
    },
    {
        name: "Nonagon",
        type: "polygon",
        formula:
            "polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%)",
        vertices: 9,
        edges: 9,
        likes: 0,
        createdBy: 0,
        private: true,
        notes: "A nonagon or enneagon is a nine-sided polygon or 9-gon."
    },
    {
        name: "Decagon",
        type: "polygon",
        formula:
            "polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)",
        vertices: 10,
        edges: 10,
        likes: 0,
        createdBy: 0,
        private: true,
        notes: "A decagon is a ten-sided polygon or 10-gon. The total sum of the interior angles of a simple decagon is 1440°. A self-intersecting regular decagon is known as a decagram."
    },
    {
        name: "Cross",
        type: "polygon",
        formula:
            "polygon(30% 0%, 70% 0%, 70% 30%, 100% 30%, 100% 60%, 70% 60%, 70% 100%, 30% 100%, 30% 60%, 0% 60%, 0% 30%, 30% 30%)",
        vertices: 12,
        edges: 12,
        likes: 0,
        createdBy: 0,
        private: true,
        notes: "A cross is a geometrical figure consisting of two intersecting lines or bars, usually perpendicular to each other. The lines usually run vertically and horizontally."
    },
    {
        name: "Star",
        type: "polygon",
        formula: "polygon(10% 100%,50% 0%,90% 100%,0% 40%,100% 40%)",
        vertices: 5,
        edges: 5,
        likes: 0,
        createdBy: 0,
        private: true,
        notes: "A regular star pentagon, has five corner vertices and intersecting edges."
    },
    {
        name: "Tag",
        type: "polygon",
        formula: "polygon(68% 0%,0% 0%,0% 100%,68% 100%,100% 50%)",
        vertices: 5,
        edges: 5,
        likes: 0,
        createdBy: 0,
        private: true,
        notes: "A custom structure that usually represents a Tag."
    },
];

export { shapes };
