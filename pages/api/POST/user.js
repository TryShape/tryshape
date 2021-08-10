
export default async function handler(req, res) {
  
    const { email, displayName, photoURL } = req.body;

    let editedPhotoURL;

    if (photoURL.includes("avatars.githubusercontent.com") && !photoURL.includes("&s=")) {
      editedPhotoURL = `${photoURL}&s=32`;
    }

    if (photoURL.includes("lh3.googleusercontent.com") && photoURL.includes("=s96")) {
      editedPhotoURL = photoURL.replace("=s96", "=s32");
    }

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
            photoURL: editedPhotoURL, 
          },
        ],
      }),
    });
  
    const data = await request.json();
  
    res.status(200).json({ data });
  }
  