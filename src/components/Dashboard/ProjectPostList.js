import { Card, CardContent } from "@material-ui/core";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useState, React, useEffect } from "react";
import Api from "../../Api/Api";

const ProjectPostList = (props) => {
  const project_id = location.href
    .split("/")
    [location.href.split("/").length - 1].split(".")[0];
  const { PostArrays } = props;
  const [postArrays, setpostArrays] = useState(PostArrays);
  const [post, setpost] = useState([]);

  function handlechange(value) {
    post.map(async (idx) => {
      if (value == idx.post_title) {
        let response2 = await Api.deletePosting(project_id, idx.post_id);
      }
    });
    setpostArrays(postArrays.filter((post) => post !== value));
  }

  useEffect(async () => {
    props.propfunction(postArrays);
  }, [postArrays]);

  useEffect(async () => {
    if (project_id != "ProjectRegister") {
      let response2 = await Api.getPostingList(project_id);
      let postlist = [];
      if (response2.data.sucess == true) {
        response2.data.posts.map((idx) => {
          postlist.push(idx.post_title);
        });
        setpostArrays(postlist);
        setpost(response2.data.posts);
      }
    }
  }, []);

  return (
    <>
      <Card>
        <CardContent>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {postArrays.map((value) => (
              <ListItem
                key={value}
                disableGutters
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handlechange(value)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={`${value}`} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </>
  );
};

export default ProjectPostList;
