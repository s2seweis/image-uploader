import { makeStyles, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import React, { useState } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: "50px 0",
    },
    container: {
      maxWidth: "70%",
      margin: "auto",
    },
    containerUpload: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      height: "300px",
      backgroundColor: theme.palette.secondary.main,
      borderRadius: "3px",
      "& h3": {
        color: theme.palette.tertiary.main,
      },
      "& i": {
        color: theme.palette.tertiary.main,
        padding: "10px 0",
      },
      "& label": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.tertiary.main,
        borderRadius: "5px",
        padding: "5px 20px",
      },
      "& label:hover": {
        backgroundColor: theme.palette.primary.light,
        cursor: "pointer",
      },
      "& label:active": {
        backgroundColor: theme.palette.primary.dark,
      },
      "& label input": {
        overflow: "hidden",
        width: "0",
      },
    },
    containerUploadHover: {
      backgroundColor: theme.palette.secondary.light,
    },
    containerGrid: {
      display: "flex",
      flexWrap: "wrap",
      "& img": {
        // width:'200px',
        height: "150px",
        margin: "15px 20px 15px 0",
        borderRadius: "3px",
      },
    },
  })
);

function Loader() {
  const [name, setName] = useState([]);
  console.log("line:0", name);
  const [name1, setName1] = useState([]);
  console.log("0.1", name1);

  const [avatars, setAvatars] = useState([]);
  console.log("line:1", avatars);
  const [isDragOver, setDragOver] = useState(false);
  console.log("line:2", isDragOver);
  const classes = useStyles();

  // ### Top Level

  const [file, setFile] = useState([]);
  console.log("line:-1", file);
  const [file1, setFile1] = useState([]);
  console.log("line:-2", file1);

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmit = (file) => {
    console.log("line:3", file);

    const encodeImage = (mimetype, arrayBuffer) => {
      console.log("3.1", mimetype);
      console.log("3.2", arrayBuffer);
      let u8 = new Uint8Array(arrayBuffer);
      // console.log("line:1", u8);
      const b64encoded = btoa(
        [].reduce.call(
          new Uint8Array(arrayBuffer),
          function (p, c) {
            return p + String.fromCharCode(c);
          },
          ""
        )
      );
      // console.log("line:2", b64encoded);
      return "data:" + mimetype + ";base64," + b64encoded;
    };

    // ### Upload the image to the database

    const uploadImage = async () => {
      const data = new FormData();
      console.log("line:4", data);
      data.append("file", file);
      console.log("line:5", file);
      data.append("filename", file.name);
      console.log("line:6", file.name);

      // POST request
      const result = await axios.post("http://localhost:3001/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const result1 = data
      console.log("line:6.1", result1);

      console.log("line:7", result);
      console.log("line:7.1", result.data.name);
      console.log("line:7.2", result.data.mimetype);
      console.log("line:7.3", result.data.buffer);

      const dataURL = encodeImage(
        result.data.mimetype,
        result.data.buffer.data
      );

      console.log("line:8", dataURL);
      // merge the data together for give a preview of the uploaded images
      setAvatars([...avatars, { name: result.data.name, url: dataURL }]);
    };

    // ### here finally the upload to database function is called

    uploadImage();
  };

  // ###

  const handleDragOver = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();

    setDragOver(true);
  };

  const handleDrop = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();

    setDragOver(false);

    const file = evt.dataTransfer.files[0];
    console.log("line:9", file);
    handleSubmit(file);
  };



  return (
    <Container
      style={{ padding: "5px", background: "" }}
      maxWidth="lg"
      className={classes.root}
    >
      <section
        style={{ backgroundColor: "green" }}
        id="image-upload"
        className={`${classes.container} ${classes.containerUpload} ${isDragOver ? classes.containerUploadHover : ""
          }`}
        onDragOver={(evt) => handleDragOver(evt)}
        onDrop={handleDrop}
      >
        <i className="fas fa-cloud-upload-alt fa-5x"></i>
        <label>
          <input
            type="file"
            name="avatar"
            onChange={(e) => handleSubmit(e.target.files[0])}
          />
          Choose file to upload
        </label>

        <h3>or drag and drop them here</h3>
      </section>

      {/* ### transform drag and drop to /upload */}

      {/* <button onClick={onClick}>Upload</button> */}

      {/* <section id="image-grid" className={`${classes.container}`}>
        <h3>Uploads</h3>
        <div className={`${classes.containerGrid}`}>
          {avatars.map((avatar, idx) => (
            <img key={`${avatar.name}-${idx}`} src={avatar.url} />
          ))}
        </div>
      </section> */}

      {/* ###Image Upload */}

      <div
        style={{ marginTop: "100px", textAlign: "center" }}
        className="image-upload"
      >
        <label>
          <input
            type="file"
            name="avatar"
            // onChange={(e) => handleSubmit(e.target.files[0])}
            onChange={(e) => { setName(e.target.files[0]) }}
          // onChange={(e) => setName(URL.createObjectURL(e.target.files[0]))}

          />



        </label>

        <button onClick={(e) => handleSubmit(name)}>Upload1</button>

        {/* #Test */}
        <button onClick={(e) => setFile1(URL.createObjectURL(name))}>Upload2</button>

        <img  src={file1}></img>




      </div>

      <section
        style={{ marginTop: "100px" }}
        id="image-grid"
        className={`${classes.container}`}
      >
        {/* <h3>Uploads</h3> */}
        {/* ### avatars is the array i have to push the new file to it for display the image/render it */}
        {/* ### or i have to replace the avatar array with my own */}
        <div style={{ display: "flex", justifyContent: "center" }} className={`${classes.containerGrid}`}>
          {avatars.map((avatar, idx) => (

            <div>
              <button style={{ margin: "auto", display: "flex" }}>Delete</button>
              <img key={`${avatar.name}-${idx}`} src={avatar.url} />
            </div>


          ))}
        </div>
      </section>

      <div style={{ marginTop: "100px", textAlign: "center" }}>
        {/* <input type="file" onChange={handleChange} /> */}
        {/* <input type="file" onChange={(e) => setFile(e.target.files)} /> */}
        <input type="file" onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))} />
        <img style={{ margin: "50px auto" }} src={file} />



      </div>



      {/* ###Image Upload */}
    </Container>
  );
}

export default Loader;
