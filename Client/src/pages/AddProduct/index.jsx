import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { color } from "@mui/system";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Form from "react-bootstrap/Form";
import PropTypes from 'prop-types';
import {Button} from "@mui/material";
import { styled } from '@mui/system';
import { toast } from "react-toastify";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { ImageUploadButton } from "../../pages/AddProduct/styles"
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};


export default function AddProduct() {
  const [category, setCategory] = React.useState([]);
  console.log("🚀 ~ file: index.jsx:228 ~ AddProduct ~ category", category)
  const [mainCategory,setMainCategory] = React.useState([]);
  const [parent,setParent] = React.useState();
  console.log("🚀 ~ file: index.jsx:230 ~ AddProduct ~ parent", parent)
  const [image, setImage] = React.useState(false);
  console.log("🚀 ~ file: index.jsx:232 ~ AddProduct ~ image", image)
  const [isMen, setIsMen] = React.useState(false);
  const navigate = useNavigate();
  

  const [product, setProduct] = React.useState({
    name: "",
    price: "",
    color: "",
    size: "",
    // gender: "female",
    // categories: "",
    productImage: "",
    description: "",
  });
  useEffect(() => {
    const getMainCategory = async () => {
      await axios
        .get(
          `http://localhost:5003/api/MainCategory/`
        )
        .then((res) => {
          console.log(res);
          setMainCategory(res.data.data);
        })
        .catch((err) => {
          console.log("🚀 ~ file: index.jsx:252 ~ getAllCategory ~ err", err.massage)
        });
    };
    const getAllCategory = async () => {
      await axios
      .post(
        `http://localhost:5003/api/IdSubCategory/`,{parent:parent}
      )
        .then((res) => {
          console.log(res);
          setCategory(res.data.data);
        })
        .catch((err) => {
          console.log("🚀 ~ file: index.jsx:252 ~ getAllCategory ~ err", err.massage)
        });
    };


    getMainCategory();
    if (parent) {
      getAllCategory();
    } else {
      
    }
    
  }, [parent]);
  const onClickAdd = async (e) => {
    e.preventDefault();
    if (
      product.name === "" ||
      product.price === "" ||
      product.color === "" 
    ) {
      alert("Fill all the fields");
    } else {
      try {
        const res = await axios.post(
          "http://localhost:5003/api/product/create",
          product
        );
        console.log(res);
        toast.success(res.data.message);
        navigate("/seller")
      
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      }
    }
  };

  const handleImage = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file) return alert("File not exist.");
      if (file.size > 1024 * 1024)
        // 1mb
        return alert("Size too large!");
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        // 1mb
        return alert("File format is incorrect.");
      let formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "http://localhost:5003/api/categoryImageUpload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      setImage(res.data.url);
      setProduct({
        ...product,
        productImage:res.data.url
      });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  const womenOptions = ["w opt1", "w opt2", "w opt3", "w opt4"];
  const menOptions = ["opt1", "opt2", "opt3", "opt4"];

  const handleSelect = (event) => {
    setProduct({
      ...product,
      categories: event.target.value,
    });
  };
  const mainHandleSelect= (event) => {
    setParent(event.target.value);
  };
  const onChangeGender = (event) => {
    setProduct({
      ...product,
      gender: event.target.value,
    });
    if (event.target.value === "female") {
      setIsMen(false);
    } else {
      setIsMen(true);
    }
  };



  const onChangeInput = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <Box
        padding={"40px"}
        sx={{
          background: "white",
          width: "auto",
          height: "auto",
          margin: "20px",
        }}
        fullWidth
      >
        <Box
          padding={"10px"}
          sx={{
            background: "white",
            width: "auto",
            height: "auto",
            margin: "5px",
          }}
          fullWidth
        >
          <Typography
            padding={"3px"}
            variant="h5"
            gutterBottom
            sx={{
              background: "white",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Add new product
          </Typography>
         
          <hr color="black"></hr>
        </Box>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Box
            padding={"20px"}
            sx={{
              background: "white",
              width: "50%",
              height: "auto",
              margin: "10px",
            }}
            fullWidth
          >
            <Grid container direction="row" justifyContent="center">
              <Grid
                xs={4}
                sx={{ background: "white" }}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  padding={"3px"}
                  variant="h7"
                  gutterBottom
                  sx={{
                    background: "white",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Product Name
                </Typography>
              </Grid>
              <Grid
                xs={4}
                sx={{ background: "white" }}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <TextField
                  label="Name"
                  id="outlined-size-small"
                  defaultValue={product.name}
                  size="small"
                  onChange={(e) => onChangeInput(e)}
                  name="name"
                />
              </Grid>
            </Grid>
            <br />
            <Grid container direction="row" justifyContent="center">
              <Grid
                xs={4}
                sx={{ background: "white" }}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  padding={"3px"}
                  variant="h7"
                  gutterBottom
                  sx={{
                    background: "white",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Product Price
                </Typography>
              </Grid>
              <Grid
                xs={4}
                sx={{ background: "white" }}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <TextField
                  label="Price"
                  id="outlined-size-small"
                  defaultValue={product.price}
                  size="small"
                  onChange={(e) => onChangeInput(e)}
                  name="price"
                />
              </Grid>
            </Grid>

            <br />
            <Grid container direction="row" justifyContent="center">
              <Grid
                xs={4}
                sx={{ background: "white" }}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  padding={"3px"}
                  variant="h7"
                  gutterBottom
                  sx={{
                    background: "white",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Discription
                </Typography>
              </Grid>
              <Grid
                xs={4}
                sx={{ background: "white" }}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <TextField
                  label="Description"
                  id="outlined-size-small"
                  defaultValue={product.color}
                  size="small"
                  onChange={(e) => onChangeInput(e)}
                  name="color"
                />
              </Grid>
            </Grid>
            <br />
            <Grid container direction="row" justifyContent="center">
              <Grid
                xs={4}
                sx={{ background: "white" }}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  padding={"3px"}
                  variant="h7"
                  gutterBottom
                  sx={{
                    background: "white",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Product Quantity
                </Typography>
              </Grid>
              <Grid
                xs={4}
                sx={{ background: "white" }}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <TextField
                  label="Qty"
                  id="outlined-size-small"
                  defaultValue={product.size}
                  size="small"
                  onChange={(e) => onChangeInput(e)}
                  name="size"
                />
              </Grid>
            </Grid>
            <br />
            {/* <Grid container direction="row" justifyContent="center">
              <Grid
                xs={4}
                sx={{ background: "white" }}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  padding={"3px"}
                  variant="h7"
                  gutterBottom
                  sx={{
                    background: "white",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                 Main Category Name
                </Typography>
              </Grid>
              <Grid
                xs={4}
                sx={{ background: "white" }}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
           <Select value={product.category} onChange={mainHandleSelect}>
                  {mainCategory.map((category,index) => (
                      <MenuItem key={index} value={category._id}>
                        {category.name}
                      </MenuItem>
                      ))}
                
            </Select>
              </Grid>
            </Grid> */}
            <br />
            {/* <Grid container direction="row" justifyContent="center">
              <Grid
                xs={4}
                sx={{ background: "white" }}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  padding={"3px"}
                  variant="h7"
                  gutterBottom
                  sx={{
                    background: "white",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                   Sub Category Name
                </Typography>
              </Grid>
              <Grid
                xs={4}
                sx={{ background: "white" }}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Select value={product.category} onChange={handleSelect}>
                  {category.map((category,index) => (
                      <MenuItem key={index} value={category._id}>
                        {category.name}
                      </MenuItem>
                      ))}
                
                </Select>
              </Grid>
            </Grid> */}
            <br />
            <Grid container direction="row" justifyContent="center">
              <Grid
                xs={4}
                sx={{ background: "white" }}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  padding={"3px"}
                  variant="h7"
                  gutterBottom
                  sx={{
                    background: "white",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Product Image
                </Typography>
              </Grid>
              <Grid
                xs={4}
                sx={{ background: "white" }}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                 <ImageUploadButton component="label">
              <input type="file" hidden onChange={handleImage}  />
              {image ? (
                <img
                  alt="forum_post"
                  src={image}
                  style={{ minHeight: 400, minWidth: 400 }}
                />
              ) : (
                <ImageOutlinedIcon sx={{ minHeight: 400, minWidth: 400 }} />
              )}
            </ImageUploadButton>
              </Grid>
            </Grid>
            <br />
            <Grid
              xs={8}
              sx={{ background: "white" }}
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Typography
                padding={"3px"}
                gutterBottom
                sx={{
                  background: "white",
                  textAlign: "center",
                  fontSize: "10px",
                }}
              >
                JPEG, PNG, SVG or GIF <br />
                (Maximum file size 50MB)
              </Typography>
            </Grid>
          </Box>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >

          <Button variant="contained" className='btn-primary2' onClick={onClickAdd}>
            Add Product
          </Button>
          
        </Grid>
      </Box>
    </div>
  );
}