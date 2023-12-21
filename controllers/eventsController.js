const eventModel = require("../models/eventsModels");
const userModel = require("../models/userModels")
const XLSX = require("xlsx");
const PDFDocument = require("pdfkit");

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

const getEventByUserId = async(req, res) => {
  try {

    const userId = req.user.userId;
    // const events = await eventModel.find({attendees: userId});

    const events = eventModel.find();

    const eventsBYUserId = await events.filter((event) => event.attendees.includes(userId));
console.log(eventsBYUserId)
    res.status(200).json(eventsBYUserId);

  } catch (error) {
    res
      .status(500)
      .json({ status: "Error al recopilar la informacion del user", error: error.message });
  }
}

const addUserToEvent = async(req, res) => {
  try {
    const userId = req.user.userId;
    const eventId = req.params.eventId;

    const user = await userModel.findById(userId);
    if(!user) {
      return res.status(404).json({message:"Usuario no encontrado"});
    }

    const event = await eventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({message:"Evento no encontrado"});

    }
    
    const isUserAttending = event.attendees.includes(userId)
    if(!isUserAttending) {
      return res.status(404).json({message:"El usuario ya esta en la lista"});
    }

    event.attendees.push(userId);
    
    event.save();

    res.status(200).json(eventsByUserId)
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error al recopilar la informacion del user", error: error.message });
  }
};

const profitsForEvent = async(req, res) => {
  try {
    const eventId = req.params.eventId;

    const event = await eventModel.findById(eventId);
    if(!event) {
      return res.status(404).json({message:"Evento no encontrado"});
    }

    const profits = event.ticketPrice * event.attendees.length;

    res.status(200).json(profits);
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error al crear el evento", error: error.message });
  }
};

const donwloadEventExcel = async(req, res) => {
  try {
    const events = await eventModel.find();
    if(events.length === 0) {
      return res.status(404).json({message:"No se encontraron eventos"});
    }

    const data = events.map((event) => ({
      Titulo: event.title,
      Description: event.description,
      Ubicacion: event.location,
      'Precio de ticket': event.ticketPrice,
      'Creado el': event.date,
      Asistentes: event.attendees.join(','),
    }));

    const workbook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, workSheet, 'Eventos')

    const buffer = XLSX.write(workbook, {type: 'buffer', bookType: 'xlsx'});

    res.setHeader('Content-Type', "application/octet-stream");
    res.setHeader('Content-Disposition', "attachment; filename=events.xlsx");

    res.status(200).send(buffer);

  } catch (error) {
    res
      .status(500)
      .json({ status: "Error al crear el Excel", error: error.message });
  }
};


const donwloadEventPDF = async(req, res) => {
  try {
    const events = await eventModel.find();
    if(events.length === 0) {
      return res.status(404).json({message:"No se encontraron eventos"});
    }

    const doc = new PDFdocument();

    const buffer = [];
    doc.on('data', metadata = buffers.push(metadata));

    doc.fontSize(19).text('Listado de eventos', { align:'center'})
    doc.moveDown();

    events.forEach((event) =>{
      doc.fontSize(14).text(`Titulo ${event.title}`),
      doc.text(`Location ${event.location}`),
      doc.text(`TicketPrice ${event.ticketPrice}`),
      doc.text(`Description ${event.description}`),
      doc.text("---")

    });

    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(buffers);
      res.setHeader('Content-Type', 'application/pdf');
      res.status(200).send(pdfBuffer);
    });

    doc.end();
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error al crear el PDF", error: error.message });
  }
};



module.exports = {addEvent, getEventByUserId, addUserToEvent, profitsForEvent, donwloadEventExcel, donwloadEventPDF};
