import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { UsersData } from "../api/users";

export default function index() {
  const router = useRouter();
  const { id } = router.query; // It returns as String
  const selectedUser = UsersData.find((user) => user.id === Number(id)); // Converted to Number
  return (
    <>
      <Box p={20}>
        <div>We are on {selectedUser?.name} Page</div>
        <Typography>{selectedUser?.description}</Typography>
        <div>
          Go back to <Link href={"/"}>Home Page</Link>
        </div>
      </Box>
    </>
  );
}
