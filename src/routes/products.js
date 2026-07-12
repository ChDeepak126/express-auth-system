import { Router } from "express";
const router=Router();
const products = [
  {
    id: 1,
    name: "Katana",
    category: "Weapon",
    price: 1200,
    stock: 15
  },
  {
    id: 2,
    name: "Straw Hat",
    category: "Accessory",
    price: 250,
    stock: 30
  },
  {
    id: 3,
    name: "Den Den Mushi",
    category: "Communication",
    price: 800,
    stock: 8
  },
  {
    id: 4,
    name: "Meat Pack",
    category: "Food",
    price: 100,
    stock: 50
  }
];
router.get("/api/products", (req, res) => {
  if(req.cookies.hello&&req.cookies.hello==="world")
     return res.status(200).json(products);
  return res.status(401).send("sorry you cant access this page");
});
export default router;