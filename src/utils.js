import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from 'bcrypt';
import {faker} from "@faker-js/faker/locale/es";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/public/img`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const uploader = multer({ storage });

export default __dirname;

export const creatHash = (password)=>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password)=>
  bcrypt.compareSync(password, user.password);

export const generateProduct = () => { 
  return {
    id: faker.database.mongodbObjectId(),
    code: faker.string.alphanumeric(8),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    department: faker.commerce.department(),
    stock: faker.number.int({ min: 0, max: 100 }),
    image: faker.image.url(),
  };
};
