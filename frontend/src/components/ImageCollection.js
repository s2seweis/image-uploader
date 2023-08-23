import { makeStyles, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import React, { useEffect, useState } from 'react';
import axios from "axios";



function ImageCollection() {

    const [images, setImages] = useState();


    useEffect(
        () => {
          if (images.length == 0) {
            dispatch(getImages());
          } else {
            console.log('line:400 - Error', images);
          }
        },
        [images]
      );

    const getImages = async () => {
        const data = new FormData();
        console.log("line:1", data);
 
  
        // GET request
        const result = await axios.get("http://localhost:3001/download", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        const result_1 = data
        console.log("line:2", result_1);
        console.log("line:3", result);
  
  
        const dataURL = encodeImage(
          result.data.mimetype,
          result.data.buffer.data
        );
  
        console.log("line:8", dataURL);
        // merge the data together for give a preview of the uploaded images
        setAvatars([...avatars, { name: result.data.name, url: dataURL }]);
      };
  


  return (
    <div>


        <h1>Image Collection Test</h1>


    </div>
  );
}

export default ImageCollection;
