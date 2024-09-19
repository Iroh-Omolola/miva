"use client";

import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Spinner,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import validatePage from "@/component/ValidatePage";

export type Student = {
  id: string;
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: number;
};
const StudentDetails = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const { data: student, isLoading } = useQuery<Student, Error>({
    queryKey: ["student", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/api/students/${id}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });

  return (
    <div className="p-20">
      {isLoading ? (
        <Center height="100vh">
          <Spinner size="xl" />
        </Center>
      ) : (
        <Card>
          <CardHeader>
            <Heading
              size={"sm"}
              className="flex mb-8 cursor-pointer"
              onClick={() => router.push("/students")}
            >
              <IoMdArrowBack /> Go back
            </Heading>
            <Heading size="md">Student Details</Heading>
          </CardHeader>

          {!student ? (
            <Center
              h="100px"
              color="white"
              className="mb-10 bg-miva-blue mx-10 text-lg"
            >
              No details available
            </Center>
          ) : (
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Name
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {student.name}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Registration Number
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {student.registrationNumber}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Major
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {student.major}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Date of Birth
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {student.dob}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    GPA
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {student.gpa}
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          )}
        </Card>
      )}
    </div>
  );
};
export default validatePage(StudentDetails)

