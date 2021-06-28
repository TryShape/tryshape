
export default async function handler(req, res) {
  
    const { 
      name, 
      formula, 
      vertices, 
      visibility, 
      edges, 
      notes, 
      type, 
      backgroundColor, 
      likes,
      createdBy} = req.body;

  
    const record = {};
    record['private'] = visibility;
    record['name'] = name;
    record['formula'] = formula;
    record['vertices'] = vertices;
    record['edges'] = edges;
    record['notes'] = notes;
    record['type'] = type;
    record['backgroundColor'] = backgroundColor;
    record['createdBy'] = createdBy;
    record['likes'] = likes;
    
    console.log({record});
  
    const request = await fetch(process.env.NEXT_PUBLIC_DB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${process.env.NEXT_PUBLIC_DB_AUTHORIZATION}`,
      },
      body: JSON.stringify({
        operation: "insert",
        schema: "tryshape",
        table: "shapes",
        records: [
          record
        ],
      }),
    });
  
    const data = await request.json();
  
    res.status(200).json({ data });
  }
  