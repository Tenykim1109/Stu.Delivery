import React, { useState, useEffect } from "react";
import { setHeader } from "../../../utils/api";
import axios from "axios";
import dayjs from "dayjs";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDateRangePicker from "@mui/lab/DesktopDateRangePicker";
import { styled } from "@mui/material/styles";
import {
  Autocomplete,
  CssBaseline,
  Typography,
  Modal,
  Button,
  Stack,
  Box,
  TextField,
  Container,
  Switch,
  FormLabel,
  ButtonBase,
  Chip,
} from "@mui/material";
import { useSelector } from "react-redux";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

const images = [
  {
    url: "/images/thumbnail/study_thu_1.png",
    title: "1???",
    width: "50%",
  },
  {
    url: "/images/thumbnail/study_thu_2.png",
    title: "2???",
    width: "50%",
  },
  {
    url: "/images/thumbnail/study_thu_3.png",
    title: "3???",
    width: "50%",
  },
  {
    url: "/images/thumbnail/study_thu_4.png",
    title: "4???",
    width: "50%",
  },
  {
    url: "/images/thumbnail/study_thu_5.png",
    title: "5???",
    width: "50%",
  },
];

const CreateStudy = () => {
  const user = useSelector((state) => state.user.user);

  const [title, setTitle] = useState(""); // ????????????
  const [category, setCategory] = useState([]); // ????????????
  const [categoryList, setCategoryList] = useState([]); // ???????????? ????????? ???????????? ?????? ??????
  const [date, setDate] = useState(["", ""]); // ?????????, ????????? ?????? ??????
  const [introduce, setIntroduce] = useState(""); // ????????? ?????????
  const [password, setPassword] = useState(null); // ????????? ????????????
  const [isPrivate, setIsPrivate] = useState(false);
  const [participant, setParticipant] = useState(8); // ????????? ?????? ??????, ???????????? 8
  const [thumbnail, setThumbnail] = useState("??????"); // ?????????
  const [thumbnailUrl, setThumbnailUrl] = useState(""); // ????????? Url

  // control details modal
  const [detailOpen, setDetailOpen] = useState(false);
  const handleDetailOpen = () => setDetailOpen(true);
  const handleDetailClose = () => setDetailOpen(false);

  // control thumbnail nodal
  const [thumbnailOpen, setThumbnailOpen] = useState(false);
  const handleThumbnailOpen = () => setThumbnailOpen(true);
  const handleThumbnailClose = () => setThumbnailOpen(false);

  // ????????? ?????? ??????
  // const [isPrivate, setIsPrivate] = useState(false);
  const handlePrivate = (event) => {
    setIsPrivate(event.target.checked);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "https://i6d201.p.ssafy.io/api/v1/category",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data);
        setCategoryList([...response.data]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    console.log("changed!");
  }, [category]);

  let startDateKor = "";

  const setKoreanDate = () => {
    startDateKor = dayjs(date[0]).format("YYYY-MM-DD");
    console.log(startDateKor);
  };

  const style = {
    // modal css
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const onTitleHandler = (event) => {
    const input = event.target.value;
    setTitle(input);
  };

  const onCategoryHandler = (event) => {
    if (event.type === "click") {
      // ???????????? ???????????? ???
      const inter = categoryList.filter(
        (value) => value.name === event.target.innerText
      );

      if (
        inter.length !== 0 &&
        !JSON.stringify(category).includes(JSON.stringify(inter))
      ) {
        setCategory([...category, ...inter]);
      }
    } else if (event.type === "change") {
      // ?????? ??????????????? ??????
      const inter = categoryList.filter(
        (value) => value.name === event.target.value
      );

      if (
        inter.length !== 0 &&
        !JSON.stringify(category).includes(JSON.stringify(inter))
      ) {
        setCategory([...category, ...inter]);
      }
    }
  };

  const onIntroduceHandler = (event) => {
    setIntroduce(event.target.value);
  };

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      setIntroduce(introduce + "\n");
      console.log(introduce);
    }
  };

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onParticipantHandler = (event) => {
    setParticipant(event.target.value);
  };

  const submit = async () => {
    console.log(title);
    console.log(date);
    console.log(introduce);
    console.log(password);
    console.log(thumbnailUrl);
    console.log(isPrivate);
    console.log(category);

    if (title === "") {
      alert("????????? ????????? ??????????????????.");
    } else if (introduce === "") {
      alert("????????? ???????????? ??????????????????.");
    } else if (participant === 0) {
      alert("????????? ?????? ????????? ??????????????????.");
    } else if (thumbnailUrl === "") {
      alert("????????? ???????????? ??????????????????.");
    } else if (category.length === 0) {
      alert("??????????????? ??????????????????.");
    } else {
      await axios({
        method: "post",
        url: "https://i6d201.p.ssafy.io/api/v1/study",
        headers: setHeader(),
        data: {
          name: title,
          introduction: introduce,
          is_private: isPrivate,
          password: password,
          thumbnail_url: thumbnailUrl,
          max_user_num: participant,
          start_at: date[0],
          finish_at: date[1],
          regular_schedules: [],
          categories: category,
        },
      })
        .then((response) => {
          alert("????????? ????????? ?????????????????????.");
          window.location.href = "/studylist";
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  return (
    <Container fixed>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        fullWidth
      >
        <Typography component="h1" variant="h4" gutterBottom>
          ????????? ?????????
        </Typography>
        <Stack spacing={5} direction="row">
          <Box onSubmit={submit} noValidate sx={{ mt: 1, width: "auto" }}>
            <FormLabel component="legend" sx={{ color: "text.primary" }}>
              ????????? ??????
            </FormLabel>
            <TextField
              margin="dense"
              required
              fullWidth
              id="title"
              label="????????? ????????? ??????????????????."
              name="title"
              autoFocus
              sx={{ mb: 5 }}
              onChange={onTitleHandler}
            />
            <FormLabel component="legend" sx={{ color: "text.primary" }}>
              ????????? ??????
            </FormLabel>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              onblur={setKoreanDate}
            >
              <Stack spacing={3} sx={{ mb: 5 }} alignItems="center">
                <DesktopDateRangePicker
                  startText="????????? ?????????"
                  endText="????????? ?????????"
                  value={date}
                  inputFormat={"yyyy-MM-dd"}
                  mask={"____-__-__"}
                  onChange={(newDate) => {
                    console.log(newDate);
                    setDate([
                      dayjs(newDate[0]).format("YYYY-MM-DD"),
                      dayjs(newDate[1]).format("YYYY-MM-DD"),
                    ]);
                  }}
                  renderInput={(startProps, endProps) => (
                    <React.Fragment>
                      <TextField {...startProps} />
                      <Box sx={{ mx: 2 }}> to </Box>
                      <TextField {...endProps} />
                    </React.Fragment>
                  )}
                />
              </Stack>
            </LocalizationProvider>
            <FormLabel component="legend" sx={{ color: "text.primary" }}>
              ????????????
            </FormLabel>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={categoryList}
              getOptionLabel={(option) => {
                return option.name;
              }}
              onInputChange={onCategoryHandler}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="dense"
                  label="category"
                  fullWidth
                  sx={{ mb: 5 }}
                />
              )}
            />
            {/* <FormLabel component="legend" sx={{ color: "text.primary" }}>
                ??????
              </FormLabel>
              <TextField
                margin="dense"
                required
                fullWidth
                id="title"
                label="????????? ????????? ??????????????????."
                name="title"
                sx={{ mb: 5 }}
                onChange={onTitleHandler}
              /> */}
            <FormLabel component="legend" sx={{ color: "text.primary" }}>
              ?????????
            </FormLabel>
            <TextField
              id="outlined-multiline-static"
              margin="dense"
              fullWidth
              name="introduce"
              label="?????????"
              multiline
              rows={4}
              type="password"
              autoComplete="current-password"
              onChange={onIntroduceHandler}
              onKeyPress={onCheckEnter}
              sx={{ mb: 5 }}
            />
          </Box>
          <Box sx={{ mt: 1, width: "auto" }}>
            <FormLabel component="legend" sx={{ color: "text.primary" }}>
              ????????????
            </FormLabel>
            <Box
              component="div"
              sx={{
                mt: 1,
                mb: 2,
                width: "auto",
                alignItems: "center",
                border: 1,
                borderRadius: 2,
              }}
            >
              <Typography
                component="h1"
                variant="h6"
                gutterBottom
                textAlign="center"
                marginTop={2}
                marginBottom={5}
              >
                ????????? ?????????
              </Typography>
              <Container maxWidth="sm" sx={{ mb: 5 }}>
                <Typography>{"????????????: " + title}</Typography>
                <Typography>{"?????????: " + date[0]}</Typography>
                <Typography>{"????????????: "}</Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
                  {category.map(({ id, name }, index) => {
                    console.log(id, name);
                    return (
                      <Chip
                        key={index}
                        label={name}
                        onDelete={() => {
                          category.splice(index, 1);
                          console.log(...category);
                        }}
                      />
                    );
                  })}
                </Stack>
                <Typography>{"????????????: " + user.nickname}</Typography>
                <Typography>?????????</Typography>
                <Typography>{introduce}</Typography>
              </Container>
            </Box>
            <Stack spacing={2} direction="row">
              <Button onClick={handleDetailOpen}>?????? ??????</Button>
              <Button onClick={handleThumbnailOpen}>????????? ?????????</Button>
            </Stack>
            <Modal
              className="details"
              open={detailOpen}
              onClose={handleDetailClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Stack spacing={5}>
                  <Typography
                    id="modal-modal-title"
                    variant="h5"
                    component="h2"
                    margin="normal"
                  >
                    ????????????
                  </Typography>
                  <Container maxWidth="sm">
                    <Stack spacing={5}>
                      <Stack spacing={1}>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          component="div"
                        >
                          ?????? ??????
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography>
                            {isPrivate ? "?????????" : "??????"}
                          </Typography>
                          <Switch
                            checked={isPrivate}
                            onChange={handlePrivate}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        </Stack>
                      </Stack>
                      <Stack spacing={1}>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          component="div"
                        >
                          ???????????? ??????
                        </Typography>
                        <TextField
                          margin="normal"
                          type="password"
                          disabled={!isPrivate}
                          label="??????????????? ??????????????????"
                          variant="outlined"
                          onChange={onPasswordHandler}
                        />
                      </Stack>
                      <Stack spacing={1}>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          component="div"
                        >
                          ????????? ?????? ??????
                        </Typography>
                        <TextField
                          margin="normal"
                          type="number"
                          InputProps={{ inputProps: { min: 2, max: 10 } }}
                          value={participant}
                          label="?????? ?????? ????????? ??????????????????."
                          variant="outlined"
                          onChange={onParticipantHandler}
                        />
                      </Stack>
                      <Button onClick={handleDetailClose}>??????</Button>
                    </Stack>
                  </Container>
                </Stack>
              </Box>
            </Modal>
            <Modal
              className="thumbnail"
              open={thumbnailOpen}
              onClose={handleThumbnailClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Stack spacing={5}>
                  <Typography
                    id="modal-modal-title"
                    variant="h5"
                    component="h2"
                    margin="normal"
                  >
                    ????????????
                  </Typography>
                  <Container maxWidth="sm">
                    {images.map((image, index) => (
                      <ImageButton
                        focusRipple
                        key={image.title}
                        style={{
                          width: image.width,
                        }}
                        onClick={() => {
                          setThumbnailUrl(image.url);
                          setThumbnail(image.title);
                        }}
                      >
                        <ImageSrc
                          style={{ backgroundImage: `url(${image.url})` }}
                        />
                        <ImageBackdrop className="MuiImageBackdrop-root" />
                        <Image>
                          <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            sx={{
                              position: "relative",
                              p: 4,
                              pt: 2,
                              pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                            }}
                          >
                            {image.title}
                            <ImageMarked className="MuiImageMarked-root" />
                          </Typography>
                        </Image>
                      </ImageButton>
                    ))}
                    <Typography variant="subtitle1">
                      ????????? ?????????: {thumbnail}
                    </Typography>
                    <Button onClick={handleThumbnailClose} sx={{ mt: 5 }}>
                      ??????
                    </Button>
                  </Container>
                </Stack>
              </Box>
            </Modal>
          </Box>
        </Stack>
        <Button
          type="submit"
          variant="contained"
          style={{ background: "rgba(191, 122, 38, 0.7)", width: "30vh" }}
          sx={{ mt: 3, mb: 2 }}
          onClick={submit}
        >
          ??????
        </Button>
      </Box>
    </Container>
  );
};

export default CreateStudy;
