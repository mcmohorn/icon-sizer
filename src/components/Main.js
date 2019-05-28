import React, {Component} from 'react';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

import Preview from './Preview'

function canvasToBlob(canvas) {
  return new Promise(function(resolve, reject) {
    canvas.toBlob(function(blob) {
      resolve(blob)
    })
  })
}

function filePrefix(filename) {
  return filename.replace(/\.[^/.]+$/, "");
}

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
      imageLoaded: false,
      sizes: [180,120,90,87,80,60,58,40,20],
      fileName: null,
    };
  }

  handleImageChange = (e) => {
    const self = this;
    const files = e.target.files;
    if (files && files[0]) {
      this.setState({fileName: files[0].name})

      const reader = new FileReader();
      reader.onload = function (ev) {
          self.imagePreview.src = ev.target.result;
      };
      reader.readAsDataURL(files[0]);
    }
  }

  onImageLoad = () => {
    for (let i = 0; i < this.state.sizes.length; i += 1) {
      const r = `canvas${this.state.sizes[i]}`;
      const context = this[r].refs.canvas.getContext('2d');
      const canvas = this[r].refs.canvas;
      context.drawImage(this.imagePreview, 0, 0, canvas.width, canvas.height);
    }
    this.setState({imageLoaded: true})
  }



  downloadZip = () => {
    const self = this;
    let zip = new JSZip();

    for (var i = 0; i < this.state.sizes.length; i++) {
      const r = `canvas${this.state.sizes[i]}`;
      const context = this[r].refs.canvas.getContext('2d');
      const canvas = this[r].refs.canvas;
      context.drawImage(this.imagePreview, 0, 0, canvas.width, canvas.height);
      // add image file to the zip
      zip.file(`icon${this.state.sizes[i]}.png`, canvasToBlob(canvas))
    }

    zip.generateAsync({type:"blob"}).then(function(content) {
        //downlaod the zip file
        FileSaver.saveAs(content, `${filePrefix(self.state.fileName)}.zip`);
    });
  }

  render() {
    const self = this;
    const downloadZipButton =
      <div>
        <a
          className="btn btn-primary"
          ref={(ref) => { this.downloadButton = ref; }}
          id="download"
          onClick={this.downloadZip}>
            Download as zip
        </a>
      </div>;
    const fileInput =
    <label className="btn btn-default btn-file">
      Select file
      <input
        ref={(ref) => { this.uploadInput = ref; }}
        type="file"
        accept="image/png, image/jpeg"
        style={{display: 'none'}}
        onChange={this.handleImageChange}
      />
    </label>

    return (

      <div className="content">
      <div className="instructions">
        Upload a square icon to resize it
      </div>
        <div>
          {fileInput}
        </div>

        <br />
        {this.state.imageLoaded? downloadZipButton : null}
        <img ref={(ref) => { this.imagePreview = ref; }} src={this.state.imageURL} alt="img" onLoad={this.onImageLoad} hidden/>

        <br/>
        {
          this.state.sizes.map(size =>
            {
              const r = `canvas${size}`;
              const n = this.state.fileName ? `${filePrefix(this.state.fileName)}-${size}.png` : null;
              return <Preview size={size} name={n} ref={(ref) => { self[r] = ref; }}/>
            }
          )
        }

      </div>
    );
  }
}

export default Main;
