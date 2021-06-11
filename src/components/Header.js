import { FormControlLabel, Switch } from "@material-ui/core/"
import React, { useContext, useState, useEffect } from "react"
import { repoName, userName, githubLink } from "../meta-data/repoSettings.json"
import { ThemeContext } from "../ThemeContext"
import Typography from "@material-ui/core/Typography"
import { AppBar, Toolbar, IconButton } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import useStyles from "./Layout/useStyles"
import Sidebar from "./Layout/Sidebar"
import Slide from "@material-ui/core/Slide"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"

const githubUsersAPI = "https://api.github.com/users"

const HideOnScroll = (props) => {
  const { children } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const Header = () => {
  const [userImage, setUserImage] = useState(null)

  const repo_link = `${githubLink}/${userName}/${repoName}`

  useEffect(() => {
    fetch(`${githubUsersAPI}/${userName}`)
      .then((res) => res.json())
      .then((res) => {
        setUserImage(res.avatar_url)
      })
  }, [])

  const classes = useStyles()
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleSidebar = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return
    }
    setIsMenuOpen && setIsMenuOpen(open)
  }
  return (
    <>
      <div className={classes.root}>
        <HideOnScroll>
          <AppBar color="primary" style={{ backgroungColor: "teal" }}>
            <Toolbar variant="dense" className={classes.toolBar}>
              <Sidebar
                isMenuOpen={isMenuOpen}
                onOpen={toggleSidebar(true)}
                onClose={toggleSidebar(false)}
              />
              <div style={{ position: "absolute", left: "0px", display: "block" }}>
                <IconButton
                  color="inherit"
                  size="medium"
                  onClick={toggleSidebar(true)}
                >
                  <MenuIcon />
                </IconButton>
              </div>
              {/* <div>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <Typography className={classes.title} variant="h5">
                  git:story
                </Typography>
              </Link>
            </div> */}
              <div
                className={classes.hero}
                style={{ display: "flex", alignItems: "center" }}
              >
                <a
                  href={repo_link}
                  // style={{ textDecoration: "none" }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.repoLink}
                >
                  <Typography
                    style={{ fontSize: "2rem" }}
                    className={classes.title}
                    variant="inherit"
                  >
                    {repoName}
                  </Typography>
                </a>
                {userImage && (
                  <img
                    style={{
                      maxWidth: "50px",
                      borderRadius: "100px",
                      border: "3px solid white",
                      boxShadow: "rgba(32, 35, 30, 0.5) 2px 4px 9px",
                    }}
                    src={userImage}
                    alt="git comics"
                  />
                )}
              </div>
              {false && (
                <FormControlLabel
                  style={{ right: "1rem", position: "absolute" }}
                  control={
                    <Switch
                      checked={isDarkMode}
                      onChange={toggleDarkMode}
                      name="darkMode"
                    />
                  }
                  label={isDarkMode ? "Dark" : "light"}
                />
              )}
            </Toolbar>
          </AppBar>
        </HideOnScroll>
      </div>
    </>
  )
}

export default Header
