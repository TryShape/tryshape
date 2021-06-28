
export default async function handler(req, res) {
  
    const { shapeId } = req.body;
  
    console.log(shapeId);
  
    const request = await fetch(process.env.NEXT_PUBLIC_DB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${process.env.NEXT_PUBLIC_DB_AUTHORIZATION}`,
      },
      body: JSON.stringify({
        operation: "delete",
        schema: "tryshape",
        table: "shapes",
        hash_values: [shapeId],
      }),
    });
  
    const data = await request.json();
  
    res.status(200).json({ data });
  }
  