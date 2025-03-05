import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { Link, useParams } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CommentService from "../Services/CommentService";
import { CommentType } from "../Types/Types";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import TextField from "@mui/material/TextField";
import LikeService from "../Services/LikeService";
import PostService from "../Services/PostService";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));

interface PostType {
  title: string;
  text: string;
  initial: string;
  userId: number;
  username: string;
  postId: number;
  createTime: Date;
  profilePicture: string;
}

function UserPosts(props: PostType) {
  const { Iduser } = useParams();
  const disabled = localStorage.getItem("currentUser") == null ? true : false;
  // Option Buton kısmı
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const edit = () => {
    console.log("edit düğmesine basıldı");
    setAnchorEl(null);
  };

  // Option buton kısmı bitiş

  const { title, text, userId, username, postId, createTime, profilePicture } =
    props;
  const dateString = createTime;
  const date = new Date(dateString);

  // İstediğiniz formatta (gün ay yıl) almak için:
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  const showdate = `${day} ${months[month]} ${year} ${
    hours < 10 ? "0" + hours : hours
  }:${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;

  const [liked, Setliked] = useState<boolean>(false);
  const [commentlist, Setcommentlist] = useState<CommentType[]>([]);
  const { currentUser } = useSelector((state: RootState) => state.app);
  const [newcomment, setnewcomment] = useState<string>("");
  const [likecount, setlikecount] = useState<number>();

  const refleshlikecount = async () => {
    const count = await LikeService.getLikeCountByPostId(postId);

    if (count) {
      setlikecount(count);
    } else {
      setlikecount(0);
    }
  };

  const deletePost = async () => {
    console.log(postId);

    await PostService.deletPost(postId);
    setAnchorEl(null);
    window.location.reload();
  };

  const checkLikedPostByUserId = async () => {
    if (currentUser?.id) {
      const response = await LikeService.checkLikedPostByUserId(
        postId,
        currentUser?.id
      );
      if (response) {
        Setliked(!liked);
      }
    }
  };

  useEffect(() => {
    refleshlikecount();
    checkLikedPostByUserId();
  }, [Iduser]);

  const handleLike = async () => {
    if (liked) {
      Setliked(!liked);
      if (currentUser?.id) {
        await LikeService.removeLike(currentUser?.id, postId);
        const count = await LikeService.getLikeCountByPostId(postId);
        if (count) {
          setlikecount(count);
        } else {
          setlikecount(0);
        }
      }
    } else {
      Setliked(!liked);
      if (currentUser?.id) {
        await LikeService.saveLike(currentUser.id, postId);
        const count = await LikeService.getLikeCountByPostId(postId);
        if (count) {
          setlikecount(count);
        } else {
          console.log("count bilgisi gelmedi");
        }
      }
    }
  };

  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }
  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    variants: [
      {
        props: ({ expand }) => !expand,
        style: {
          transform: "rotate(0deg)",
        },
      },
      {
        props: ({ expand }) => !!expand,
        style: {},
      },
    ],
  }));

  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);

    if (!expanded) {
      getComments();
    }
  };

  const getComments = async () => {
    const response: CommentType[] = await CommentService.getCommentsByPostId(
      postId
    );
    if (response) {
      Setcommentlist(response);
    } else {
      Setcommentlist([]);
    }
  };

  const handlenewcomment = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setnewcomment(e.target.value);
  };

  const sendcomment = async () => {
    if (currentUser?.id) {
      await CommentService.saveComment(postId, currentUser?.id, newcomment);
    }
    getComments();
    setnewcomment("");
  };

  return (
    <div className="postContainer">
      <div>
        <Card
          sx={{
            columnWidth: "900px",
            marginBottom: 1,
            backgroundColor: "#FEFDFD",
            border: "2px solid lightgrey",
          }}
        >
          <CardHeader
            avatar={
              <Link to={{ pathname: "/user/" + userId }}>
                <img
                  src={`https://backend-social-production.up.railway.app/uploads/${profilePicture}`}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                  alt=""
                />
              </Link>
            }
            action={
              Number(Iduser) == currentUser?.id ? (
                <IconButton aria-label="settings">
                  <Button
                    color="secondary"
                    sx={{ textTransform: "none" }}
                    id="demo-customized-button"
                    aria-controls={open ? "demo-customized-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    Seçenekler
                  </Button>
                  <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      "aria-labelledby": "demo-customized-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={edit} disableRipple>
                      <EditIcon />
                      Düzenle
                    </MenuItem>
                    <MenuItem onClick={deletePost} disableRipple>
                      <FileCopyIcon />
                      Sil
                    </MenuItem>
                  </StyledMenu>
                </IconButton>
              ) : undefined
            }
            title={title + " userId= " + userId}
          />
          <p style={{ marginLeft: "15px", marginTop: "-10px" }}>{username}</p>

          <CardContent>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "400px" }}>{text}</div>
            </Typography>
            <p style={{ textAlign: "end", fontSize: "12px" }}>{showdate}</p>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              disabled={disabled}
              onClick={handleLike}
              aria-label="add to favorites"
            >
              <FavoriteIcon style={liked ? { color: "red" } : undefined} />
              <span style={{ margin: "0px", padding: "0px" }}>{likecount}</span>
            </IconButton>

            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <CommentIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {commentlist.length != 0 ? (
              commentlist.map((comment: CommentType) => (
                <CardContent>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      border: "1px solid lightgrey",
                      borderRadius: "10px",
                      padding: "5px",
                    }}
                  >
                    <div>
                      <Typography>{comment.user.username}</Typography>
                      <Link to={{ pathname: "/user/" + comment.user.id }}>
                        <img
                          src={`https://backend-social-production.up.railway.app/uploads/${comment.user.profilePicture}`}
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                          alt=""
                        />
                      </Link>
                    </div>
                    <div style={{ flexGrow: "1", justifyItems: "center" }}>
                      <Typography>{comment.text}</Typography>
                    </div>
                  </div>
                </CardContent>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  border: "1px solid lightgrey",
                  borderRadius: "10px",
                  margin: "5px",
                  justifyContent: "center",
                }}
              >
                <div>
                  <CardContent>
                    <Typography>Henüz Yorum Yok</Typography>
                  </CardContent>
                </div>
              </div>
            )}
            {currentUser && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "10px",
                }}
              >
                <TextField
                  value={newcomment}
                  id="outlined-basic"
                  label="Yorum Yap"
                  variant="outlined"
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => handlenewcomment(e)}
                  multiline
                  slotProps={{
                    input: {
                      endAdornment: (
                        <IconButton>
                          <Button
                            onClick={sendcomment}
                            size="small"
                            variant="outlined"
                          >
                            Gönder
                          </Button>
                        </IconButton>
                      ),
                    },
                  }}
                />
              </div>
            )}
          </Collapse>
        </Card>
      </div>
    </div>
  );
}

export default UserPosts;
