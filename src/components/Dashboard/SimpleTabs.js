import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TeamProfile from "src/components/Dashboard/TeamProfile";
import FileViewer from "src/components/Dashboard/FileViewer";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Video from "src/components/Dashboard/Video";
import PostView from "src/components/Dashboard/PostView";
import { useState, useEffect } from "react";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = useState({
    type: 0,
    content: "",
  });
  const temp = "";
  const { contents, members, postList, project_id } = props;

  const handleChange = (event, newValue) => {
    setValue({
      type: newValue,
      content: value.content,
    });
  };

  function list(postList) {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            textColor="inherit"
            value={value.type}
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
          >
            <Tab key={"firstView"} label={"프로젝트 소개"} {...a11yProps(0)} />
            {postListTitle(postList)}
            <Tab
              key={"lastView"}
              label={"팀원 소개"}
              {...a11yProps(postList.size + 1)}
            />
          </Tabs>
        </AppBar>
        {postListContent(postList)}
      </div>
    );
  }

  function postListTitle(postList) {
    if (postList.length != 0) {
      return postList.map((p, index) => (
        <Tab key={p.post_id} label={p.post_title} {...a11yProps(index + 1)} />
      ));
    } else {
      return temp;
    }
  }

  function postListContent(postList) {
    const pages = postList.length + 2;
    // 게시글이 있는 경우
    if (postList != null) {
      return (
        <div>
          <TabPanel key={"firstView"} value={value.type} index={0}>
            <Card
              sx={{
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                boxShadow: 5,
              }}
            >
              <CardContent>
                <h3>{contents}</h3>
              </CardContent>
            </Card>
          </TabPanel>
          {postList.map((p, index) => mapList(p, index))}
          <TabPanel key={"lastView"} value={value.type} index={pages - 1}>
            <TeamProfile members={members} />
          </TabPanel>
        </div>
      );
    }
    // 게시글이 없는 경우 (소개글만 있는 경우)
    else {
      return (
        <div>
          <TabPanel key={"firstView"} value={value.type} index={0}>
            <Card
              sx={{
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                boxShadow: 5,
              }}
            >
              <CardContent>
                <h3>{contents}</h3>
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel key={"lastView"} value={value.type} index={1}>
            <TeamProfile members={members} />
          </TabPanel>
        </div>
      );
    }
  }

  function mapList(p, index) {
    return (
      <TabPanel key={p.post_id} value={value.type} index={index + 1}>
        <Card
          sx={{
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            boxShadow: 5,
          }}
        >
          <CardContent>
            <PostView project_id={project_id} post_id={p.post_id} />
          </CardContent>
        </Card>
      </TabPanel>
    );
  }

  return list(postList);
}
