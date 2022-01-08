import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomizedProgressBars from "./Progressbar";
import { useHistory } from "react-router-dom";

export default function PostCard(props) {
  const history = useHistory();

  function cardClickHandler() {
    history.push(`posts/${props.id}`);
  }

  return (
    <Card onClick={cardClickHandler} sx={{ minWidth: 345, maxWidth: 345, margin: "40px 30px", cursor: "pointer" }} elevation={5}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {props.title[0] || "A"}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.title}
        subheader={props.subheader}
      />
      <CardMedia
        component="img"
        height="194"
        image={`/static/images/${props.image}.jpg`}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
        <CustomizedProgressBars collected={props.collected} target={props.target} />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions> 
    </Card>
  );
}