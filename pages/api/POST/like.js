
export default async function handler(req, res) {
  
  const { shapeId, email } = req.body;

  console.log(shapeId, email);

  const request = await fetch(process.env.NEXT_PUBLIC_DB_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.NEXT_PUBLIC_DB_AUTHORIZATION}`,
    },
    body: JSON.stringify({
      operation: "insert",
      schema: "tryshape",
      table: "likes",
      records: [
        {
          shape_id: shapeId,
          email: email
        },
      ],
    }),
  });

  const data = await request.json();

  res.status(200).json({ data });
}
