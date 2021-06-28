export default async function handler(req, res) {
    const { email } = req.query;

    let sql;
    
    if(email) {
        sql = `SELECT * from tryshape.users WHERE email='${email}'`;
    } else {
        sql = `SELECT * from tryshape.users`;
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