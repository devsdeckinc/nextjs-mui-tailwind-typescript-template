import { Box } from "@mui/material";
import Link from "next/link";

export default function hello() {
  return (
    <>
      <Box p={20}>
        <div>We are on Hello Routed Page</div>
        <div>Go back to <Link href={"/"}>Home Page</Link></div>
      </Box>
    </>
  );
}
