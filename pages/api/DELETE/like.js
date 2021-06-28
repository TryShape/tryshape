
export default async function handler(req, res) {
  
    const { likeId } = req.body;
  
    console.log(likeId);
  
    const request = await fetch(process.env.NEXT_PUBLIC_DB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${process.env.NEXT_PUBLIC_DB_AUTHORIZATION}`,
      },
      body: JSON.stringify({
        operation: "delete",
        schema: "tryshape",
        table: "likes",
        hash_values: [likeId],
      }),
    });
  
    const data = await request.json();
  
    res.status(200).json({ data });
  }
  