import { Box, List, ListItem, Typography } from "@mui/material";
import Link from "next/link";
import { UsersData } from "../api/users";

export default function users() {
  return (
    <>
      <Box className="bg-purple-500" p={20}>
        <div>We are on Users Routed Page</div>
        <List>
          {UsersData.map((user) => (
            <Link key={user.id} href={`/users/${user.id}`}>
              <ListItem divider>
                <Typography>{user.name}</Typography>
              </ListItem>
            </Link>
          ))}
        </List>
        <div>
          Go back to <Link href={"/"}>Home Page</Link>
        </div>
      </Box>
    </>
  );
}
