// Store the default state as a variable so resetting form is easier
export const initialState = {
    "name": "", 
    "formula": "polygon(10% 10%, 90% 10%, 90% 90%, 10% 80%)",
    "vertices": 4,
    "private": false,
    "edges": 4, 
    "notes": "", 
    "clipPathType": "polygon",
    "showShadow": true, 
    "backgroundColor": "#d61284", 
    "verticeCoordinates" : [
        {
            "x": "10%", 
            "y": "10%", 
        }, 
        {
            "x": "90%", 
            "y": "10%", 
        }, 
        {
            "x": "90%", 
            "y": "90%", 
        }, 
        {
            "x": "10%", 
            "y": "80%", 
        }, 
    ], 
    "width" : "0%", 
    "height" : "0%", 
}

// Data Used When Clip-Path Type is Changed to Polygon
export const polygonInitialState = {
    "formula": "polygon(10% 10%, 90% 10%, 90% 90%, 10% 80%)", 
    "vertices": 4, 
    "edges": 4,
    "verticeCoordinates" : [
        {
            "x": "10%", 
            "y": "10%", 
        }, 
        {
            "x": "90%", 
            "y": "10%", 
        }, 
        {
            "x": "90%", 
            "y": "90%", 
        }, 
        {
            "x": "10%", 
            "y": "80%", 
        }, 
    ], 
    "width" : "0%", 
    "height" : "0%", 
}

// Data Used When Clip-Path is Changed to Circle
export const circleInitialState = {
    "type": "circle", 
    "formula": "circle(50% at 50% 50%)",
    "verticeCoordinates" : [
        {
            "x": "50%", 
            "y": "50%", 
        }
    ], 
    "width" : "50%", 
    "height" : "50%", 
}

// Data Used When Clip-Path is Changed to Ellipse
export const ellipseInitialState = {
    "type": "ellipse", 
    "formula": "ellipse(25% 40% at 50% 50%)",
    "verticeCoordinates" : [
        {
            "x": "50%", 
            "y": "50%", 
        }
    ], 
    "width" : "25%", 
    "height" : "40%", 
}