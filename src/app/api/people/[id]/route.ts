import type { NextApiRequest, NextApiResponse } from 'next';
import PersonModel from '../../models/person';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const person = await PersonModel.findById(id);
        if (!person) {
          return res.status(404).json({ error: 'Person not found.' });
        }
        res.status(200).json(person);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch person.' });
      }
      break;

    case 'PUT':
      try {
        const updatedPerson = await PersonModel.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updatedPerson) {
          return res.status(404).json({ error: 'Person not found.' });
        }
        res.status(200).json(updatedPerson);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update person.' });
      }
      break;

    case 'DELETE':
      try {
        const deletedPerson = await PersonModel.findByIdAndDelete(id);
        if (!deletedPerson) {
          return res.status(404).json({ error: 'Person not found.' });
        }
        res.status(200).json({ message: 'Person deleted successfully.' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete person.' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
