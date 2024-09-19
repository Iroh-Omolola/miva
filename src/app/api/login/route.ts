import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// User type defined
interface User {
  email: string;
  password: string;
}

/**
 * @description Handles login requests by checking the user's credentials and if data is in the memory array
 * Ensure the email and password are required and the email is valid. 
 * Also validates the password to accept minimum of 6 characters
 * @route POST /api/login
 * @param {NextApiRequest} req - The API request object containing the login data (email, password).
 * @param {NextApiResponse} res - The API response object, used to send back the login result.
 * @returns {void} Responds with a message indicating success or failure.
 */

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), 'data', 'users.json');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /.{6,}/;
  
  try {
    const users: User[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    if (req.method === 'POST') {
      const { email, password } = await req.body as User;
      
      if (!email || !password) {
        return res.status(401).json({ message: 'All fields are  required' });
      }
      if (!emailRegex.test(email)) {
        return res.status(401).json({ message: 'Email is invalid' });
      }
      if (!passwordRegex.test(password)) {
        return res.status(401).json({ message: 'Password must be at least 6 characters long' });
      }
      const user = users.find(s => s.email === email && s.password === password);

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
 
      return res.status(200).json({ message: 'Login successful' });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error reading users data',error: (error as Error).message });
  }
}
