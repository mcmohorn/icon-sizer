import  React, { Component} from 'react';
import PropTypes from 'prop-types';


const getFileName = (name) => {
  // TODO: insert size into name
  return name;
}

class Preview extends Component {
  state = {

  }
  download = () => {
    var download = this.refs.download;
		var image = this.refs.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    download.href = image;
  }
  render() {
    const fileName = `${this.props.name}`;
    return (
      <div hidden={!this.props.name} className="previewContainer">
        <canvas ref={'canvas'} width={this.props.size} height={this.props.size}></canvas>
        <br/>
        <a ref={'download'} download={fileName}><button className="btn btn-default" type="button" onClick={this.download}>{fileName}</button></a>
      </div>
    );
  }
};

Preview.propTypes = {
  size: PropTypes.number,
};
Preview.defaultProps = {
  size: 1,
};

export default Preview;
