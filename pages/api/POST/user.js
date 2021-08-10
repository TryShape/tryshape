import { resizeAvatar } from "../../../utils/photoURLFunctions";

export default async function handler(req, res) {
  
    const { email, displayName, photoURL } = req.body;

    const request = await fetch(process.env.NEXT_PUBLIC_DB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${process.env.NEXT_PUBLIC_DB_AUTHORIZATION}`,
      },
      body: JSON.stringify({
        operation: "insert",
        schema: "tryshape",
        table: "users",
        records: [
          {
            name: displayName,
            email: email,
            photoURL: resizeAvatar(photoURL), 
          },
        ],
      }),
    });
  
    const data = await request.json();
  
    res.status(200).json({ data });
  }
  