import type { NextApiRequest, NextApiResponse } from 'next';
import { postHandler } from './add/route';

interface IRequest {
  json: () => Promise<{ name: string; status: 'Missing' | 'Found' | 'Deceased' }>;
}

class CustomRequest implements IRequest {
  constructor(private req: NextApiRequest) {}

  async json() {
    return JSON.parse(this.req.body);
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const customReq = new CustomRequest(req);
      postHandler(customReq, res);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
