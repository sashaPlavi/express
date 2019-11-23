const express = require("express");
const router = express.Router();
const members = require("../../members");
const uuid = require("uuid");

router.get("/", (req, res) => {
  res.json(members);
});
// geting single member
router.get("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    //changing status code and eror mesage
    res
      .status(400)
      .json({ msg: `no member with id ${req.params.id} was found` });
    console.log("bla2");
  }
});
//creating member
router.post("/", (req, res) => {
  const NewMember = {
    id: uuid.v4(),
    name: req.body.name,
    mail: req.body.mail,
    status: "active"
  };
  if (!NewMember.name || !NewMember.mail) {
    return res.status(400).json({ msg: "please enter mail and name" });
  }
  members.push(NewMember);
  res.json(members);
});
// udate member
router.put("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    const updMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.mail = updMember.mail ? updMember.mail : member.mail;
        res.json({ msg: "member was updated", member });
      }
    });
  } else {
    res
      .status(400)
      .json({ msg: `no member with id ${req.params.id} was found` });
  }
});
//delete member
router.delete("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "member deleted",
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    res
      .status(400)
      .json({ msg: `no member with id ${req.params.id} was found` });
    console.log("bla2");
  }
});

module.exports = router;
