const Model = require("../model");
// Create Data API
const createSchema = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const exist = await Model.findOne({ email });
    if (exist) {
      return res.status(400).json({
        success: false,
        message: "This email is already exist",
      });
    }
    const newData = new Model({
      name,
      email,
      phone,
    });
    const savedData = await newData.save();
    return res.status(200).json({
      success: true,
      message: "Addedd Successfully!!!",
      savedData,
    });
  } catch (error) {
    next(error);
  }
};
// Find Data API
const getSchema = async (req, res, next) => {
  try {
    const data = await Model.find()
    return res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

// Update API
const updateSchema = async (req, res, next) => {
  try {
    const id = req.params.id;
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };
    const data = await Model.findByIdAndUpdate(id, newUser);
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "not a valid id",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Updated successfully!!!!",
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

// Delete API
const deleteSchema = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "Data not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSchema,
  getSchema,
  updateSchema,
  deleteSchema,
};
