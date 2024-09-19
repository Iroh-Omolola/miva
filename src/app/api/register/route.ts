import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';


/**
 * @description Handles register requests by checking the user's credentials.
 * * Ensure the email and password are required and the email is valid. 
 * Also validates the password to accept minimum of 6 characters
 * @route POST /api/register
 * @param {NextApiRequest} req - The API request object containing the register data (email, password).
 * @param {NextApiResponse} res - The API response object, used to send back the register result.
 * @returns {void} Responds with a message indicating success or failure.
 */

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), 'data', 'users.json');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /.{6,}/;

  try {
    const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    if (req.method === 'POST') {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(401).json({ message: 'All fields are  required' });
      }
      if (!emailRegex.test(email)) {
        return res.status(401).json({ message: 'Email is invalid' });
      }
      if (!passwordRegex.test(password)) {
        return res.status(401).json({ message: 'Password must be at least 6 characters long' });
      }
      // Check if the user already exists
      const existingUser = users.find((user: { email: string }) => user.email === email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      
      users.push({ email, password });

      fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
   
      return res.status(201).json({ message: 'User registered successfully' });
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error reading or writing users data', error });
  }
}
