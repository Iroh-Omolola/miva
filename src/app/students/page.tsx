"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { BsPlusLg, BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { useMutation, useQuery } from "@tanstack/react-query";
import PageFrame from "@/component/PageFrame";
import validatePage from "@/component/ValidatePage";

type Student = {
  id: string;
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: number;
};

const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleting, setDeleting] = useState<boolean>(false);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);



  const { data, isLoading, refetch } = useQuery<Student[], Error>({
    queryKey: ["students"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/api/students`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });

  const onDelete = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`http://localhost:3000/api/students/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete the student");
      }
      return id; // Return the ID of the deleted student
    },
    onMutate: (id: string) => {
      setDeleting(true);
    },
    onSuccess: (id) => {
      setDeleting(false);
      refetch();
    },
    onError: () => {
      setDeleting(false);
    },
  });

  // Search students by filtering with the searchterm
  useEffect(() => {
    if (data) {
      const filtered = data.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.registrationNumber.includes(searchTerm)
      );
      setStudents(filtered);
    } else {
      setStudents([]);
    }
  }, [searchTerm, data]);

  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <PageFrame>
      <div className="md:overflow-x-auto bg-[#F9F9FB] pb-[50px] h-fit p-4 mt-10">
        <div className="mb-4 text-center">
          <h1 className="text-lg text-miva-blue font-semibold">Student List</h1>
          <p className="text-slate-500">
            These are the list of the students in the system
          </p>
        </div>
        <div className="flex sm:flex-row flex-col gap-3 justify-between mb-3">
          <div className="sm:w-[60%] md:w-[289px] bg-[#fff] flex gap-2 items-center rounded-[9px] pl-4 pr-4 border-[1px] border-[#E4EBF5]">
            <BsSearch className="text-miva-blue" />
            <input
              className="text-[13px] text-miva-blue py-[10px] w-[279px] outline-none"
              type="text"
              placeholder="Search by name or registration number"
              onChange={(e) => setSearchTerm(e.target.value)} 
              value={searchTerm}
            />
          </div>
          <Button
            colorScheme="white"
            size="lg"
            className="bg-miva-blue"
            leftIcon={<BsPlusLg />}
            onClick={() => router.push("/students/new")}
          >
            Add a new student
          </Button>
        </div>
        <TableContainer className="border rounded">
          <Table variant="simple">
            <Thead className="bg-slate-100">
              <Tr className="text-black">
                <Th>Name</Th>
                <Th>Registration No.</Th>
                <Th>Major</Th>
                <Th>DOB</Th>
                <Th>GPA</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <Tr className="text-black" key={student.id}>
                    <Td>{student.name}</Td>
                    <Td>{student.registrationNumber}</Td>
                    <Td>{student.major}</Td>
                    <Td>{moment(student.dob).format("DD MMM, YYYY")}</Td>
                    <Td>{student.gpa}</Td>
                    <Td>
                      <Menu>
                        <MenuButton>
                          <BsThreeDotsVertical />
                        </MenuButton>
                        <MenuList>
                          <MenuItem
                            onClick={() =>
                              router.push(`/students/${student.id}`)
                            }
                          >
                            View Details
                          </MenuItem>
                          <MenuItem onClick={()=>router.push(`/students/${student.id}/edit`)}>Edit Details</MenuItem>
                          <MenuItem onClick={onOpen}>Delete</MenuItem>
                        </MenuList>
                      </Menu>
                      <AlertDialog
                        leastDestructiveRef={cancelRef}
                        motionPreset="slideInBottom"
                        onClose={onClose}
                        isOpen={isOpen}
                        isCentered
                      >
                        <AlertDialogOverlay className="flex justify-center">
                          <AlertDialogContent>
                            <AlertDialogHeader
                              className="text-black"
                              fontSize="lg"
                              fontWeight="bold"
                            >
                              Delete Student
                            </AlertDialogHeader>

                            <AlertDialogBody className="text-black">
                              Are you sure? You can't undo this action
                              afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                              <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                              </Button>
                              <Button
                                isLoading={deleting}
                                colorScheme="red"
                                onClick={() => onDelete.mutate(student.id)}
                                ml={3}
                              >
                                Delete
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialogOverlay>
                      </AlertDialog>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={6} className="text-center">
                    No students found
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </PageFrame>
  );
};

export default validatePage(Students)
