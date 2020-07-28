import { NextApiRequest, NextApiResponse } from 'next';
import { getEntriesWithVerification } from '../../utils/data';


export default (req: NextApiRequest, res: NextApiResponse) => {
    res.statusCode = 200;
    if (req.method !== "POST") {
        const data = getEntriesWithVerification();
        res.json(data);
    } else {
        let payload = undefined;
        if (typeof req.body === "object" && req.body.id && req.body.hash) {
            payload = req.body;
        }
        const data = getEntriesWithVerification(payload);
        res.json(data);
    }
}