export const resizeAvatar = (photoURL) => {

    let editedPhotoURL = photoURL;

    if (photoURL.includes("avatars.githubusercontent.com") && !photoURL.includes("&s=")) {
        editedPhotoURL = `${photoURL}&s=32`;
    }

    if (photoURL.includes("lh3.googleusercontent.com") && photoURL.includes("=s96")) {
    editedPhotoURL = photoURL.replace("=s96", "=s32");
    }

    return editedPhotoURL; 
}