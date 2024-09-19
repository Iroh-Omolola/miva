import { NextApiRequest, NextApiResponse } from 'next';
import students from '@/data/students.json'; 

/**
 * API Handler for student data management.
 * 
 * This module provides GET and POST request handling for student information.
 * It uses an in-memory array to simulate a database of students.
 */

/**
 * Handles GET requests to retrieve the list of students.
 * 
 * @param {Request} req - The incoming request object.
 * @param {NextApiResponse} res - The response object to send back the data.
 * 
 * @returns {Response} A JSON response containing the list of students with a status code of 200.
 */

export async function GET(req: Request, res: NextApiResponse) {
  return new Response(JSON.stringify(students), { status: 200 });
}

/**
 * Handles POST requests to add a new student.
 * 
 * This function validates the incoming request body to ensure all required fields
 * are provided and that GPA is a number and not more than 5. If validation passes, the new student
 * is added to the students data file
 * 
 * @param {Request} req - The incoming request object containing the student data.
 * @param {NextApiResponse} res - The response object to send back the result of the operation.
 * 
 * @returns {Response} 
 * - If validation fails, a response with status 400 and an error message.
 * - If the GPA is not a number, a response with status 400 and an error message.
 * - If the operation is successful, a response with status 201, a success message, and the new student object.
 * - If an error occurs during processing, a response with status 500 and an error message.
 */

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const body = await req.json();
    // All requestbody are required fields
    // Validate the request 
    const { name, registrationNumber, major, dob, gpa } = body;
    if (!name || !registrationNumber || !major || !dob || !gpa) {
      return new Response(JSON.stringify({ message: "All fields are required." }), { status: 400 });
    }
    if (typeof gpa !== 'number') {
        return new Response(JSON.stringify({ message: "GPA must be a number." }), { status: 400 });
      }
      if (Number(gpa) > 5) {
        return new Response(JSON.stringify({ message: "GPA cannot be more than 5." }), { status: 400 });
      }
    const newStudent = {
      id: String(students.length + 1),
      name,
      registrationNumber,
      major,
      dob,
      gpa,
    };
    students.push(newStudent);

    return new Response(JSON.stringify({ message: "Student added!", student: newStudent }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error adding student" }), { status: 500 });
  }
}
