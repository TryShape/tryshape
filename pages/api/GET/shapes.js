export default async function handler(req, res) {
    const { type, email } = req.query;
    console.log(req.query);
    console.log(`Shape type to query is ${type}`);

    let sql;
    if (type === 'private') {
        sql = `SELECT * 
            FROM tryshape.shapes s 
            INNER JOIN tryshape.users u ON s.createdBy=u.email 
            WHERE s.private=false 
            ORDER BY s.likes DESC`;
    } else if(type === 'public') {
        sql = `SELECT * FROM tryshape.shapes`;
    } else if(type === 'public-logged-in') {
        console.log(`email is ${email}`);
        sql = `SELECT *
            FROM tryshape.shapes s
            INNER JOIN tryshape.users u 
            ON s.createdBy=u.email 
            WHERE s.private=false 
            OR createdBy = '${email}'
            ORDER BY s.likes DESC`;
    }

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
    // console.log(data);
  
    res.status(200).json(data);
  }