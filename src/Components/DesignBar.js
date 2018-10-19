import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Divider, Upload, Icon, Modal } from "antd";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";

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
        pic: "st.png",
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
        pic: "/st-w.png",
        price: 28.95
      },
      {
        color: "Black",
        pic: "/st-b.png",
        price: 28.95
      },
      {
        color: "Pink",
        pic: "/st-pl.png",
        price: 32.95
      },
      {
        color: "Yellow",
        pic: "/st-y.png",
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

class DesignBar extends Component {
  state = {
    prodType: "T-Shirt",
    material: "Light Cotton",
    color: "black",
    text: "",
    loading: false,
    textColor: undefined,
    logoEffects: undefined,
    showExport: false
  };
  handleUpload = info => {
    getBase64(info.fileList[info.fileList.length - 1].originFileObj, imageUrl => {
      this.setState(
        {
          imageUrl,
          loading: false
        },
        this.props.setLogo(imageUrl)
      );
    });
    // }
  };
  handleText = event => {
    const text = event.target.value;
    this.setState(
      {
        text
      },
      this.props.setText(text)
    );
  };
  handleChangeProdType = event => {
    const prodType = event.target.value;
    this.setState(
      {
        prodType
      },
      this.props.setProdType(prodType)
    );
  };
  handleChangeMaterial = event => {
    const material = event.target.value;
    const item = pMap.get(this.state.prodType);
    const prodAttr = item.materials.find(c => c.material_type === material);
    const { material_type, fee } = prodAttr;
    this.setState(
      {
        material
      },
      () => {
        this.props.setMaterial(material_type, fee);
      }
    );
  };
  handleChangeColor = event => {
    const color = event.target.value;
    const item = pMap.get(this.state.prodType);
    const prodAttr = item.colors.find(c => c.color === color);
    const { pic, color: prodColor, price } = prodAttr;
    this.setState(
      {
        color
      },
      () => {
        this.props.setProdSrc(pic);
        this.props.setColor(prodColor, price);
      }
    );
  };
  renderOptions = () => {
    const item = pMap.get(this.state.prodType);
    const Options = [];
    Options.push(
      <FormControl key="Product" className="w-75 mb-4 ml-3">
        <InputLabel htmlFor="materials">Product</InputLabel>
        <Select
          value={this.state.prodType}
          onChange={this.handleChangeProdType}
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
        <MenuItem key={m.material_type} value={m.material_type}>
          {m.material_type}
        </MenuItem>
      ));
      Options.push(
        <FormControl key="Materials" className="w-75 mb-4 ml-3">
          <InputLabel htmlFor="materials">Material</InputLabel>
          <Select
            value={this.state.material}
            onChange={this.handleChangeMaterial}
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
        <FormControl key="Colors" className="w-75 mb-4 ml-3">
          <InputLabel htmlFor="colors">Colors</InputLabel>
          <Select
            value={this.state.color}
            onChange={this.handleChangeColor}
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

    return Options;
  };

  handleTextColorChange = event => {
    const textColor = event.target.value;
    this.setState({ textColor });
    this.props.setTextColor(textColor);
  };

  handleLogoEffects = type => {
    const logoEffects = type;
    this.setState({ logoEffects, ...(type === "noImg" && { imageUrl: "" }) });
    this.props.setLogoEffects(logoEffects);
  };

  handleExport = () => {
    this.setState(
      {
        showExport: true
      },
      this.props.handleExportClick()
    );
  };
  render() {
    const { imageUrl } = this.state;
    const buttonSettings = {
      size: "small",
      className: "mb-2",
      variant: "contained",
      style: { fontSize: 14 }
    };
    return (
      <React.Fragment>
        <Paper className="p-4">
          <form className="d-flex flex-column" autoComplete="off">
            {this.renderOptions()}
            {/* Optional func*/}
            <Divider className="mb-0">Text</Divider>
            <FormControl className="w-75 ml-3">
              <TextField
                label="Typing something..."
                className="mb-2"
                value={this.state.text}
                onChange={this.handleText}
              />
              <RadioGroup
                aria-label="TextColor"
                name="textColor"
                value={this.state.textColor}
                onChange={this.handleTextColorChange}
              >
                <FormControlLabel value="black" control={<Radio />} label="Black" />
                <FormControlLabel value="white" control={<Radio />} label="White" />
                <FormControlLabel value="red" control={<Radio />} label="Red" />
                <FormControlLabel value="green" control={<Radio />} label="Green" />
                <FormControlLabel value="blue" control={<Radio />} label="Blue" />
              </RadioGroup>
            </FormControl>

            <FormControl className="w-75 mb-4 ml-3">
              <Divider className="mb-2">Logo</Divider>
              <div className="d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-center">
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader align"
                    showUploadList={false}
                    beforeUpload={() => false}
                    onChange={this.handleUpload}
                  >
                    {imageUrl ? (
                      <img className="img-fluid" src={imageUrl} alt="avatar" />
                    ) : (
                      <div>
                        <Icon type={this.state.loading ? "loading" : "plus"} />
                        <div className="ant-upload-text">Upload</div>
                      </div>
                    )}
                  </Upload>
                </div>
                <Button
                  {...buttonSettings}
                  onClick={() => this.handleLogoEffects("noImg")}
                  variant="outlined"
                  color="secondary"
                >
                  No Image
                </Button>
                <Button {...buttonSettings} onClick={() => this.handleLogoEffects("default")} color="default">
                  Default
                </Button>
                <Button
                  {...buttonSettings}
                  onClick={() => this.handleLogoEffects("grayScale")}
                  color="secondary"
                >
                  Grayscale
                </Button>
                <Button {...buttonSettings} onClick={() => this.handleLogoEffects("sepia")} color="primary">
                  Sepia
                </Button>
              </div>
            </FormControl>

            <FormControl className="w-75 mb-4 ml-3">
              <Divider className="mb-2">Export</Divider>
              <div className="d-flex flex-column justify-content-center">
                <Button {...buttonSettings} onClick={this.handleExport} color="default">
                  Export T-shirt
                </Button>
              </div>
            </FormControl>
          </form>
        </Paper>
        <Modal
          visible={this.state.showExport}
          onOk={() => this.setState({ showExport: false })}
          onCancel={() => this.setState({ showExport: false })}
          footer={null}
          width="900px"
          bodyStyle={{ textAlign: "center" }}
        >
          <img src={this.props.base64File} alt="export" />
        </Modal>
      </React.Fragment>
    );
  }
}

DesignBar.propTypes = {
  setProdType: PropTypes.func,
  setProdSrc: PropTypes.func,
  setLogo: PropTypes.func,
  setText: PropTypes.func,
  setColor: PropTypes.func,
  setMaterial: PropTypes.func,
  setTextColor: PropTypes.func,
  setLogoEffects: PropTypes.func,
  handleExportClick: PropTypes.func,
  calculatteSum: PropTypes.func,
  imageUrl: PropTypes.string,
  base64File: PropTypes.string
};

export default DesignBar;
