import { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { findUnfollowers, unfollowUsers } from "../api/user";
import { AppContext } from "../context/AppProvider";
import Loading from "./Loading";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const DesktopIcon = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const MobileIcon = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "flex",
  },
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function UnfollowerList() {
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);

  const [unfollowedUsersData, setUnfollowedUsersData] = useState([]);

  const { isLoading, setIsLoading } = useContext(AppContext);

  const handleFindUnfollowers = async () => {
    if (!unfollowedUsersData.length) {
      setIsLoading(true);
      const { notFollowingYou } = await findUnfollowers();
      setUnfollowedUsersData(notFollowingYou);
      const UnfollowedUserList = notFollowingYou.map((user) => user.username);
      console.log(UnfollowedUserList);
      setLeft((prev) => [...prev, ...UnfollowedUserList]);
      setIsLoading(false);
    }
  };

  const handleUnfollowUsers = async () => {
    setIsLoading(true);

    const checkedUnfollowedUsers = unfollowedUsersData.filter(
      (user) => rightChecked.indexOf(user.username) !== -1
    );

    const { unfollowedUsers } = await unfollowUsers(checkedUnfollowedUsers);
    console.log(unfollowedUsers);

    setRight([...not(right, rightChecked)]);

    setIsLoading(false);

    setAlertOpen(true);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card sx={{ p: 2 }}>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <>
      {alertOpen && (
        <Snackbar
          open={alertOpen}
          onClose={() => setAlertOpen(false)}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert severity="success">Unfollow successfully!</Alert>
        </Snackbar>
      )}
      {isLoading && <Loading />}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        direction={{
          md: "row",
          xs: "column",
        }}
        sx={{
          transform: {
            md: "scale(1.3)",
            xs: "scale(1)",
          },
        }}
      >
        <Grid item>
          {customList("Choices", left)}
          <Button
            variant="outlined"
            size="medium"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleFindUnfollowers}
          >
            Find Unfollowers
          </Button>
        </Grid>
        <Grid item>
          <Grid
            container
            alignItems="center"
            sx={{
              flexDirection: {
                md: "column",
                xs: "row",
              },
              gap: 2,
              my: 2,
            }}
          >
            <Button
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              <MobileIcon>
                <KeyboardArrowDownIcon />
              </MobileIcon>
              <DesktopIcon>
                <KeyboardArrowRightIcon />
              </DesktopIcon>
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              <MobileIcon>
                <KeyboardArrowUpIcon />
              </MobileIcon>
              <DesktopIcon>
                <KeyboardArrowLeftIcon />
              </DesktopIcon>
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          {customList("Chosen", right)}
          <Button
            variant="outlined"
            size="medium"
            fullWidth
            sx={{ mt: 2 }}
            disabled={rightChecked.length === 0}
            onClick={handleOpenDialog}
          >
            Unfollow All
          </Button>
          <Dialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
              {"Are You Sure You Want to Unfollow These Users?"}
            </DialogTitle>
            <DialogContent>
              <Typography component="span" variant="body1">
                Are you sure you want to unfollow the selected users:
                <DialogContentText
                  id="alert-dialog-descriptyion"
                  sx={{ fontWeight: "bold", my: 2 }}
                >
                  {rightChecked.join(", ")}
                </DialogContentText>
                This process will take a few minutes to complete.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button
                onClick={() => {
                  handleCloseDialog();
                  handleUnfollowUsers();
                }}
                autoFocus
              >
                Unfollow
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </>
  );
}
