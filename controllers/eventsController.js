const eventModel = require("../models/eventsModels");

const addEvent = async (req, res) => {
  try {
    const newevent = new eventModel({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      ticketPrice: req.body.ticketPrice,
      attendees: req.body.attendees,
    });

    await newevent.save();
    res.status(201).json({
      status: "Succeed",
      message: "Evento creado correctamente",
      data: newevent,
    });
  } catch (error) {
    res
      .status(404)
      .json({ status: "Failed", data: null, error: error.message });
  }
};

module.exports = addEvent;
