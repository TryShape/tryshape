
export default async function handler(req, res) {
  
  const { likes, shapeId } = req.body;

  const request = await fetch(process.env.NEXT_PUBLIC_DB_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.NEXT_PUBLIC_DB_AUTHORIZATION}`,
    },
    body: JSON.stringify({
      operation: "update",
      schema: "tryshape",
      table: "shapes",
      records: [
        {
          shape_id: shapeId,
          likes: likes,
        },
      ],
    }),
  });

  const data = await request.json();

  res.status(200).json({ data });
}
