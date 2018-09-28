import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { Divider, Upload, Icon, message } from "antd";
const data = [
  {
    prod_name: "T-Shirt",
    materials: [
      {
        material_type: "Light Cotton",
        fee: 0
      },
      {
        material_type: "Heavy Cotton",
        fee: 3
      }
    ],
    colors: [
      {
        color: "White",
        pic: "/ts-w.png",
        price: 16.95
      },
      {
        color: "Black",
        pic: "/ts-b.png",
        price: 16.95
      },
      {
        color: "Green",
        pic: "/ts-g.png",
        price: 18.95
      },
      {
        color: "Red",
        pic: "/ts-r.png",
        price: 18.95
      }
    ]
  },
  {
    prod_name: "Sweater",
    colors: [
      {
        color: "White",
        pic: "/ts-w.png",
        price: 28.95
      },
      {
        color: "Black",
        pic: "/ts-b.png",
        price: 28.95
      },
      {
        color: "Pink",
        pic: "/ts-pl.png",
        price: 32.95
      },
      {
        color: "Yellow",
        pic: "/ts-y.png",
        price: 32.95
      }
    ]
  }
];
const pMap = new Map();
data.forEach(e => {
  pMap.set(e.prod_name, e);
});

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === "image/jpeg";
  if (!isJPG) {
    message.error("You can only upload JPG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJPG && isLt2M;
}
class DesignBar extends Component {
  state = {
    prodType: "T-Shirt",
    materials: "",
    color: "",
    text: "",
    loading: false
  };
  handleUpload = info => {
    console.log("Hello info", info); // log is here
    // if (info.file.status === "uploading") {
    //   this.setState({ loading: true });
    //   return;
    // }
    // if (info.file.status === "done") {
    // Get this url from response in real world.
    getBase64(info.fileList[0].originFileObj, imageUrl => {
      console.log("Hello imageUrl", imageUrl); // log is here
      this.setState({
        imageUrl,
        loading: false
      });
    });
    // }
  };
  handleText = name => event => {
    console.log("Hello name", name); // log is here
    this.setState({
      [name]: event.target.value
    });
  };
  handleChange = event => {
    console.log("Hello event.target.name", event); // log is here
    console.log("Hello event.target.value", event.target.value); // log is here
    this.setState({ [event.target.name]: event.target.value });
  };
  renderOptions = () => {
    const item = pMap.get(this.state.prodType);
    const Options = [];
    Options.push(
      <FormControl className="w-75 mb-4 ml-3">
        <InputLabel htmlFor="materials">Product</InputLabel>
        <Select
          value={this.state.prodType}
          onChange={this.handleChange}
          inputProps={{
            name: "prodType",
            id: "materials-simple"
          }}
        >
          {Array.from(pMap.keys()).map(p => (
            <MenuItem key={p} value={p}>
              {p}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
    if ("materials" in item) {
      let content = item["materials"].map(m => (
        <MenuItem key={m.material_type} value={m.fee}>
          {m.material_type}
        </MenuItem>
      ));
      Options.push(
        <FormControl className="w-75 mb-4 ml-3">
          <InputLabel htmlFor="materials">Materials</InputLabel>
          <Select
            value={this.state.materials}
            onChange={this.handleChange}
            inputProps={{
              name: "materials",
              id: "materials-simple"
            }}
          >
            {content}
          </Select>
        </FormControl>
      );
    }
    if ("colors" in item) {
      let content = item["colors"].map(m => (
        <MenuItem key={m.color} value={m.color}>
          {m.color}
        </MenuItem>
      ));
      Options.push(
        <FormControl className="w-75 mb-4 ml-3">
          <InputLabel htmlFor="colors">Colors</InputLabel>
          <Select
            value={this.state.color}
            onChange={this.handleChange}
            inputProps={{
              name: "color",
              id: "colors-simple"
            }}
          >
            {content}
          </Select>
        </FormControl>
      );
    }
    Options.push(
      <React.Fragment>
        <Divider className="mb-0">Make it Cooler</Divider>
        <FormControl className="w-75 mb-4 ml-3">
          <TextField
            id="standard-name"
            label="Text"
            value={this.state.text}
            onChange={this.handleText("text")}
            margin="normal"
          />
        </FormControl>
      </React.Fragment>
    );
    const imageUrl = this.state.imageUrl;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    Options.push(
      <React.Fragment>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="//jsonplaceholder.typicode.com/posts/"
          beforeUpload={() => false}
          onChange={this.handleUpload}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
        </Upload>
      </React.Fragment>
    );
    return Options;
  };
  render() {
    console.log("Hello foo", pMap.get("T-Shirt")); // log is here

    return (
      <React.Fragment>
        <Paper className="p-4">
          <form className="d-flex flex-column" autoComplete="off">
            {this.renderOptions()}
          </form>
        </Paper>
      </React.Fragment>
    );
  }
}

DesignBar.propTypes = {};

export default DesignBar;
