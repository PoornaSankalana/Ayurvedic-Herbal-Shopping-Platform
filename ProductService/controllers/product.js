import Product from "../models/product.js";
import nodemailer from 'nodemailer';
async function sendMail() {
  
  let testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({

    host: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: "dilshanlakindu5@gmail.com",
      pass: "xnptxycbugmsvzbg",
    },
  });

  // Create the email message
  const mailOptions = {
    from:  '"CMS Back Office 👻" <dilshanlakindu5@gmail.com>',
    to: 'dilshanlakindu5@gmail.com',
    subject: 'Email Subject',
    text: 'Hello, This is a test email.'
  };

  // Send the email
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred:', error.message);
    } else {
      console.log('Email sent successfully!');
    }
  });
}
const productController={

    // add item to the data base
    createProduct: async (req, res) => {
        try {
          const { name, price, color, size, productImage,description} = req.body;
            if (!name || !price)
            return res.status(400).json({ msg: "Please fill in all fields." });

            const newProduct = new Product({
              name, price, color, size, productImage,description
            });
            console.log(newProduct)
            await newProduct.save();
            res.json({
                message:"Product Added success",
                data:newProduct,
            });
            sendMail()
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
  // get all products from the database
  getProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.json({ message: "Products fetch success", data: products });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  // get one product from the database
  // getOneProduct: async (req, res) => {
  //   const id = req.params.id;
  //   try {
  //     const product = await Product.findOne({ _id: id });
  //     res.json({ message: "Product fetch success", data: product });
  //   } catch (err) {
  //     return res.status(500).json({ message: err.message });
  //   }
  // },

  //   getCategoryProduct: async (req, res) => {
  //     const { product } = req.body;
  //       try {

  //           const categoryProduct = await Product.find({product:product});
  //           res.json({ message: " Sub Category file fetch success", data: categoryProduct});
  //       } catch (err) {
  //           return res.status(500).json({ message: err.message });
  //       }
  //   },
    // get one item in the data base
    getOneProduct: async (req, res) => {
        const id = req.params.id;
        try {
            const product = await Product.findOne({ _id: id });
            res.json({ message: "Product fetch success", data: product });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    updateProduct: async (req, res) => {
        try {
          const id = req.params.id;
          const {name, price, color,size,categories,gender,productImage,description}= req.body;
    
          await Product.findOneAndUpdate(
            { _id: id },
            { name, price, color, size, categories, gender, productImage,description}
          );
          res.json({
            message: "Product update success",
            data: { name, price, color, size, categories, gender, productImage,description},
          });
        } catch (err) {
          return res.status(500).json({ message: err.message });
        }
      },
      deleteProduct: async (req, res) => {
        try {
          const id = req.params.id;
    
          await Product.findByIdAndDelete({ _id: id });
          res.json({ message: "delete success !" });
        } catch (err) {
          return res.status(500).json({ message: err.message });
        }
      },


};
export default productController;