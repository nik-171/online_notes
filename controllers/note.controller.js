import notesModel from "../models/notes.model.js"

const createNote = async(req, res) => {
    const { title, content } = req.body;
    const note = new notesModel({ title, content, user: req.userId });

    await note.save()
    return res.status(201).json(note)
}

const getNotes = async (req, res) => {
    try {
        const notes = await notesModel.find({ user: req.userId });
        return res.json(notes);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Ошибка сервера' });
      }
};

const getOneNote = async (req, res) => {
    const id = req.params.id    
    const note = await notesModel.findById(req.params.id)

    if (!note) return res.status(404).json({ message: "Заметка не найдена" });
    if (note.user.toString() !== req.userId) return res.status(403).json({ message: 'доступ запрещен' });

    console.log('get with id')
    return res.json(note)
}

const updateNote = async(req, res) => {
    const note = await notesModel.findById(req.params.id)
    if (!note) return res.status(404).json({ message: "Заметка не найдена" });
    if (note.user.toString() !== req.userId) return res.status(403).json({ message: 'доступ запрещен' });

    note.title = req.body.title;
    note.content = req.body.content;
    
    await note.save()

    return res.json(note)
}

const deleteNote = async(req, res) => {
    const note = await notesModel.findById(req.params.id)
    if (!note) return res.status(404).json({ message: "Заметка не найдена" });
    if (note.user.toString() !== req.userId) return res.status(403).json({ message: 'доступ запрещен' });

    await note.deleteOne()

    return res.status(200).json({ message: "Заметка удалена" });
}

export { createNote, getNotes, updateNote, deleteNote, getOneNote }