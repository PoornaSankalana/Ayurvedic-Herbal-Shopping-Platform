import React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Form from "react-bootstrap/Form";
import PropTypes from 'prop-types';
// import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
// import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
// import OptionGroupUnstyled from '@mui/base/OptionGroupUnstyled';
// import PopperUnstyled from '@mui/base/PopperUnstyled';
import {Button} from "@mui/material";
import { styled } from '@mui/system';
import { toast } from "react-toastify";
import { ImageUploadButton } from "../../pages/UpdateProduct/styles";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// const blue = {
//   100: "#DAECFF",
//   200: "#99CCF3",
//   400: "#3399FF",
//   500: "#007FFF",
//   600: "#0072E5",
//   900: "#003A75",
// };

// const grey = {
//   50: "#f6f8fa",
//   100: "#eaeef2",
//   200: "#d0d7de",
//   300: "#afb8c1",
//   400: "#8c959f",
//   500: "#6e7781",
//   600: "#57606a",
//   700: "#424a53",
//   800: "#32383f",
//   900: "#24292f",
// };

// const StyledButton = styled("button")(
//   ({ theme }) => `
//   font-family: IBM Plex Sans, sans-serif;
//   font-size: 0.875rem;
//   box-sizing: border-box;
//   min-height: calc(1.5em + 22px);
//   min-width: 320px;
//   padding: 12px;
//   border-radius: 12px;
//   text-align: left;
//   line-height: 1.5;
//   background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
//   border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
//   color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};

//   transition-property: all;
//   transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
//   transition-duration: 120ms;

//   &:hover {
//     background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
//     border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
//   }

//   &.${selectUnstyledClasses.focusVisible} {
//     border-color: ${blue[400]};
//     outline: 3px solid ${theme.palette.mode === "dark" ? blue[500] : blue[200]};
//   }

//   &.${selectUnstyledClasses.expanded} {
//     &::after {
//       content: '▴';
//     }
//   }

//   &::after {
//     content: '▾';
//     float: right;
//   }
//   `
// );

// const StyledListbox = styled("ul")(
//   ({ theme }) => `
//   font-family: IBM Plex Sans, sans-serif;
//   font-size: 0.875rem;
//   box-sizing: border-box;
//   padding: 6px;
//   margin: 12px 0;
//   min-width: 320px;
//   border-radius: 12px;
//   overflow: auto;
//   outline: 0px;
//   background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
//   border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
//   color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
//   box-shadow: 0px 4px 30px ${
//     theme.palette.mode === "dark" ? grey[900] : grey[200]
//   };
//   `
// );


// const StyledGroupRoot = styled("li")`
//   list-style: none;
// `;

// const StyledGroupHeader = styled("span")`
//   display: block;
//   padding: 15px 0 5px 10px;
//   font-size: 0.75em;
//   font-weight: 600;
//   text-transform: uppercase;
//   letter-spacing: 0.05rem;
//   color: ${grey[600]};
// `;

// const StyledGroupOptions = styled("ul")`
//   list-style: none;
//   margin-left: 0;
//   padding: 0;

//   > li {
//     padding-left: 20px;
//   }
// `;

// const StyledPopper = styled(PopperUnstyled)`
//   z-index: 1;
// `;

// function CustomSelect(props) {
//   const slots = {
//     root: StyledButton,
//     listbox: StyledListbox,
//     popper: StyledPopper,
//     ...props.slots,
//   };

//   return <SelectUnstyled {...props} slots={slots} />;
// }

// CustomSelect.propTypes = {
//   /**
//    * The components used for each slot inside the Select.
//    * Either a string to use a HTML element or a component.
//    * @default {}
//    */
//   slots: PropTypes.shape({
//     listbox: PropTypes.elementType,
//     popper: PropTypes.func,
//     root: PropTypes.elementType,
//   }),
// };

// const CustomOptionGroup = React.forwardRef(function CustomOptionGroup(
//   props,
//   ref
// ) {
//   const slots = {
//     root: StyledGroupRoot,
//     label: StyledGroupHeader,
//     list: StyledGroupOptions,
//     ...props.slots,
//   };

//   return <OptionGroupUnstyled {...props} ref={ref} slots={slots} />;
// });

// CustomOptionGroup.propTypes = {
//   /**
//    * The components used for each slot inside the OptionGroupUnstyled.
//    * Either a string to use a HTML element or a component.
//    * @default {}
//    */
//   slots: PropTypes.shape({
//     label: PropTypes.elementType,
//     list: PropTypes.elementType,
//     root: PropTypes.elementType,
//   }),
// };

export default function UpdateProduct() {
  const params = useParams();
  const productId = params.id;
  console.log("🚀 ~ file: index.jsx:192 ~ UpdateProduct ~ productId:", productId)
  const [parent,setParent] = React.useState();
  const [mainCategory,setMainCategory] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [image, setImage] = React.useState(false);
  const [isMen, setIsMen] = React.useState(false);
  const navigate = useNavigate();
  const [product, setProduct] = React.useState({
    name: "",
    price: "",
    color: "",
    size: "",
    gender: "female",
    categories: "",
    productImage: "",
    description: "",
  });
  console.log("🚀 ~ file: index.jsx:208 ~ UpdateProduct ~ product", product)
  async function fetchData() {
    const response = await axios.get(
      `http://localhost:5003/api/product/get/${productId}`
    );
    setProduct(response.data.data);
  }
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




  React.useEffect(() => {
    fetchData();
   
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
      product.color === "" ||
      product.categories === ""
    ) {
      alert("Fill all the fields");
    } else {
      try {
        const res = await axios.put(
          `http://localhost:5003/api/Product/update/${productId}`,
          product
        );
        console.log(res);
        navigate("/seller")
        toast.success(res.data.message);
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
            Update product
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
                  value={product.name}
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
                  value={product.price}
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
                  Product Color
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
                  label="Color"
                  id="outlined-size-small"
                  value={product.color}
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
                  Product Sizes
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
                  label="Size"
                  id="outlined-size-small"
                  value={product.size}
                  size="small"
                  onChange={(e) => onChangeInput(e)}
                  name="size"
                />
              </Grid>
            </Grid>
            <br />
           
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
                <img
                  alt="forum_post"
                  src={product.productImage}
                  style={{ minHeight: 400, minWidth: 400 }}
                />
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
          <Button variant="contained" onClick={onClickAdd}>
            Save Changes
          </Button>
        </Grid>
      </Box>
    </div>
  );
}
