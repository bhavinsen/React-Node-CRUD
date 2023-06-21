const express = require("express");
const router = express.Router();
const Schema = require("../controller/userController");

// Create data router
router.post("/addcontact", Schema.createSchema);
// Get data router
router.get("/getcontact", Schema.getSchema);
// Delete data router
router.delete("/deletecontact/:id", Schema.deleteSchema);
// Edit data router
router.put("/updatecontact/:id", Schema.updateSchema);

module.exports = router;
