
export const getShapeFileName = name => {
    return name.split(" ").join("-");
};

export const getShapeId = (name, isExport) => {
    return isExport ?
         `${getShapeFileName(name)}-export-id` : 
         `${getShapeFileName(name)}-id`;
}