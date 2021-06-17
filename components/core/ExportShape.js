import React, { useState, useEffect } from "react";

// dynamic from Next.js
import dynamic from "next/dynamic";

// modal
import Modal from "react-bootstrap/Modal";

// button
import Button from "react-bootstrap/Button";

// Clip-Path
const Shape = dynamic(import("react-clip-path"), { ssr: false });

// Toast
import toast from "react-hot-toast";

// html-to-image
import { toPng, toJpeg, toSvg, toCanvas } from "html-to-image";

// downloadjs
import download from "downloadjs";

// misc utilities
import { getShapeId } from "../../utils/misc";

// Radios
import { Radios } from "..";

// Component
const ExportShape = ({ show, setShow, shape }) => {
  console.log({ shape });

  // state object to hold the export data
  const [exportData, setExportData] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setExportData({
      'name': shape.name,
      'type': 'png',
      'width': '300',
      'height': '300',
      'backgroundColor': shape.backgroundColor
    });
    setLoaded(true);
  }, [show])

  // Handles the input changes and update
  // the state object
  const handleChange = (evt) => {
    evt.preventDefault();

    const name = evt.target.name;
    let value =
        evt.target.type === "number" 
            ? evt.target.valueAsNumber 
            : evt.target.value;

    if (value < 0) {
        return;
    }

    if (Number.isNaN(value)) {
        value = "";
    }

    setExportData({
      ...exportData,
      [name]: value
    });
    
    console.log({exportData});
  };

  // Export method
  const doExport = (id, name) => {
    console.log(`Save as ${exportData.type}`);
    switch (exportData.type) {
      case "png":
        exportAsPNG(id, name);
        break;
      case "jpeg":
        exportAsJPEG(id, name);
        break;
      case "svg":
        exportAsSVG(id, name);
        break;
      default:
        exportAsPNG(id, name);
        break;
    }
  };

  const exportAsPNG = (id, name) => {
    toPng(document.getElementById(id)).then(function (dataUrl) {
      console.log(dataUrl);
      download(dataUrl, `${name}.png`);
      toast.success(`${name}.png has been exported sucessfully!`);
    });
  };

  const exportAsJPEG = (id, name) => {
    toJpeg(document.getElementById(id), { quality: 0.95 }).then(function (
      dataUrl
    ) {
      console.log(dataUrl);
      download(dataUrl, `${name}.jpeg`);
      toast.success(`${name}.jpeg has been exported sucessfully!`);
    });
  };
  const exportAsSVG = (id, name) => {
    toSvg(document.getElementById(id)).then(function (dataUrl) {
      console.log(dataUrl);
      download(dataUrl, `${name}.svg`);
      toast.success(`${name}.svg has been exported sucessfully!`);
    });
  };
  return (
    <>
      {loaded && (
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          show={show}
          onHide={() => setShow(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Export {exportData.name} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Shape
                name={exportData.name}
                formula={shape.formula}
                width={`${exportData.width}px`}
                height={`${exportData.height}px`}
                backgroundColor={exportData.backgroundColor}
                id={getShapeId(exportData.name, true)}
              />
            </div>
            <form>
              <div>
                <label htmlFor="export-name">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  id="export-name" 
                  value={exportData.name} 
                  onChange={handleChange} />
              </div>

              <div>
                <label htmlFor="export-color">Color</label>
                <input 
                  type="color" 
                  name="backgroundColor" 
                  id="export-color" 
                  value={exportData.backgroundColor} 
                  onChange={handleChange} />
              </div>

              <div>
                <label htmlFor="export-width">Set a width(in px)</label>
                <input 
                  type="range" 
                  min="100" 
                  max="700" 
                  value={exportData.width} 
                  id="export-width"
                  name="width"
                  onChange={handleChange} />

                <label htmlFor="export-height">Set a height(in px)</label>
                <input 
                  type="range" 
                  min="100" 
                  max="700" 
                  value={exportData.height} 
                  id="export-height"
                  name="height"
                  onChange={handleChange} />
              </div>

              <div>
                <Radios
                  groupName="type"
                  heading="Export as:"
                  options={[
                    { value: "png", displayValue: "png" },
                    { value: "jpeg", displayValue: "jpeg" },
                    { value: "svg", displayValue: "svg" },
                  ]}
                  selectedOption={exportData.type}
                  onValueChange={handleChange}
                />
              </div>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button
              onClick={() => doExport(getShapeId(exportData.name, true), exportData.name)}
            >
              Export
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ExportShape;
