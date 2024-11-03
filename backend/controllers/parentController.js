import Parent from '../models/parentModel.js';

// Get a parent by ID
export const getParentById = async (req, res) => {
    const parentId = req.params.id;
    try {
        const parent = await Parent.findById(parentId);
        if (!parent) {
            return res.status(404).json({ message: 'Parent not found' });
        }
        res.status(200).json(parent);
    } catch (error) {
        console.error('Error fetching parent:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a parent by ID
export const updateParentById = async (req, res) => {
    const parentId = req.params.id;
    const updateData = req.body;

    try {
        const parent = await Parent.findByIdAndUpdate(parentId, updateData, { new: true });
        if (!parent) {
            return res.status(404).json({ message: 'Parent not found' });
        }
        res.status(200).json(parent);
    } catch (error) {
        console.error('Error updating parent:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a parent by email
export const getParentByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const parent = await Parent.findOne({ email });
        if (!parent) {
            return res.status(404).json({ message: 'Parent not found' });
        }
        res.status(200).json(parent);
    } catch (error) {
        console.error('Error fetching parent:', error);
        res.status(500).json({ message: 'Server error' });
    }
};