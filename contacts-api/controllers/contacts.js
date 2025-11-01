const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connect");

const getAll = async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.collection("contacts").find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const db = getDb();
    const contactId = new ObjectId(req.params.id);
    const contact = await db.collection("contacts").findOne({ _id: contactId });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle };