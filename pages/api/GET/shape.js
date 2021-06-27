export default async function handler(req, res) {
    const { shapeId } = req.query;
    
    let sql = `SELECT s.likes FROM tryshape.shapes s WHERE s.shape_id='${shapeId}'`;
    
    const request = await fetch(process.env.NEXT_PUBLIC_DB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${process.env.NEXT_PUBLIC_DB_AUTHORIZATION}`,
      },
      body: JSON.stringify({
        operation: "sql",
        sql: sql,
      }),
    });
  
    const data = await request.json();
  
    res.status(200).json(data);
  }