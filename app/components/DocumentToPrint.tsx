// src/components/DocumentToPrint.tsx
import React from 'react';

interface DocumentToPrintProps {
  fileUrl: string;
}

class DocumentToPrint extends React.Component<DocumentToPrintProps> {
  render() {
    return (
      <div>
        <h1>Document Title</h1>
        <iframe src={this.props.fileUrl} width="100%" height="500px" title="Document Preview"></iframe>
      </div>
    );
  }
}

export default DocumentToPrint;
