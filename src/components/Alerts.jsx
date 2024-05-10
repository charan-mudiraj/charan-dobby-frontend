import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import WarningIcon from "@mui/icons-material/Warning";
import ReportIcon from "@mui/icons-material/Report";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import * as React from "react";
import "./Alerts.css";

const openAlertStyles = {
  transform: "translateX(0)",
};
const closeAlertStyles = {
  transform: "translateX(100%)",
};
function Warning({ title, description, isOpen, closeAlert }) {
  const toggleStyles = isOpen ? openAlertStyles : closeAlertStyles;
  return (
    <Alert
      key={"Warning"}
      className={"alert"}
      id={"warning"}
      sx={{ alignItems: "flex-start", ...toggleStyles }}
      startDecorator={<WarningIcon />}
      variant="soft"
      color={"warning"}
      endDecorator={
        <IconButton variant="soft" color={"warning"}>
          <CloseRoundedIcon onClick={closeAlert} />
        </IconButton>
      }
    >
      <div>
        <div>{title}</div>
        <Typography level="body-sm" color={"warning"}>
          {description}
        </Typography>
      </div>
    </Alert>
  );
}
function Success({ title, description, isOpen, closeAlert }) {
  const toggleStyles = isOpen ? openAlertStyles : closeAlertStyles;
  return (
    <Alert
      key={"Success"}
      id={"success"}
      className={"alert"}
      sx={{ alignItems: "flex-start", ...toggleStyles }}
      startDecorator={<CheckCircleIcon />}
      variant="soft"
      color={"success"}
      endDecorator={
        <IconButton variant="soft" color={"success"}>
          <CloseRoundedIcon onClick={closeAlert} />
        </IconButton>
      }
    >
      <div>
        <div>{title}</div>
        <Typography level="body-sm" color={"success"}>
          {description}
        </Typography>
      </div>
    </Alert>
  );
}
function Error({ title, description, isOpen, closeAlert }) {
  const toggleStyles = isOpen ? openAlertStyles : closeAlertStyles;
  return (
    <Alert
      key={"Error"}
      id={"error"}
      className={"alert"}
      sx={{ alignItems: "flex-start", ...toggleStyles }}
      startDecorator={<ReportIcon />}
      variant="soft"
      color={"danger"}
      endDecorator={
        <IconButton variant="soft" color={"danger"}>
          <CloseRoundedIcon onClick={closeAlert} />
        </IconButton>
      }
    >
      <div>
        <div>{title}</div>
        <Typography level="body-sm" color={"danger"}>
          {description}
        </Typography>
      </div>
    </Alert>
  );
}

export { Warning, Success, Error };
